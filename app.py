from flask import Flask, jsonify, request
import os
import json

app = Flask(__name__)

defi_data = {
    "tokens": [{"name": "Token A", "value": 100}, {"name": "Token B", "value": 200}],
    "prices": {"Token A": "$1", "Token B": "$2"}
}

transaction_history = []

@app.route('/fetch-defi-data', methods=['GET'])
def fetch_defi_data():
    return jsonify(defi_data), 200

@app.route('/submit-transaction', methods=['POST'])
def submit_transaction():
    data = request.json
    transaction_history.append(data)
    return jsonify({"message": "Transaction submitted successfully", "data": data}), 200

@app.route('/fetch-transaction-history', methods=['GET'])
def fetch_transaction_history():
    return jsonify(transaction_history), 200

if __name__ == '__main__':
    from dotenv import load_dotenv
    load_dotenv()
    port = os.getenv("PORT", 5000)
    app.run(debug=True, port=port)