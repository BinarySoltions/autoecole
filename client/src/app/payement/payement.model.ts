import { Deserializable } from '../entite/deserializable.entite';
import { Eleve } from '../entite/eleve.entity';

export class Payement implements Deserializable {
    id: number;
    eleve_id: number;
    montant: number;
    type: string;
    date_payement:any;
    detail:any;
    deserialize(obj: any): this {
        Object.assign(this, obj);
        return this;
    }
}
