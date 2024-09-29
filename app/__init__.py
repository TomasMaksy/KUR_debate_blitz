from flask import Flask

def create_app():
    app = Flask(__name__)

    with app.app_context():
        from . import main  # Import your main routes
        app.register_blueprint(main.bp)

    return app
