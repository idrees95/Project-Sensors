import serial
import time
import datetime
import mysql.connector
import pytz
import sys

#
# A program to retrieve data from Micro:Bit and store it in database
#

# Connect to serial port
# s = serial.Serial()
port = "/dev/ttyS9"
baudrate = 115200

s = serial.Serial(port, baudrate, timeout = 0)
if s.isOpen == False :
    s = s.open()

# print(s.name)
# s.baudrate = baud

# Establish connection to database
mydb = mysql.connector.connect(
  host='localhost',
  database='sensors',
  user='user',
  password='pass'
)

try:
    # Retrieve data from Micro:Bit and store to database (together with date and time)
    mycursor = mydb.cursor()

    while True:

        data = s.readline()
        #data = data[0:16]
        data = data.decode().split(":") # Will return SensorID, Temprature, DisplayLevel

        if len(data) >= 3:

            sensorId = data[0]
            temperature = data[1]
            lightcondition = data[2]
            dateAndTime = datetime.datetime.now(pytz.timezone('CET'))

            print("SensorId: ", sensorId)
            print("Date and time: ", dateAndTime)
            print("Temperature: ", temperature)
            print("Light: ", lightcondition, "\n")
            print("-------------------")

            sql = "SELECT sensorId FROM sensor WHERE archived = 0 AND customId = '{}'".format(sensorId)
            mycursor.execute(sql)
            res = mycursor.fetchall()
            if res:
                sql = 'INSERT INTO valuess (sensorId, dateAndTime, temperature, lightcondition) VALUES (%s, %s, %s, %s)'
                val = (res[0][0], dateAndTime, temperature, lightcondition)
                mycursor.execute(sql, val)
                mydb.commit()
            else:
                print("Data can not be saved in Database as ID {} Doesn't exist in Sensor Table".format(sensorId))

except mysql.connector.Error as error:
    print("Failed to insert into table in MySQL: {}".format(error))

except Exception as e:
    print('Error Occured!')
    print(e)

finally:
    if (mydb.is_connected()):
        mycursor.close()
        mydb.close()
        print("MySQL connection is closed")
