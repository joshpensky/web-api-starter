# Web API Starter

> React web app and Express/MongoDB API starter

A starter for creating a React web app with an Express API using a MongoDB database.

## Table of Contents

- [Getting Started](#-getting-started)
  - [Pre-requisites](#pre-requisites)
  - [Using the Template](#using-the-template)
  - [Installation](#installation)
- [Development Workflow](#-development-workflow)
- [Code Quality](#-code-quality)

## 🚀 Getting Started

### Pre-requisites

Follow the instructions in the links below to install the required dependencies on your local machine:

- [Node.js](https://nodejs.org/en/download/)
- [NPM](https://www.npmjs.com/get-npm)

### Using the Template

This starter is meant to be reused for projects utilizing a React web app and an Express API using a MongoDB database.

To quickly duplicate this starter, click on the green `Use this template` button near the top of the [GitHub repo page](https://github.com/joshpensky/web-api-starter) (or click [here](https://github.com/joshpensky/web-api-starter/generate)).

Once the repo is on your account, you can clone it locally on your machine.

You can then do a search for the following terms and replace them with your desired package name:

- `web-api-starter`
- `Web API Starter`

### Installation

Do the following in the root directory of the repo:

1. Ensure NVM is installed globally.

   We are using NVM (Node Version Manager) to maintain the same Node version that's running on the Linux machines.

   To install NVM, follow the steps provided [here](https://github.com/nvm-sh/nvm/blob/master/README.md#installation-and-update).

2. Run `nvm install` to ensure you're using the correct version of Node

3. Run `npm install` for dev dependencies

4. Run `npm run bootstrap` for installing `web` and `api` dependencies

Then follow any additional instructions in the [`web`](web/README.md#-getting-started) and [`api`](api/README.md#-getting-started) READMEs.

## 🛠 Development Workflow

1. Run `nvm use` to ensure you're using the correct version of Node

2. Run `npm start` to start up the web and API development servers

   You should now be able to visit [http://localhost:3000](http://localhost:3000) in your browser for the web app, [http://localhost:3001/api/v1](http://localhost:3001/api/v1) for the API server!

   _**Note:** if at any time you would like to cancel the running server instance, press `CTRL + C` in the open terminal window._

3. Start coding!

## 🙅 Code Quality

Don't commit messy code!

Here's a list of things already configured to keep you in line:

- [EditorConfig](https://editorconfig.org/)
- [Upstatement's ESLint Config](https://github.com/Upstatement/eslint-config)
- [Upstatement's Prettier Config](https://github.com/Upstatement/prettier-config)

All of these tools will be run with the pre-commit hook (configured with [Husky](https://github.com/typicode/husky)) to make sure you're not committing inconsistent code. We highly recommend configuring your editor to use these tools so that you can see (and fix) style violations as you write code.
