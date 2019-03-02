from flask import Flask, render_template, request
app = Flask(__name__)

students = []

@app.route("/")
def hello():
    return render_template("index.html")


@app.route("/register", methods=['POST'])
def register():
    name = request.form.get("name")
    if not name:
        print("nah")
    print("yaah")
    return render_template("index.html")


if __name__ == '__main__':

    app.debug = True
    app.run(host='192.168.0.19', port=8000)
    '''host='192.168.0.13', port=8000'''