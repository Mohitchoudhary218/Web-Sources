#!/usr/bin/env python3

from flask import Flask, jsonify, request, render_template, json, redirect

app = Flask(__name__)

@app.route("/")
def func():
    return render_template("display.html")

@app.route("/ContactMe.html")
def func1():
    return render_template("ContactMe.html")

@app.route("/Hobbies.html")
def func2():
    return render_template("Hobbies.html")



if __name__ == "__main__":
    app.run(debug=True)

