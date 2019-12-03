# ts-react-ssr-basis

Given how many people are afraid of webpack and especially SSR with webpack, the main goal of this boilerplate is simplicity, that's why there are four webpack configs for each environment instead of one with thirty 'if's. There is a little bit of duplication which is partially resolved by `common.js`. Some duplication is normal as we want to find a balance between DRY and intertwined spaghetti code. This way config files are short (e.g. `webpack/server-prod.js` takes only 45 lines) and easy to understand.

This universal (isomorphic) boilerplate is mostly unopinionated (except `react-helmet-async` and `jest`), so you can use it to build a project, or create your own more opinionated boilerplate, or learn how libraries like [Razzle](https://github.com/jaredpalmer/razzle/) work. You are free to integrate whatever data fetching solution you want: Apollo Client, async redux actions, static method on a component, etc.

## Features
 - Server side rendering
 - TypeScript
 - Hot reloading (component's state is not preserved)
 - Code splitting with [`loadable-components`](https://github.com/smooth-code/loadable-components)
 - Testing with Jest (`enzyme` is not integrated in case you want to use `react-testing-library` instead, or something else)
 - React Helmet
 - CSS modules and regular CSS (require it with 'global' resource query, e.g.: `styles.css?global`)

## Structure
Webpack configs are located in the `webpack` folder with self-explanatory names: `client-dev`, `client-prod`, `server-dev`, `server-prod`. In development the client bundle is built separately from the server bundle to improve build time since each process can leverage a separate CPU core.

## npm scripts
 - `npm start` — start in development mode
 - `npm run build` — build for production
 - `npm run start:prod` — start built project in production mode
 - `npm run build:start` — first build and then start (production)
 - `npm run tsc` — check TS errors
 - `npm run lint` — lint
 - `npm test` — test with Jest

To build and start a docker image run `docker-compose up -d --build` and then open a website at http://192.168.99.100 or whatever the return value of `docker-machine ip` command is.

## License
MIT, except an image in the `Lazy` folder, it's in public domain.
