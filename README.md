
# Employee Database

![MIT license badge](https://img.shields.io/badge/license-MIT-green)


![Employee Database](./assets/images/screenshot.png)



## Description

A command-line application to manage a company's employee database, using Node.js, Inquirer, and MySQL

## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributing](#contributing)
  * [Testing](#testing)
  * [Questions](#questions)
  
## Installation
Make sure you have MySQL installed on your machine. For Windows, get it [here](https://dev.mysql.com/downloads/windows/installer/8.0.html) and for macOS, go [here](https://dev.mysql.com/downloads/mysql/) and select your operating system from the dropdown. Select clone project from GitHub to get project url, create a directory on your local machine where project will be created and open a terminal in this directory.  Run <$ git clone <project url>> to clone project into your machine, then cd into <employee-database>.  Run <$ npm install> to install all of the project's dependencies.  In the projects root directory, you will need to create a file named ".env", to hold your MySQL password safely.  In this file create a hash for your password in the form <DB_PASS=password>.  Finally, create a '.gitignore' file, also in your project's root, and add '.env' to it.  Now if you push your project to a public repo, your password will not be visible to others.  From here, follow Usage instructions to use application.

## Usage
To use application with sample data, run <$ npm start> then provide responses to prompts to interact with the database how you wish.  To reset or empty the database, you will need to open the MySQL CLI by running <$ mysql -u root -p> and providing your MySQL password.  Then at the mysql prompt, enter <mysql use employee_tracker_db;>.  At this point you can run queries directly on the database.  If you would like to empty the database completely run <mysql source ./db/schema.sql>.  This will create the tables but they will have no data so you can enter your own.  If you would like to reset the database with seed data, run <mysql source ./db/seeds.sql> directly after the previous <schema.sql> command.  To leave the MySQL CLI, type <mysql quit;> and you will return to your terminal prompt.
To see an example of the application in use visit [here](https://drive.google.com/file/d/1IP-UqG3k2mjywhdTtKAODVVYG2ul6H9X/view).

## License 
This project is covered under the MIT license 


## Contributing
To see the guidelines adopted for contributing to this project, please view the [Contributor Covenant](https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.txt)

## Testing
Tests coming soon

## Questions
Visit me at GitHub  
[christopherConcannon](https://github.com/christopherConcannon)
  
If you have any questions or would like to contact me, please email me at  
[cmcon@yahoo.com](mailto:cmcon@yahoo.com)
