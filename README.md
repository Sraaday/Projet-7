### This is the archive of the project 7 for the web developper cursus on OpenClassrooms.

This project is using Node.js .

The default port of the server is 3000 and can be changed in Backend/server.js , you must change the value in Frontend/project-7/src/components/APICall/APICall.vue too to make this change effective.

Frontend :

This project is using Vue.js 2.6.11 as frontend framework and has been generated with Vue-CLI.

Backend :

This project is using Node, Express 4.16.1 and Sequelize 6.3.5 .



### Step by step guide 

### I. FRONTEND SETUP ###

## Package installation

1. Use terminal and execute `cd Frontend` then `cd project-7`

2. Use terminal and execute `npm install`

3. Then use `cd ../Backend`

## Npm scripts & config

1. Project setup : `npm install`

2. Compiles and hot-reloads for development : `npm run serve`

3. Compiles and minifies for production : `npm run build`

4. Lints and fixes files : `npm run lint`

5. Customize configuration at (https://cli.vuejs.org/config/).

## II. BACKEND SETUP ##

## Package installation

1. In the terminal execute `cd Backend`

2. Then use `npm install`

## Npm scripts

- The backend server can be started with the command "nodemon server.js" by default, if you are using node.js only go to : Backend/package.json and in the section scripts replace "nodemon server.js" by "node server.js".

## Database connection

- The connection to the MySQL Server is made through an environnement variable via the plugin Dotenv, the environnement variable can be found at : Backend/.env.test , you can then fill the fields with your database's information.

- You can then rename the ".env.test" file by ".env" , doing so will allow you to : 

1. Connect the Backend server with your MySQL database if all the fields are correct.

2. Automatically trigger your Backend/.gitignore wich will prevent you to upload accidentally your ".env" with all your database's information.

