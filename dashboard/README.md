pre-requests 
npm install pm2 -g (http://pm2.keymetrics.io/)

## Directory Structure

```shell
├── dist/                         # Compiled application
│     ├── css/
│     │     ├── *.css
│     │     └── *.css.map
│     ├── fonts/
│     ├── images/
│     ├── js/
│     │     ├── *.js
│     │     └── *.js.map
│     └── index.html
|
├── node_modules/     # Installed packages necessary for Create-React-App
|
├── src/              # Application root
|   |
|   ├── assets
│   │   └── images/   # logo, icon etc., 
│   ├── components/   # Application components
│   │   └── SampleComponent/
│   │       ├── index.jsx
│   │       ├── styles.scss
│   │       └── SampleComponent.test.js
│   ├── services/     # Service level modules. e.g., web-service-handler.js
│   ├── routes/       # Application routes. e.g., Login, SignUp, Home
│   ├── config/       # Application configuration related files
│   │   └── constants.js
│   ├── index.scss
│   ├── index.jsx
│   ├── index.html
│   ├── App.jsx
│   ├── App.scss
│   └── App.test.js
├── package.json
├── package-lock.json
└── README.md

4 directories, 12 files
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
To deploy an the application simply transfer the dist to a web server's public directory.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run build:analyze`

Compiles the app for production and we will have a report and stats for the bundle on dist folder.

### `npm run start-server`

It will start the mock server in a different process on 3001 port and enables file watch.<br/> 
All console.log will be available on pm2 logs command.<br/>
pm2 flush will clear all logs.
(refer pm2 document for more info) 

### `npm run stop-server`

It will stop the mock server and disables file watch 
