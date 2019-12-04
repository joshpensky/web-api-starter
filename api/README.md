# API Starter

> An Express/MongoDB API starter

A starter for creating an Express API using a MongoDB database.

## Table of Contents

- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)
- [Code Quality](#-code-quality)

## 🚀 Getting Started

After following the installation instructions in the [root directory](../README.md#installation), do the following in this directory:

1. Clone the `.env.example` file to create `.env.development` and `.env.production` files.

   These will contain the environment variables for development and production environments.

2. Create a new account on [mLab](https://mlab.com/).

   At this point, you will want to create two databases: one for development and one for production. I recommend naming them `*-dev` and `*-prod`, where `*` is the name of your app.

   Then, create new users for the databases. These will be the user that `mongoose` will use to connect.

3. Add your mLab database information to the `env` files.

   Each of your databases will have a unique standard MongoDB URI (visible at the top of a database's page on mLab). You can deconstruct them and add to your `env` files as follows:

   ```
   mongodb://<MONGO_USERNAME>:<MONGO_PASSWORD>@<MONGO_URI>
   ```

## 🛠 Development Workflow

1. Run `nvm use` to ensure you're using the correct version of Node

2. Run `npm start` to start up the API development server

   You should now be able to visit the API at [http://localhost:3001/api/v1](http://localhost:3001/api/v1) and begin development!

   _**Note:** if at any time you would like to cancel the running server instance, press `CTRL + C` in the open terminal window._

## 🙅 Code Quality

Don't commit messy code!

Here's a list of things already configured to keep you in line:

- [EditorConfig](https://editorconfig.org/)
- [Upstatement's ESLint Config](https://github.com/Upstatement/eslint-config)
- [Upstatement's Prettier Config](https://github.com/Upstatement/prettier-config)

All of these tools will be run with the pre-commit hook (configured with [Husky](https://github.com/typicode/husky)) to make sure you're not committing inconsistent code. We highly recommend configuring your editor to use these tools so that you can see (and fix) style violations as you write code.
