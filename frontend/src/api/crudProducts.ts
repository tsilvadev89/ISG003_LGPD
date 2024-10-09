
import axios from 'axios';
import { Product } from '../types/types';
import config from "../config/config";

/* const apiUrl = `${config.backendIP}/product`; */

const apiUrl = 'http://localhost:3000/product';


export const createProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await axios.post(apiUrl, product, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar o produto:', error);
    throw error;
  }
};

export const updateProduct = async (id: number, product: Product): Promise<Product> => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, product, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar o produto:', error);
    throw error;
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar o produto:', error);
    throw error;
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter o produto:', error);
    throw error;
  }
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(apiUrl);
/*     console.log(response); */
    return response.data;
  } catch (error) {
    console.error('Erro ao obter os produtos:', error);
    throw error;
  }
};
