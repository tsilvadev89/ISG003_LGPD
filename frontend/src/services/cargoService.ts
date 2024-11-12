import axios from 'axios';
import { Cargo } from '../models/Cargo';

// Definindo a URL base a partir do .env para Vite
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/cargos` || 'http://localhost:3000/api/cargos';

export const cargoService = {
  async getAllCargos(): Promise<Cargo[]> {
    const response = await axios.get(BASE_URL);

    // Se o backend retornar um único objeto em vez de um array, envolvê-lo em um array
    const cargos = Array.isArray(response.data) ? response.data : [response.data];

    return cargos;
  },

  async getCargoById(id: number): Promise<Cargo> {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  async createCargo(cargo: Cargo): Promise<void> {
    await axios.post(BASE_URL, cargo);
  },

  async updateCargo(id: number, cargo: Partial<Cargo>): Promise<void> {
    await axios.put(`${BASE_URL}/${id}`, cargo);
  },

  async deleteCargo(id: number): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
