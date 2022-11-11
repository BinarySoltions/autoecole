import { Deserializable } from './deserializable.entite';
import { AdresseEcole } from './adresse.entity';

export class Ecole implements Deserializable{
    id:number;
    numero:string;
    raison_social:string;
    nom:string;
    email:string;
    adresse:AdresseEcole;
    
    deserialize(obj: any): this {
        Object.assign(this,obj);
        this.adresse = new AdresseEcole().deserialize(obj.adresse);
        return this;
    }
}
