import { Deserializable } from './deserializable.entite';

export class Coordonnee implements Deserializable {
    id: number;
    eleve_id: number;
    telephone: string;
    telephone_autre: string;
   
    deserialize(obj: any): this {
        Object.assign(this, obj);
        return this;
    }
}
