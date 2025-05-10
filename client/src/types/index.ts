import type { FileWithPath } from 'react-dropzone';

export interface Superhero {
    _id: string;
    nickname: string;
    real_name: string;
    origin_description: string;
    superpowers: string[];
    catch_phrase: string;
    Images: string[];
}

export type SuperheroInList = Pick<Superhero, '_id' | 'nickname' | 'Images'>;

export type SuperheroForm = Omit<Superhero, '_id' | 'Images' | 'superpowers'> & {
    superpowers: string;
};

export type SuperheroFormData = Omit<Superhero, '_id' | 'Images'> & {
    Images: readonly FileWithPath[];
};

export interface SuperheroesResponse {
    data: SuperheroInList[];
    page: number;
    totalPages: number;
    totalItems: number;
}
