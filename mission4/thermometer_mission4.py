import os
import glob
import time
import requests, json
import urllib.request
import http
os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'

def read_temp_raw():
  f = open(device_file, 'r')
  lines = f.readlines()
  f.close()
  return lines

def read_temp():
  lines = read_temp_raw()
  while lines[0].strip()[-3:] != 'YES':
    time.sleep(0.2)
    lines = read_temp_raw()
  equals_pos = lines[1].find('t=')
  if equals_pos != -1:
    temp_string = lines[1][equals_pos+2:]
    temp_c = float(temp_string) / 1000.0
    return temp_c

while True:
  t = read_temp()
  print(t)
  requ = urllib.request.Request("http://10.42.0.239:8080/logone?temperature="+str(t))
  
  data = urllib.request.urlopen(requ).read()
  print("complete to request to nodejs")
  f = urllib.request.urlopen("https://api.thingspeak.com/update?api_key=AXL020SBKJ5WHJKR&field1="+ str(t))
  print("complete to insert thingSpeak")
  print("\n")
  time.sleep(5) #timescale 10sec
