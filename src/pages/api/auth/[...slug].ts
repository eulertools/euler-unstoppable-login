import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { IronSession } from 'iron-session';

import { login, callback } from 'lib/unstoppableAuth';
import { withSessionRoute } from 'lib/ironSession';

export const AUTH_HANDLER_URL = '/api/auth';

interface NextApiRequestWithSession extends NextApiRequest {
  session: IronSession;
}

const handler = nc<NextApiRequestWithSession, NextApiResponse>();

handler.get(
  `${AUTH_HANDLER_URL}/login`,
  withSessionRoute(async (req, res) => {
    console.log('🚀 -----------------------------------------------------------------');
    console.log('🚀 ~ Calling /auth/login with user:', req.query.login_hint);
    console.log('🚀 -----------------------------------------------------------------');

    login(req, res, {
      username: decodeURIComponent(req.query.login_hint as string),
    });
  }),
);

handler.post(
  `${AUTH_HANDLER_URL}/callback`,
  withSessionRoute(async (req, res) => {
    console.log('🚀 -----------------------------------------------------------------');
    console.log('🚀 ~ Calling /auth/callback\n', req.body, '\nsession info:', req.session);
    console.log('🚀 -----------------------------------------------------------------');

    if (req.body.error) {
      res.redirect(`/?error=${encodeURIComponent(req.body.error?.error_description || 'Error validating user')}`);
      return;
    }

    res.writeHead(301, {
      Location: `${AUTH_HANDLER_URL}/callback/authorize?state=${req.body.state}&code=${req.body.code}`,
    });
    res.end();
  }),
);

handler.get(
  `${AUTH_HANDLER_URL}/callback/authorize`,
  withSessionRoute(async (req, res) => {
    req.body = {
      state: req.query.state,
      code: req.query.code,
    };

    console.log('🚀 -----------------------------------------------------------------');
    console.log('🚀 ~ Calling /auth/callback/authorize\n', req.body, '\nsession info:', req.session);
    console.log('🚀 -----------------------------------------------------------------');

    await callback(req, res);

    res.writeHead(301, { Location: '/staking' });
    res.end();
  }),
);

handler.get(
  `${AUTH_HANDLER_URL}/logout`,
  withSessionRoute(async (req, res) => {
    console.log('🚀 -----------------------------------------------------------------');
    console.log('🚀 ~ Calling /auth/logout');
    console.log('🚀 -----------------------------------------------------------------');

    req.session.destroy();

    res.redirect('/');
  }),
);

export default handler;
