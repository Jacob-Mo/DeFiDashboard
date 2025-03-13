import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

interface DeFiData {
  name: string;
  value: number;
}

const fetchDeFiData = async (): Promise<DeFiData[]> => {
  const API_URL = process.env.DEFI_API_URL;
  if (!API_URL) {
    throw new Error('API URL not defined in .env file');
  }

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error fetching API: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch DeFi data: ${error.message}`);
  }
};

const renderData = (data: DeFiData[]): void => {
  console.log('Rendering data:', data);
};

const dashboard = async (): Promise<void> => {
  try {
    const data = await fetchDeFiData();
    renderData(data);

  } catch (error) {
    console.error('Error in dashboard functionality:', error.message);
  }
};

export { dashboard };