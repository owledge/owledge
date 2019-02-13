# Owledge

## HowTo

### 1. Manage Git

It's important to know that this project has the fundamentals of [git flow](https://bit.ly/2S3Rsvi).

The branches that we will include are:

- master
- develop
- feature
- fix

Every collaborator will work in a **feature** individually and this feature will checkout from develop, following the [git flow](https://bit.ly/2S3Rsvi) standard.

The feature has to be **independent** from each other and **explicit** following the user stories from **[Clickup](https://app.clickup.com/1232603/d/b?p=1284701&c=1541883&s=2729839).**

### 1.1 Git clone

- HTTPS: `git clone https://github.com/DanielMoreno58/owledge.git`
- SSH: `git@github.com:DanielMoreno58/owledge.git`
  - More information about SSH click [here](https://help.github.com/articles/connecting-to-github-with-ssh/)

### 1.2 Git pull

`git pull origin branch`

### 1.3 Git flow

```git
  git add .
  git commit -m "commit name"
  git push origin "branch name"
```

### 1.3.1 Commit and branches name

The commit name needs to be **unique**, **specific** and it must have a limit of **50 to 72 characters maximum**. For this we recommend you to read the [seven rules to great commit message](https://chris.beams.io/posts/git-commit/#seven-rules)

Example:

```bash
# Good
Fix typo in introduction to user guide

# Bad
Re-adding ConfigurationPostProcessorTests after its brief removal in r814
```

The branch name must have the feature that is written in our planning of agile with help of user stories, also if the branch name has more than one word the separator must be underscore ( `_` )

The branch name always start by the type of code that we are working on, in this case we will handle two types:

| Type    | Naming    |
| ----    | --------- |
| Feature | feature_  |
| Fix     | fix_      |

Example:

User Story: **User register**

```bash

# Good
feature_user_register
fix_user_register

# Bad
register_users_in_home_page

home_page_fix_register

registerusers

```

## Available Scripts

Download or Clone the Project:

### `npm install`

will install dependencies
Ignore "audit"

### `npm start`

Runs the app in the dev mode.<br>
App should be running on [http://localhost:3000](http://localhost:3000).

The page will reload if you make changes and save your files on the editor.<br>
You will also see any errors in the console.

### `node server.js`

Builds the app for developer mode to the `build` folder.<br>
It correctly bundles React in developer mode and optimizes the build for the best performance.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.


### `yarn build`

### `NODE_ENV=production node server.js`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.