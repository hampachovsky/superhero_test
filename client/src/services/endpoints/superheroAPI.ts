import type { Superhero, SuperheroesResponse } from '@/types';
import { instance } from './instance';

export const superheroAPI = {
  async getAll(page: number = 1): Promise<SuperheroesResponse> {
    const response = await instance.get(`/superheroes?page=${page}`);
    return response.data;
  },
  async getById(id: string): Promise<Superhero> {
    const response = await instance.get(`/superheroes/${id}`);
    return response.data;
  },
  async create(superhero: FormData): Promise<Superhero> {
    const response = await instance.post('/superheroes', superhero, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  async update(superhero: FormData, id: string): Promise<unknown> {
    const response = await instance.put(`/superheroes/${id}`, superhero, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  async delete(id: string): Promise<Superhero> {
    const response = await instance.delete(`/superheroes/${id}`);
    return response.data;
  },
};
