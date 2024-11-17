import fetch from 'node-fetch';

const BASE_API_URL = process.env.BASE_API_URL || 'https://your-backend-api.com';

export async function fetchDeFiData(): Promise<any> {
  try {
    const requestUrl = `${BASE_API_URL}/defi/data`;
    
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch DeFi data from API.');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching DeFi data:', error);
    throw error;
  }
}

export async function submitTransaction(transactionData: object): Promise<any> {
  try {
    const requestUrl = `${BASE_API_URL}/transactions/submit`;

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit new transaction to API.');
    }

    return response.json();
  } catch (error) {
    console.error('Error submitting transaction:', error);
    throw error;
  }
}

export async function getTransactionHistory(userId: string): Promise<any> {
  try {
    const requestUrl = `${BASE_API_URL}/transactions/history/${userId}`;

    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch transaction history from API.');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    throw error;
  }
}