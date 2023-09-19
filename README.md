# Math Pyramid

![Math Pyramid](https://github.com/tobias-gaenzler/math-pyramid-react/blob/main/public/help_start.jpg?raw=true)
React app for math pyramid, a math exercise to train basic addition/subtraction.

The current application is available on github pages: <https://tobias-gaenzler.github.io/math-pyramid-react/>

A basic multiplayer version using _node.js_ as a server (see _server_ folder) is available in the _multiplayer_ branch.

## Technical Information

### Typescript

The application is implemented in typescript

### Deployment

Github actions workflow builds the app, commits the created artefacts to the _gh-pages_ branch using [gh-pages module](https://github.com/tschaub/gh-pages) .
The github pages configuration then picks up the change and deploys the static files.

### React Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and provides the following scripts:

- `npm start`
  
  Runs the app in the development mode.\
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

  The page will reload if you make edits.\
  You will also see any lint errors in the console.

- `npm deploy`
  
  Builds the app, commits the created artifacts to the 'gh-pages' branch from where it is deployed to github pages automatically by github (github pages configuration)