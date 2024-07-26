# Decentralized Finance Dashboard

## Description

A decentralized finance (DeFi) dashboard that aggregates data from various DeFi protocols. The project utilizes TypeScript for the frontend, Python for the backend, and Solidity for smart contract development. The frontend displays data from multiple DeFi protocols, the backend handles data aggregation and API interactions, and Solidity manages DeFi interactions on the blockchain.

## Requirements

- Node.js
- Python 3.8+
- Hardhat
- Metamask (or any Ethereum wallet)
- Flask

## Setup Instructions

### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Build the project:
    ```bash
    npm run build
    ```
4. Start the development server:
    ```bash
    npm start
    ```

### Backend

1. Navigate to the root directory:

2. Create a virtual environment:
    ```bash
    python -m venv venv
    ```
3. Activate the virtual environment:
    ```bash
    # On Windows
    venv\Scripts\activate

    # On macOS/Linux
    source venv/bin/activate
    ```
4. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
5. Run the Flask application:
    ```bash
    flask run
    ```

### Smart Contracts

1. Navigate to the contracts directory:
    ```bash
    cd contracts
    ```
2. Install Hardhat and dependencies:
    ```bash
    npm install --save-dev hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
    ```
3. Compile the smart contracts:
    ```bash
    npx hardhat compile
    ```
4. Deploy the smart contracts:
    ```bash
    npx hardhat run scripts/deploy.js --network localhost
    ```

## Usage

1. **Access the frontend application:**
   Open a web browser and go to `http://localhost:3000`.

2. **Interact with the backend API:**
   The backend API is available at `http://localhost:5000/api`.

3. **Interact with the smart contract:**
   Use the deployed contract address and ABI to interact with the smart contract via your Ethereum wallet.
