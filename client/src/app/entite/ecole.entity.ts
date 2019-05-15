import { Deserializable } from './deserializable.entite';

export class Ecole implements Deserializable{
    id:number;
    numero:string;
    raison_social:string;
    nom:string;
    email:string;
    
    deserialize(obj: any): this {
        Object.assign(this,obj);
        return this;
    }
}
