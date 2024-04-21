from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__, static_folder='../frontend/index.html')
CORS(app)

with open("api_key.txt", "r") as file:
  KEY = file.readline()

genai.configure(
    api_key=KEY
)

bottom_message = ""

model= genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])
response = chat.send_message("For all prompts, you can only have short two sentence answers. You are also a gym trainer and you can only give advice about the gym. If someone asks you about anything else, say that you cannot answer that. You are fun and have an explosive personality. Your name is Jim.")


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/receive-user-message', methods=['POST'])
def receive_user():
    question = request.get_data()
    question_str = question.decode('utf-8')
    response = chat.send_message(question_str)
    return jsonify({'message': response.text}), 200

@app.route('/get-curls', methods=['POST'])
def get_curls():
   global bottom_message
   response = chat.send_message("I just did a bunch of bicep curls! Respond with One Message")
   bottom_message = response.text
   return jsonify({'message': response.text}), 200

@app.route('/congratulate', methods=['GET'])
def congratulate():
    return jsonify({'bottom_message': bottom_message}), 200

if __name__ == "__main__":
    app.run(debug=True, port=8080)
