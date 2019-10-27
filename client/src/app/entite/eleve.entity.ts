import { Deserializable } from './deserializable.entite';
import { Adresse } from './adresse.entity';
import { Coordonnee } from './coordonnee.entity';
import { Phase } from './phase.entity';
import { Module } from './module.entity';

export class Eleve implements Deserializable{
    id:number;
    prenom:string;
    nom:string;
    numero_contrat:string;
    email:string;
    date_naissance:any;
    date_inscription:any;
    numero_permis:string;
    adresse:Adresse;
    coordonnee:Coordonnee;
    modules:Module[];

    deserialize(obj: any): this {
        Object.assign(this, obj);
        this.adresse = new Adresse().deserialize(obj.adresse);
        this.coordonnee = new Coordonnee().deserialize(obj.coordonnee);
        obj.modules.foreach(module =>{
            this.modules.push(new Module().deserialize(module));
        });
        return this;
    }
}
