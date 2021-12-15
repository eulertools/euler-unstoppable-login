# Project: Euler.Tools with Unstoppable Login

Euler Tools Staking Connected with Unstoppable Login

# Working code in a public repopsitory or PR to a public repository

[Github Euler's Unstoppable Login](https://github.com/eulertools/euler-unstoppable-login)

# Recorded video demo of the integration

# Person of contact in case there are any questions

### Discord ID

agustintin#4299

### UnstoppableDomain registered account email address

agustin.gabiola@gmail.com

# Project Details

This is a template repo to create SaaS apps using:

- NextJS: (https://nextjs.org/) unbeatable support for all modern React features and tooling. Used with next-connect and iron-session.
- TypeScript: (https://www.typescriptlang.org/) Catch early a whole set of bugs that otherwise might plague your app.
- MaterialUI: (https://material-ui.com/) This UI Kit has full TypeScript support and a very complete set of components, Along with a great themable API and the versatile Box and Grid components.
- StorybookJS: (https://storybook.js.org/) There is no better and simpler way to build interfaces in a React app.
- Jest: (https://jestjs.io/) Tests? for sure! How would you otherwise know your code is correct. Start with small unit tests and then progress to more complex integration tests.
- SWR: (https://swr.vercel.app/) We love this small set of hooks for data fetching. There are agnostic enough that we can use it with REST or GraphQL if we want to. (I use axios as HTTP Client)
- @uauth/node Unstoppable Login authentication. SDK used to integrate into Server-side applications. Even though with the current functionality it was better to use @uauth/js with web3-react we wanted to test this method of authentication via SSR.

## Environment variables

.env.example holds the "public" keys so just create a .env that contains those values.

For the private keys you will need to create a .env.local with the following:

```
IRON_SESSION_PASSWORD=
IRON_SESSION_COOKIE_NAME=
UNSTOPPABLE_CLIENT_ID=
UNSTOPPABLE_CLIENT_SECRET=
```

Next.js will only replace those in SSR and never reach the client

## To install

```
$ yarn
```

## To run Storybook

```
$ yarn storybook
```

## Run Tests

```
$ yarn test
```

## To run development mode

```
$ yarn dev
```
