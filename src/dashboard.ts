import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

interface DeFiData {
  name: string;
  value: number;
}

interface CacheEntry {
  expiry: number;
  data: DeFiData[];
}

const CACHE_DURATION = 300000; // Cache duration in milliseconds (e.g., 300000 ms = 5 minutes)
const cache: { [key: string]: CacheEntry } = {};

const fetchDeFiData = async (): Promise<DeFiData[]> => {
  const API_URL = process.env.DEFI_API_URL;
  if (!API_URL) {
    throw new Error('API URL not defined in .env file');
  }

  // Check cache first
  const now = Date.now();
  if (cache[API_URL] && cache[API_URL].expiry > now) {
    return cache[API_URL].data;
  }

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error fetching API: ${response.statusText}`);
    }

    const data = await response.json();

    // Update cache
    cache[API_URL] = {
      expiry: now + CACHE_DURATION,
      data: data,
    };

    return data;
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