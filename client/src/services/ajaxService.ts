import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3037/api/',
  withCredentials: true,
});

// BASIC GET
const fetchData = async (endpoint: string, onSuccess: Function, onError: Function) => {
  console.log(endpoint)
  try {
    const response = await apiClient.get(endpoint);
    onSuccess(response.data);
  } catch (error) {
    onError(error);
  }
};
// BASIC POST
const postData = async (endpoint: string, data: any, onSuccess: Function, onError: Function) => {
  try {
    const response = await apiClient.post(endpoint, data, { withCredentials: true });
    onSuccess(response.data);
  } catch (error) {
    onError(error);
  }
};

export { fetchData, postData };