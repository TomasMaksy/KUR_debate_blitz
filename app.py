from flask import Flask
from app.design import *
from app.main import *
from app.questions import *
from app.utils import *

app = Flask(__name__)

# Registering the main blueprint
app.register_blueprint(bp)

if __name__ == '__main__':
    app.run(debug=True)
