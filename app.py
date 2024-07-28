from flask import Flask, jsonify, request
import os
import json

app = Flask(__name__)

defi_assets = {
    "tokens": [{"name": "Token A", "value": 100}, {"name": "Token B", "value": 200}],
    "prices": {"Token A": "$1", "Token B": "$2"}
}

transactions_log = []

@app.route('/get-defi-assets', methods=['GET']) 
def get_defi_assets():
    return jsonify(defi_assets), 200

@app.route('/log-transaction', methods=['POST']) 
def log_transaction():
    transaction = request.json
    transactions_log.append(transaction)
    return jsonify({"message": "Transaction logged successfully", "transaction": transaction}), 200

@app.route('/get-transaction-history', methods=['GET']) 
def get_transaction_history():
    return jsonify(transactions_log), 200

if __name__ == '__main__':
    from dotenv import load_dotenv
    load_dotenv()
    port = os.getenv("PORT", 5000)
    app.run(debug=True, port=port)