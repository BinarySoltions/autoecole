import { Deserializable } from './deserializable.entite';

export class Phase implements Deserializable{
    id: number;
    eleve_id: number;
    type: number;
    module: string;
    date_complete: string;
    ordre: number;
    duree:number;
   
    deserialize(obj: any): this {
        Object.assign(this, obj);
        return this;
    }
}
