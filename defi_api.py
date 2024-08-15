import requests
from dotenv import load_dotenv

load_dotenv()

UNISWAP_BASE_URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"
AAVE_BASE_URL = "https://api.thegraph.com/subgraphs/name/aave/protocol-multy-raw"
COMP_BASE_URL = "https://api.compound.finance/api/v2/cToken"

# Creating a global session object for reuse
session = requests.Session()
session.headers.update({"Content-Type": "application/json"})  # Most API uses JSON

def fetch_graphql_data(base_url, query):
    response = session.post(base_url, json={'query': query})
    return response.json() if response.status_code == 200 else {"error": response.text}

def fetch_compound_data():
    response = session.get(COMP_BASE_URL)
    return response.json() if response.status_code == 200 else {"error": response.text}

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

# Reusing a single fetch function for GraphQL APIs
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