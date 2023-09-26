'''
To run:
set FLASK_APP=Application.py
set FLASK_ENV=development
flask run --port=80

To quit: Ctrl + C (you might have to type this more than once)
'''

import json
from flask import Flask, render_template, request, jsonify
from markupsafe import escape
import uuid
import mysql.connector
from mysql.connector import Error



app = Flask(__name__)

database_order = {
  'customer' : {
    'firstname' : "",
    'lastname' : ""
  },
  'pizza' : []
}
# this is the dictionary for loading the data from the mysql database.

@app.route("/")
@app.route('/<path:subpath>')
def landing_page(subpath = 'index.html'):
    return render_template(escape(subpath))
#this is the access the index.html page
@app.route("/submit", methods=['POST'])
def submittion():
    order = request.json  #this is to get the data from the UI to business layer using javascrip (await)
    order_name = order['customer']
    order_list = order['pizza']
    try:             #this is to connect my own credential to login to my local database server. one can change these credential accordingly.
        conn = mysql.connector.connect(host='localhost',database='assignment2',user='mohitrockall', password='H2ta0Dx@')
        if conn.is_connected():
            db_Info = conn.get_server_info()
            print("Connected to Mysql server info",db_Info)
            cursor = conn.cursor()     #loading the json data into the schema design by me for pizza and customer table
            cursor.execute(f"INSERT INTO CUSTOMER (ID,FIRST_NAME,LAST_NAME) VALUES ('0','{order_name['first_name']}','{order_name['last_name']}');")
            cursor.execute(f"SELECT FIRST_NAME FROM CUSTOMER WHERE ID = {0};")
            result = cursor.fetchone()  #pizza table stores all the data regarding the order and customer table stores the name of the customer.
            database_name = database_order['customer']
            database_name['firstname'] = result[0]

            cursor.execute(f"SELECT LAST_NAME FROM CUSTOMER WHERE ID = {0};")
            result = cursor.fetchone()   #retrive the data from the database to local database_order dictionary. 
            database_name = database_order['customer']
            database_name['lastname'] = result[0]


            for i in range(0,len(order['pizza'])):
              order_item = order_list[i]
              cursor.execute(f"INSERT INTO PIZZA(ID,PIZZA_TYPE,PIZZA_SIZE,COUNT) VALUES ('{i}','{order_item['pizza_type']}','{order_item['pizza_size']}','{order_item['count']}');")
            
            for i in range(0,len(database_order['pizza'])):
              database_order['pizza'].pop()
              


            database_name = database_order['pizza']

            for i in range(0,len(order['pizza'])):
              cursor.execute(f"SELECT PIZZA_TYPE FROM PIZZA WHERE ID = {i};")
              pizzatype = cursor.fetchone()
              cursor.execute(f"SELECT PIZZA_SIZE FROM PIZZA WHERE ID = {i};")
              pizzasize = cursor.fetchone()
              cursor.execute(f"SELECT COUNT FROM PIZZA WHERE ID = {i};")
              count = cursor.fetchone()
              data = {"PizzaType":pizzatype[0], "PizzaSize":pizzasize[0], "Count": count[0]}
              database_name.append(data)
           
            conn.commit() #clearing the data from the table after being retrieved by the business layer.
            cursor.execute("TRUNCATE TABLE PIZZA;")
            cursor.execute("TRUNCATE TABLE CUSTOMER;")


    except Error as e:
        print(f"the error is: {e}")
    finally:
        if(conn.is_connected()):
            cursor.close()
            conn.close()
            print("server has been closed")

    database_order['id'] = uuid.uuid4() #including the id for each order
    database_order['status'] = 'confirmed' #writing the confirmed status
    return database_order #returning this file to await function in javascript as a response.





if __name__ == "__main__":
    app.run(debug=True)
