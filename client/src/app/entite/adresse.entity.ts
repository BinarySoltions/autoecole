import { Deserializable } from './deserializable.entite';

export class Adresse implements Deserializable {
    id: number;
    eleve_id: number;
    numero: number;
    rue: string;
    appartement: string;
    municipalite: string;
    province: string;
    code_postal: string;

    deserialize(obj: any): this {
        Object.assign(this, obj);
        return this;
    }
}

export class AdresseEcole implements Deserializable {
    id: number;
    ecole_id: number;
    numero: number;
    rue: string;
    appartement: string;
    municipalite: string;
    province: string;
    code_postal: string;

    deserialize(obj: any): this {
        Object.assign(this, obj);
        return this;
    }
}