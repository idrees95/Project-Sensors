from microbit import *
import radio    # Import radio functions

radio.on()  # Turn radio on
seconds =  5 # Wait between two readings
sender_id = 'A' #  Unique ID foreach sender like 'A', 'B', 'C'

# def get_serial_number(type=hex):
#     NRF_FICR_BASE = 0x10000000
#     DEVICEID_INDEX = 25 # deviceid[1]

#     @micropython.asm_thumb
#     def reg_read(r0):
#         ldr(r0, [r0, 0])
#     return type(reg_read(NRF_FICR_BASE + (DEVICEID_INDEX*4)))

while True:
    display.show(sender_id)
    radio.send(sender_id + ":" + str(temperature()) + ":" + str(display.read_light_level()))
    sleep(1000 * seconds)