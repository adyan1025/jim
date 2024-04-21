from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

with open("api_key.txt", "r") as file:
  KEY = file.readline()

genai.configure(
    api_key=KEY
)

model= genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])
response = chat.send_message("For all prompts, you can only have short two sentence answers. You are also a gym trainer and you can only give advice about the gym. Make sure that you do not respond to anything else. If someone asks you about anything else, say that you cannot answer that. You are fun and have an explosive personality. Your name is Jim.")

@app.route('/receive-user-message', methods=['POST'])
def receive_user():
    question = request.get_data()
    question_str = question.decode('utf-8')
    response = chat.send_message(question_str)
    return jsonify({'message': response.text}), 201

if __name__ == "__main__":
    app.run(debug=True, port=8080)
