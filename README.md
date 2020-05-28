# dev-learning-web

Simple learning [React](https://reactjs.org/docs/getting-started.html) web application designed to help developers trying to learn new programming related topics.
Uses [material-ui](https://material-ui.com/) design system and the newest React provided utils.

## Getting Started

Install [yarn package manager](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

Go to project directory and **run**:
```sh
yarn install

yarn start
```

## Deploying

```sh
yarn build
```

You can find project and its assests build in `./build` directory

## Linting

With the help of github actions you cannot merge PR's which have TS or eslint errors.

You can check errors localy:
```sh
yarn lint

tsc
```

**No typescript or eslint errors are allowed**

Project is set up using restrictive and opinionated `eslint` rules (using `airbnb` standart) which help the code to be more consistant and high quality.
