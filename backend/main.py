from flask import Flask, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
cors = CORS(app, origins='*')

with open("api_key.txt", "r") as file:
  KEY = file.readline()

genai.configure(
    api_key=KEY
)

model= genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])
response = chat.send_message("Tell me about the moon. Do not use any fancy styling like bolding or anything. Only use text. Make it under 2 sentences.")

@app.route("/gemini-message", methods=['GET'])
def users():
    return jsonify(
        {
            "message": response.text
        }
    )

if __name__ == "__main__":
    app.run(debug=True, port=8080)
