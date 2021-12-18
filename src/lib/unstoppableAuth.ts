import { Client } from '@uauth/node';
import Resolution from '@unstoppabledomains/resolution';
import { setCookies, getCookie, removeCookies } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

const resolution = new Resolution();

const developmentCredentials = {
  clientID: process.env.UNSTOPPABLE_CLIENT_ID,
  clientSecret: process.env.UNSTOPPABLE_CLIENT_SECRET,
  scope: 'openid email wallet',
  redirectUri: 'http://localhost:3000/api/auth/callback',
  // We don't need this config in SSR?
  postLogoutRedirectUri: 'http://localhost:3000/',
  resolution,
};
const productionCredentials = {
  clientID: process.env.UNSTOPPABLE_CLIENT_ID,
  clientSecret: process.env.UNSTOPPABLE_CLIENT_SECRET,
  scope: 'openid email wallet',
  redirectUri: 'http://localhost:3000/api/auth/callback',
  resolution,
};

const USER_INTERACTION_COOKIE_NAME = 'user-interaction';

export const uauthClient = new Client(
  process.env.NODE_ENV === 'production' ? productionCredentials : developmentCredentials,
);

export const { login, callback, middleware } = (() => {
  const { login, callback, middleware } = uauthClient.createLogin<any>({
    storeInteraction: async (ctx, interaction) => {
      setCookies(USER_INTERACTION_COOKIE_NAME, interaction, {
        sameSite: 'none',
        secure: true,
        req: ctx.req,
        res: ctx.res,
      });
    },
    retrieveInteraction: ctx => {
      const interactionAsString = getCookie(USER_INTERACTION_COOKIE_NAME, { req: ctx.req, res: ctx.res });

      try {
        return JSON.parse(interactionAsString as string);
      } catch {
        return {};
      }
    },
    deleteInteraction: async ctx => {
      removeCookies(USER_INTERACTION_COOKIE_NAME, { req: ctx.req, res: ctx.res });
    },
    storeAuthorization: async (ctx, authorization) => {
      ctx.req.session = { uauth: authorization };
      await ctx.req.session.save();
    },
    retrieveAuthorization: ctx => ctx.req.session.uauth,
    deleteAuthorization: async ctx => {
      delete ctx.req.session.uauth;
      await ctx.req.session.save();
    },
    retrieveAuthorizationEndpointResponse: ctx => ctx.req.body,
    passOnAuthorization: (ctx, authorization) => {
      ctx.res.locals.uauth = authorization;
    },
    redirect: (ctx, url) => {
      ctx.res.redirect(url);
    },
  });

  return {
    login: (req, res, options) => login({ req, res }, options),
    callback: (req: NextApiRequest, res: NextApiResponse) => callback({ req, res }),
    middleware: (scopes: string[] = []) => (req: NextApiRequest, res: NextApiResponse) =>
      middleware({ req, res }, scopes),
  };
})();
