import { Deserializable } from './deserializable.entite';

export class EleveModule implements Deserializable{
    id:number;
    eleve_id:number;
    module_id:number;
    date_complete:Date;
    deserialize(obj: any): this {
        return Object.assign(this,obj);
    }
}
