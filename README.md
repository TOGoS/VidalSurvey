# Survey App
A single-question survey.

## Pre-requisites
- [Node.js](https://nodejs.org/)
- [MondoDB](https://www.mongodb.com/)
- [Deployd](http:deployd.com/)

## Usage
1. Open terminal window navigate to repository's root directory (survey/)
2. Run ```npm install``` to install dependencies
3. Run ```dpd -p 5500 survey-data/app.js``` to start deployd
4. On a new terminal window, navigate to repository's root directory
5. Run ```node server.js``` to start server
6. On your preferred browser, go to [http://localhost:5000](http://localhost:5000) to access the survey
7. (Optional) On your browser, go to [http://localhost:5500/dashboard](http://localhost:5500/dashboard) to access deployd's dashboard and see the app's collections/data

## TODO
1. Add support for multiple questions
2. Add reporting multiple question results