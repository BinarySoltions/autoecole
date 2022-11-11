import { Deserializable } from './deserializable.entite';

export class PersonneResponsable implements Deserializable{
    id:number;
    nom:string;
    
    deserialize(obj: any): this {
        Object.assign(this,obj);
        return this;
    }
}
