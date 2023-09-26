#!/usr/bin/env python3

from flask import Flask, render_template

app = Flask(__name__)

@app.route("/item.html")
def first_assignment():

    return render_template("item.html")


if __name__ == "__main__":
    app.run(debug=True)


