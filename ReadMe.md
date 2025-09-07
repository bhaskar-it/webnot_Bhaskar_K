Campus Event Management - Functional Prototype

My understanding of the project:

This is an functional prototype of an centralized event management platform. It is an web application that can manage an entire college events. Currently, managing the events in the college is messy, as information is scattered all across emails, social media. Tracking who want to come and who actually show up and their response to the event is a difficult process.

This difficulty is reduced by our website as it an one-step stop for all the event management for the colleges. It takes care of the entire process of creation of events to registering for the events by the students, Managing the attendance for the organizer,  recieving the feedback from the students and helps in generating the reports for the events by the organizers.

Project Overview

Managing college events is usually messy—information is scattered across emails, WhatsApp groups, and social media. It’s hard for organizers to track who’s interested, who actually attends, and what students think about the event afterward.

Our Campus Event Management Platform solves this by acting as a central hub for all college events.

With this web application, you can:

Create and publish events

Allow students to register easily

Track attendance

Collect feedback from participants

Generate reports for organizers

In short, it’s a one-stop solution for managing events from start to finish.

Installation and Setup
This project runs on Node.js and uses an Express server to manage the API and an SQLite database for storage.

Prerequisites
Node.js: You must have Node.js installed on your machine (which includes npm, the Node package manager).

Instructions
Clone the Repository
Clone this project to your local machine (or download and unzip the source code).

Bash

git clone https://github.com/your-username/CampusEventManagement.git
Navigate to the Prototype Folder
Open your terminal and navigate into the prototype/ directory, which contains the server files.

Bash

cd CampusEventManagement/prototype
Install Dependencies
From within the prototype directory, run npm install to download all the project dependencies listed in package.json (such as Express, SQLite3, etc.).

Bash

npm install
Run the Server
Start the backend server using the npm start command (this will likely run node server.js as defined in your package.json scripts).

Bash

npm start
Alternatively, you can run it directly:

Bash

node server.js
Server is Live
Your terminal should now show a confirmation message, such as Server listening on port 3000. The API is now active and ready to receive requests at http://localhost:3000.

Database Note
This prototype uses a file-based SQLite database (db.sqlite). All data for colleges, students, events, and registrations is contained within this single file. The db.js file manages the connection logic, and the server (via routes.js) performs all necessary queries against this file.

