



'''
How to run: python WebServerWithImage.py
How to stop: (see: https://stackoverflow.com/questions/1364173/stopping-python-using-ctrlc/1364409)
Mac OS and Linux: Ctrl + C or Ctrl+Shift+\ or Ctrl+ 

Windows:
    General: Ctrl+Break
    Dell: Ctrl+Fn+F6 or Ctrl+Fn+S
    Lenovo: Ctrl+Fn+F11 or Ctrl+Fn+B
    HP: Ctrl+Fn+Shift
    Samsung: Fn+Esc
'''

#TO START THIS APPLICATION KINDLY PUT THIS FILE IN THE FOLDER ALONG WITH .ZIP,.HTML AND .JPG FILE.

import os
from random import Random
import time
from OpenSSL import SSL 

from socket import *  #import the liberary
serverPort = 8085
serverSocket = socket(AF_INET, SOCK_STREAM)  #taking the two functions within socket
serverSocket.bind(('', serverPort)) 
serverSocket.listen(1)
print('The server is ready to listen ...')


visit_count = 0  #This is the initialization of the count(Q3)
cookie_ID = "38afes7a8" #Setting the randam Cookie for client-server communication

if(cookie_ID == None):  # When the cookie has been deleted or lost, so we need to reset it 
    code = Random.randint(100000000,999999999)
    cookie_ID = str(code)
    visit_count = 0

cookie = f"Set-Cookie: session_ID={cookie_ID}" #creating the header string for cookie
while True:
    connectionSocket, addr = serverSocket.accept()
    message = connectionSocket.recv(2048).decode()
    jpg = message.split()[1][1:]

    if(message and not('.html' in jpg)):          #counting mechanism of visiting if the request recieved and it is not for html file        
        visit_count+=1
        print(f"Count of visits: {visit_count}")     #counting mechanism of visiting if the request recieved and it is for html file
    elif(message and ('.html' in jpg)):
        if(visit_count == 0):
            print(f"Count of visits(Please see the count for HTML, ignore other counts for this case): {visit_count+1}")
        else:
            print(f"Count of visits(Please see the count for HTML, ignore other counts for this case): {visit_count}")
    else:
        print("Please enter either .jpg, .zip, or .html")

    if len(message) == 0:
        print("Message is empty")
        continue
    if '.jpg' in jpg:
        siz = os.path.getsize(jpg) #This will display the size of the jpg file in terminal
        size_mb=siz/(1024*1024)  #converting units of size to megabytes
        last_mod = os.path.getmtime(jpg) #this is used to get the last-modified date (Q3)
        print("......................\n")
        print("size of the image is: ",size_mb,"mb") #printing the size
        print("......................\n")
        print("......................\n")
        print("Last_modified",time.ctime(last_mod))  #printing the last-modified date 
        print("......................\n")
        print("=======================================")
        print("Received request:")
        print("=======================================")    
        print(message)
       

    if '.zip' in jpg:   
        siz_zip = os.path.getsize(jpg)  #This will display the size of the jpg (compressed) file in terminal
        size_mb_zip = siz_zip/(1024*1024) #converting units of size to megabytes
        last_mod = os.path.getmtime(jpg)  #this is used to get the last-modified date (Q3)
        print("......................\n")
        print("size of the zip is: ",size_mb_zip,"mb") #printing the size
        print("......................\n")
        print("......................\n")
        print("Last_modified",time.ctime(last_mod)) #printing the last-modified date 
        print("......................\n")
        print("=======================================")
        print("Received request:")
        print("=======================================")    
        print(message)

    if '.html' in jpg:
        siz_html = os.path.getsize(jpg)  #This will display the size of the html file in terminal
        size_html_mb = siz_html/(1024*1024) #converting units of size to megabytes
        last_mod = os.path.getmtime(jpg) #this is used to get the last-modified date (Q3)
        print("......................\n")
        print("size of the Html is: ",size_html_mb,"mb") #printing the size
        print("......................\n")
        print("......................\n")
        print("Last_modified",time.ctime(last_mod)) #printing the last-modified date
        print("......................\n")
        print("=======================================")
        print("Received request:")
        print("=======================================")    
        print(message)
    


    try:
        filename = message.split()[1][1:]
        if '.jpg' in filename:
            content_type_header = "Content-Type: image/jpeg\r\n"
            f = open(filename, "rb")
            outputdata = f.read()
        elif '.zip' in filename:
            content_type_header = "Content-Type: application/zip\r\n" #writing the content type to let know the user agent about the kind of file
            f = open(filename,"rb")
            outputdata = f.read()
        else:
            content_type_header = "Content-Type: text/html\r\n"
            f = open(filename)
            outputdata = f.read().encode()
        

        #Send one HTTP header line into socket
        #any random dates other than last_modified date for entering the if loop
        date_zip = "Sat Sep 24 22:35:40 2022"
        date_html = "Sat Sep 24 12:16:41 2022"
        date_jpg = "Sat Sep 24 11:19:23 2022"

        if ".jpg" in filename:
            last_modified_date = time.ctime(os.path.getmtime(filename)) #use to convert the timestramp into standard timedate formate
            if(last_modified_date != date_jpg):  #if loop for sending the header string based on whether the jpg has been modified or not 
                header = "HTTP/1.1 200 OK \r\n"
                date_jpg = last_modified_date
            else:
                header = "HTTP/1.1 304 Not Modified \r\n"
        
        if ".zip" in filename:
            last_modified_date = time.ctime(os.path.getmtime(filename)) #use to convert the timestramp into standard timedate formate
            if(last_modified_date != date_zip): #if loop for sending the header string based on whether the zip has been modified or not 
                header = "HTTP/1.1 200 OK \r\n"
                date_jpg = last_modified_date
            else:
                header = "HTTP/1.1 304 Not Modified \r\n"
        
        if ".html" in filename:
            last_modified_date = time.ctime(os.path.getmtime(filename)) #use to convert the timestramp into standard timedate formate
            if(last_modified_date != date_html): #if loop for sending the header string based on whether the zip has been modified or not 
                header = "HTTP/1.1 200 OK \r\n"
                date_jpg = last_modified_date
            else:
                header = "HTTP/1.1 304 Not Modified \r\n"
        
        connectionSocket.send(header.encode())

        connectionSocket.send(cookie.encode())

        #Send content type header
        connectionSocket.send(content_type_header.encode())

        #Send empty line
        connectionSocket.send("\r\n".encode())

        #Send the content of the requested file to the client
        connectionSocket.send(outputdata)
        connectionSocket.send("\r\n".encode())
    except IOError:
        # Return Not Found status
        connectionSocket.send("HTTP/1.1 404 Not Found \r\n".encode())
        #connectionSocket.send("\r\n".encode())
    connectionSocket.close()
