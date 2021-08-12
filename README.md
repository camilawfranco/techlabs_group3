
## Available Scripts

### Initial setup Frontend

Before the first start run in the frontend folder:

### `npm install`

In the project directory, you can run every time you want to start the app:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Initial setup Backend

#### For Windows

install node.js (https://nodejs.org/en/)
### You can download the MongoDB Community Server from the MongoDB download page. 
The download is a zip file. Unzip the contents, change the folder name to “mongodb”, and 
move it to your users home directory. From there, create a “mongodb-data” directory in 
your user directory to store the database data. 
You can start the server using the following command. Make sure to swap out 
“/Users/Igor/” with the correct path to your users home directory. 

/Users/Igor/mongodb/bin/mongod --dbpath=/Users/Igor/mongodb-data 

Should run in one terminal all the time!!!!
### Install localy
npm i mongoose@5.3.16
npm i validator@10.9.0
npm i bcryptjs@2.4.3
npm i jsonwebtoken@8.4.0 
### Run in another terminal
npm run dev

#### For macOS

Follow the instructions given here (via homebrew) https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

Start the mongoDB local server via
### `brew services start mongodb-community@5.0`

Start the backend - go to the backend folder - src and type
### `node index.js`

Start the frontend - go to the frontend folder and type
### `npm start`



