# MicroBit
## Guide for installation
###### Web browsers
You can use any common browser(not internet Explorer).
###### Terminal
A terminal is also needed. You can use e.g cygwin or powershell.
###### Npm & Node.js
Project Microbit is built with npm and Node.js, type "npm install" to get all the used dependencies in this project.
###### Python and PIP
The script is in python so python must be installed on your system. Pip is also used and the dependencies choosen are Serial, MicroPython and MYSQL-connector.
###### MySql
Database is created with Mysql and to create the database there is a bash script(sql/reset.bash) that can be run in a terminal to setup the database.

## Guide for running the program
###### Step1: Setup the database
Setup the database with bash.reset or setup.sql and after ddl.sql
###### Step2: Transfer code to sensors
The python script can be uploaded to the sensors by using an online pythoneditor e.g https://python.microbit.org/v/1.1
Transfer LoadReceiver.py to a sensor that you want it to be a reciever(R) to recieve data from other microbits.
Transfer LoadSender.py to your other microbit/s. Give each microbit a unique id and specify number of seconds between each reading.
###### Step3: Connecting the microbits
Connect the reciever microbit with usb to pc and it should indicate/display "R". Connect the other microbits to a battery source provided with microbits and they should display their id's.
###### step4: Running the web application
In e.g cygwin or Powershell terminal navigate your way to where the project is located and run "node index.js" to start the server.
###### step5: Open the web application
Start the website by typing http://localhost:1337/sensors/about.
###### step6: log in to register number of microbits
Navigate to "Add sensors" and the desired number of sensors.
**NOTE: in field sensors id be sure to enter the id that displays on the sensors otherwise the data will be lost and not saved in the database.**

###### step7: Start collecting data
Open a terminal and navigate yourself to the project folder and to start collecting data, just run "python3 connect.py".
###### Step8: See the information
The information can be shown if clicked on sensors names.
