import { Deserializable } from './deserializable.entite';
import { Eleve } from './eleve.entity';
import { Ecole } from './ecole.entity';
import { PersonneResponsable } from './personne-responsable.entity';

export class Attestation implements Deserializable{
    id:number;
    numero:string;
    signature_responsable:Date;
    signature_eleve:Date;
    eleve:Eleve;
    ecole:Ecole;
    personne_responsable:PersonneResponsable;

    deserialize(obj: any): this {
        Object.assign(this,obj);
        this.eleve = new Eleve().deserialize(obj.eleve);
        this.ecole = new Ecole().deserialize(obj.ecole);
        this.personne_responsable = new PersonneResponsable().deserialize(obj.personne_responsable);
        return this;
    }
}
