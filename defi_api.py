import requests
import os
from dotenv import load_dotenv

load_dotenv()

UNISWAP_BASE_URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"
AAVE_BASE_URL = "https://api.thegraph.com/subgraphs/name/aave/protocol-multy-raw"
COMP_BASE_URL = "https://api.compound.finance/api/v2/cToken"

def fetch_uniswap_data(query):
    headers = {"Content-Type": "application/json"}
    response = requests.post(UNISWAP_BASE_URL, json={'query': query}, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": response.text}

def fetch_aave_data(query):
    headers = {"Content-Type": "application/json"}
    response = requests.post(AAVE_BASE_URL, json={'query': query}, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": response.text}

def fetch_compound_data():
    response = requests.get(COMP_BASE_URL)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": response.text}

query_uniswap = """
{
  pairs(first: 10, orderBy: volumeUSD, orderDirection: desc) {
    id
    token0 {
      id
      symbol
    }
    token1 {
      id
      symbol
    }
    volumeUSD
  }
}
"""

uniswap_data = fetch_uniswap_data(query_uniswap)
print(uniswap_data)

aave_query = """
{
  deposits(first: 5) {
    id
    amount
    user {
      id
    }
  }
}
"""
aave_data = fetch_aave_data(aave_query)
print(aave_data)

compound_data = fetch_compound_data()
print(compound_data)