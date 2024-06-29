// utils/withServerData.ts
import { GetServerSideProps } from 'next';
import { fetchData } from './fetchData';

export const withServerData = (apiUrl: string) => async (context:any): Promise<any> => {
  try {
    console.log('Fetching data from:', apiUrl);
    const data = await fetchData(apiUrl);

    return {
      props: {
        data,
        error: null,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        data: null,
        error: 'An error occurred while fetching data',
      },
    };
  }
};

export default withServerData;
