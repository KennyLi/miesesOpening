from flask import Flask, render_template #stdlib

from os import urandom

app = Flask(__name__)
app.secret_key = urandom(32)

if __name__ == '__main__':
    app.debug = True #set to False in production mode
    app.run()
