from microbit import *
import radio    # Import radio functions

radio.on()  # Turn radio on

while True:
    display.show("R")
    incoming = radio.receive()
    if incoming:
        print(incoming)
    sleep(125)
