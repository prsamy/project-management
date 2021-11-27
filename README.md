# project-management

Steps for project setup
=======================
1. clone the project from GitHub
2. Go to server directory
    a. run 'npm install' to install all dependent packages required for the project
    b. run 'npm install -g mocha' to run the unit testing
    b. run 'npm test' to execute unit test casesm written with Mocha and Chai
    c. rum 'npm start' to start the server, which is listening in port 8081 - localhost:8081
3. Go to client directory
    a. run 'npm install'
    b. run 'npm run test:unit' to run unit testing for Vue components
    b. ensure server is already running
    c. run 'npm run dev'
    d. Open client url mentioned below in chrome or firefox browser

URL
===
Server: http://localhost:8081
Client: http://localhost:8080

On the browser
==============
1. Open the client URL
2. An employee and couple of projects would have been loaded at the moment, if you have executed server unit test
3. Press Add FAB button to add employee and project
4. In the form,
    a. you are allowed to enter valid values only
    b. by pressing Submit button which will be enabled after you provide valid data, data will be posted to the server and form modal will be closed
    c. You will see "Successfully added" message in the bottom left side of the screen
5. By pressing Edit button at bottom right side of each project,
    a. Prefilled form will be opened
    b. you can change value
    c. You will see "Successfully added/edited" message in the bottom left side of the screen
6. After form data is added/edited, please refresh the form to load the latest data from the server. --> TODO: fix to added value in the pag

Instructions
============
1. Data will be persisted in server/src/models/gsk.json
2. gsk.json file will be created once the application service is started
3. Execute server unit test as mentioned in 2.b test, which will generate some data (emploees and projects) and store in the file system
4. If there is an issue at server, like "Unexpected end of JSON input", please re-run sever unit test


Notes
=====
Keep improving unit test cases and some user experiances
