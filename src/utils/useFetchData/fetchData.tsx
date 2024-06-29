import axios from 'axios';

export const fetchData = async (apiUrl: string) => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('An error occurred while fetching data');
  }
};