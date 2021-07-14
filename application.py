from flask import Flask, render_template

application = Flask(__name__)

@application.route("/")
def index():
    return "Hello ranisa deployment is done"

@application.route("/hello")
def hello():
    return render_template("index.html")


if __name__ == "__main__":
    application.run(port=5000, debug=True)
