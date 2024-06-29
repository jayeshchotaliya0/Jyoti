import { useState, useEffect } from 'react';
import service from '../service/service';
import { useDispatch } from 'react-redux';
import { closeModal, confirmationClose, confirmationOpen } from '../redux/features/reduxData';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const useFetchData = (apiUrl?: any) => {
  const [data, setData] = useState<any[]>([]);
  const [listData, setListData] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch()
 
  const fetchData = async () => {
    try {
      setLoading(true);
      const response: any = await service.makeAPICall({
        methodName: service.Methods.GET,
        apiUrl: apiUrl,
      });
      if (response?.apiStatus) {
        setData(response?.apiData);
      } else {
        setError('Failed to fetch data');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if(apiUrl){

      fetchData();
    }
  }, [apiUrl]);
  
  const getListData = async (apiUrls: { [key: string]: string }) => {
    try {
      setLoading(true);
      const responses: any = await Promise.all(Object.entries(apiUrls).map(async ([key, url]) => {
        const response = await service.makeAPICall({
          methodName: service.Methods.GET,
          apiUrl: url,
        });
        return { key, response };
      }));
      responses.forEach(({ key, response }: any) => {
        if (response.apiStatus) {
          setListData(prevData => ({ ...prevData, [key]: response.apiData }));
        } else {
          setError(`Failed to fetch data for ${key}`);
        }
      });
    } catch (err) {
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };
  
  const getItemById = async (id: any,apiUrl: string) => {
    try {
      setLoading(true);
      const response: any = await service.makeAPICall({
        methodName: service.Methods.GET,
        apiUrl: apiUrl,
        params:id
      });

      if (response.apiStatus) {
        return response.apiData;
      } else {
        setError('Failed to fetch item by ID');
      }
    } catch (err) {
      setError('An error occurred while fetching item by ID');
    } finally {
      setLoading(false);
    }
  };
  const getQueryFetch = async (queryParams: Record<string, any>, apiUrl: string) => {
    try {
      setLoading(true);
      const response: any = await service.makeAPICall({
        methodName: service.Methods.GET,
        apiUrl: apiUrl,
        query:queryParams
      });

      if (response.apiStatus) {
        return response.apiData;
      } else {
        setError('Failed to fetch item by ID');
      }
    } catch (err) {
      setError('An error occurred while fetching item by ID');
    } finally {
      setLoading(false);
    }
  };

  const addData = async (newItem: any, apiUrl: string,reset?:any) => {
    try {
      setLoading(true);
      const response: any = await service.makeAPICall({
        methodName: service.Methods.POST,
        apiUrl: apiUrl,
        body: newItem,
      });
      console.log("response", response)
      if (response.apiStatus) {
        reset()
        dispatch(closeModal())
        fetchData();
      } else {
          if(response.data.errors)
          {
            const errorMessages = Object.values(response.data.errors)
            .flat()
            .join(' ');
            toast.error(`Failed to add data: ${errorMessages}`);
          }
          else
          {
            toast.error(`Failed to add data: ${response.data.apiErrorData}`);
          }
        setError('Failed to add data');

      }
    } catch (err) {
      setError('An error occurred while adding data');

    } finally {
      setLoading(false);
    }
  };

  const updateData = async (updatedItem: any, apiUrl: string,reset?:any) => {
    try {
      setLoading(true);
      const response: any = await service.makeAPICall({
        methodName: service.Methods.PUT,
        apiUrl: `${apiUrl}`,
        body: updatedItem,
      });

      if (response.apiStatus) {
        reset()
        dispatch(closeModal())
        fetchData()
      } else {
        setError('Failed to update data');
      }
    } catch (err) {
      setError('An error occurred while updating data');
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: any,apiUrl?: string) => {
    try {
      setLoading(true);
      const response: any = await service.makeAPICall({
        methodName: service.Methods.DELETE,
        apiUrl: `${apiUrl}`,
        params:id
      });

      if (response.apiStatus) {
        fetchData()
        dispatch(confirmationClose())
      } else {
        setError('Failed to delete item');
      }
    } catch (err) {
      setError('An error occurred while deleting item');
    } finally {
      setLoading(false);
    }
  };

  const commonAPI = async (newItem: any, apiUrl: string,reset?:any) => {
    try {
      setLoading(true);
      const response: any = await service.makeAPICall({
        methodName: service.Methods.POST,
        apiUrl: apiUrl,
        body: newItem,
      });
      
      if (response) {
        return response;
        // reset()
        // dispatch(closeModal())
        // fetchData();
      } else {
        const errorMessages = Object.values(response.data.errors)
          .flat()
          .join(' ');
        toast.error(`Failed to add data: ${errorMessages}`);
        setError('Failed to add data');
      }
    } catch (err) {
      setError('An error occurred while adding data');

    } finally {
      setLoading(false);
    }
  };
  return { 
    data, 
    loading, 
    error, 
    listData, 
    getListData, 
    fetchData, 
    getItemById, 
    addData, 
    updateData, 
    deleteItem,
    commonAPI,
    getQueryFetch
  };
};

export default useFetchData;
