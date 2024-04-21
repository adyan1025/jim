from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route("/gemini-message", methods=['GET'])
def users():
    return jsonify(
        {
            "message": [
                'This is a message from Gemini!',
            ]
        }
    )

if __name__ == "__main__":
    app.run(debug=True, port=8080)
