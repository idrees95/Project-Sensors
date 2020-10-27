from microbit import *

while True:
    print(str(1) + ":" + str(temperature()) + ":" + str(display.read_light_level()) + ":")
    sleep(1000)
