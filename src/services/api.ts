import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades",
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
