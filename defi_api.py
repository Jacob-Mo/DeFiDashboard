import requests
from dotenv import load_dotenv
import gc  # For manually triggering garbage collection if necessary

load_dotenv()

UNISWAP_BASE_URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"
AAVE_BASE_URL = "https://api.thegraph.com/subgraphs/name/aave/protocol-multy-raw"
COMP_BASE_URL = "https://api.compound.finance/api/v2/cToken"

# Reuse session across requests
session = requests.Session()
session.headers.update({"Content-Type": "application/json"})

def fetch_graphql_data(base_url, query):
    response = session.post(base_url, json={'query': query})
    data = response.json() if response.status_code == 200 else {"error": response.text}
    # Triggering garbage collection post heavy response processing
    gc.collect()
    return data

def fetch_compound_data():
    response = session.get(COMP_BASE_URL)
    data = response.json() if response.status_code == 200 else {"error": response.text}
    # Triggering garbage collection
    gc.collect()
    return data

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

# Execute fetch operations
uniswap_data = fetch_graphql_data(UNISWAP_BASE_URL, query_uniswap)
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
aave_data = fetch_graphql_data(AAVE_BASE_URL, aave_query)
print(aave_data)

compound_data = fetch_compound_data()
print(compound_data)