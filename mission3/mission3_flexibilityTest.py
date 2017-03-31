
import time
import RPi.GPIO as GPIO
import random

pin=[3,5,8,11,13,15,19,21,23,10,7,12]

# to use Raspberry Pi board pin numbers
GPIO.setmode(GPIO.BOARD)
good_count = 0
fail_count = 0

def setup(p):
  GPIO.setup(pin[p], GPIO.OUT)

def out(p, v):
  GPIO.output(p, v)

def gotit(channel):
  global good_count
  global fail_count
  if light_on == 1:
    print("good!")
    good_count += 1
  else:
    print("fail!")
    fail_count += 1

GPIO.setup(26, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(26, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.add_event_detect(26, GPIO.FALLING, callback=gotit, bouncetime=300)

for i in range(0, len(pin)): setup(i)

light_on = 0
loop_count = 0

# description
time.sleep(3)
print("********************************************")
print("This is flexibility test!!")
print("You have a 10 chance!")
time.sleep(2)
print("if press button When light is on, you get a good point")
print("But light isn't on, you get a fail point")
time.sleep(3)
print("Are you ready?")
time.sleep(0.5)
print("Go!!")
time.sleep(1)

#main
try:
 while True:
   if loop_count > 9:
     break
   i = random.choice(pin)  #LED number, random choice 
   out(i, 1); # LED on
   light_on = 1  # LED on signal
   v = GPIO.input(26) 
   time.sleep(0.5) 
   out(i, 0);  # LED down
   light_on = 0 # LED down signal
   time.sleep(random.randint(1,3)) # random sleep 1~3second

   loop_count += 1
    

 # End loop
 print("***************************")
 print("******** Game END! ********")
 print("***************************")
 
 if good_count > fail_count:
   print("    Good count = %d"%good_count)
   print("    Fail count = %d"%fail_count)
   print("    You are so fast!")
 else:
   print("    Good count = %d"%good_count)
   print("    Fail count = %d"%fail_count)
   print("    You are so slow!")

 GPIO.cleanup()

except KeyboardInterrupt:
 print("Game END!")
 GPIO.cleanup()

