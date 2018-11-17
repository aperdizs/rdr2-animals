export class AnimalFiltersInput {
    type?: string;
}

export class CreateAnimalInput {
    name: string;
    img: string;
    type: string;
    size?: string;
    description?: string;
}

export class PaginationInput {
    pageSize?: number;
    pageNumber?: number;
}

export class UpdateAnimalInput {
    name?: string;
    img?: string;
    type?: string;
    size?: string;
    description?: string;
}

export class Animal {
    id: string;
    name: string;
    img: string;
    type: string;
    size?: string;
    description?: string;
}

export class AnimalReponse {
    data?: Animal[];
    meta?: Meta;
}

export class Meta {
    totalPages: number;
    totalItems: number;
    size: number;
    page: number;
}

export abstract class IMutation {
    abstract createAnimal(body: CreateAnimalInput): Animal | Promise<Animal>;

    abstract updateAnimal(id: string, body: UpdateAnimalInput): Animal | Promise<Animal>;

    abstract deleteAnimal(id: string): Animal | Promise<Animal>;
}

export abstract class IQuery {
    abstract findAllAnimals(filters?: AnimalFiltersInput, pagination?: PaginationInput): AnimalReponse | Promise<AnimalReponse>;

    abstract findOneAnimal(id: string): Animal | Promise<Animal>;

    abstract temp__(): boolean | Promise<boolean>;
}
