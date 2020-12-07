# Weekly Calendar

## Table of Contents

1. <a href="#description">Description</a>
2. <a href="#installation">Installation</a>
3. <a href="#usage">Usage</a>
4. <a href="#code">Code Discussion</a>
5. <a href="#contributions">Contributions</a>
6. <a href="#questions">Issues and Questions</a>
<hr><h3 id='description'>Description</h3>
The deployed app may be viewed on <a href='https://weekly-event-calendar.herokuapp.com/'>Heroku servers</a> (Heroku provides free hosting, and may take a minute to spin up the app if the server has been idle). The test username 'calendar' and password 'weekly' may be used in lieu of signing up. This app is a calendar that shows the days of a week, and lets users keep track of hourly events - namely, their times, names, locations, and descriptions. Events may be deleted and updated as well. The app shows the current time, and lets users move forward or back calendar weeks.

![image](https://user-images.githubusercontent.com/64618290/101298984-43d4f380-37e5-11eb-9a8f-8e71543111e7.png)


![image](https://user-images.githubusercontent.com/64618290/101299718-032aa980-37e8-11eb-90c9-75b03859411d.png)


<h3 id='installation'>Installation</h3>
<p>The deployed website may be visited on <a href='https://weekly-event-calendar.herokuapp.com/'>Heroku servers</a>.</p> 

<p>The website may be run on a local host by cloning this repository, navigating to the project directory in a terminal, and using the command 'npm install'. Node.js and Node Package Manager must be installed prior. Sass should also be installed. If not already installed, Sass may quickly be installed locally in the project directory with the command 'npm install sass'. However, be sure to check out the <a href='https://sass-lang.com/'>Sass website</a> for detailed installation instructions. Once installed, the website may be run on a local host using the command 'npm run start' in the project directory. The webpage will be hosted locally on port 3000 by default, and may be accessed at localhost:3000 in a browser.</p>

 <p>If scss files are to be edited, the script 'npm run watch-sass', found in package.json, may be used to automatically watch SCSS files and update the CSS as needed. However, the watch-sass script may have to be edited depending on the local machine and sass installation - again, check out the Sass website for details on using the 'sass --watch' command.</p>

<h3 id='usage'>Usage</h3>
Click on calendar spaces to add, update, or delete events. Navigate through weeks by pressing the 'back' and 'forward' buttons. Quickly navigate to the current week and time by pressing the 'today' button.

<h3 id='code'>Code Discussion</h3>
<p>This project was created using the MERN technology stack - MongoDB, Express.js, React, and Node.js. The project was started using my own template, located at <a href=https://github.com/Koldenblue/mern-redux-auth-template>this GitHub repository</a>. Redux is used as a companion to React, in order to keep track of certain global states. The dayjs library is used for date formatting and functionality. Sass was helpful for doing CSS calculations and generating media queries. Other useful libraries are listed in the two package.json files, and include Bootstrap, bcrypt, axios, passport, and the mongoose ORM.</p>
 <p>The main frontend React components are located in '/client/src/components'. Here, several components make up the main logic for displaying the calendar and UI. The App.js component is the second highest-order component, just under index.js, and is where user functionality and routing begins. App.js is a good place to start for anyone reading through the code.</p>
 <p> Backend routing for the Mongo database may be viewed in the 'routes' folder. These routes take care of any needed database interactions, such as login interactions and calendar event storage.</p> 

<h3 id='contributions'>Contributions</h3>
Contact the author through GitHub.

<h3 id='questions'>Issues and Questions</h3>
Issues and questions may be emailed to 'kmillergit' at the domain 'outlook.com'. The author's GitHub profile may be found at https://github.com/Koldenblue.<p><sub><sup>This readme was generated with the help of the readme generator program at https://github.com/Koldenblue/readme-generator.</sup></sub></p>