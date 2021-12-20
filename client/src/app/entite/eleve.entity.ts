import { Deserializable } from './deserializable.entite';
import { Adresse } from './adresse.entity';
import { Coordonnee } from './coordonnee.entity';
import { Phase } from './phase.entity';
import { Module } from './module.entity';
import { Payement } from '../payement/payement.model';
import { Attestation } from './attestation.entity';

export class Eleve implements Deserializable{
    id:number;
    prenom:string;
    nom:string;
    numero_contrat:string;
    email:string;
    date_naissance:any;
    date_inscription:any;
    date_contrat:any;
    date_fin_permis:any;
    date_fin_contrat:any;
    date_rappel_payement:any;
    numero_permis:string;
    frais_inscription:number;
    adresse:Adresse;
    coordonnee:Coordonnee;
    modules:Module[];
    payements:Payement[];
    attestation:any;
    examens:any;
    payed:boolean;
    status:number;

    deserialize(obj: any): this {
        Object.assign(this, obj);
        this.adresse = new Adresse().deserialize(obj.adresse);
        this.coordonnee = new Coordonnee().deserialize(obj.coordonnee);
        //this.attestation = new Attestation().deserialize(obj.attestation);
        obj.modules.foreach(module =>{
            this.modules.push(new Module().deserialize(module));
        });
        obj.payements.foreach(payement =>{
            this.payements.push(new Payement().deserialize(payement));
        });
        return this;
    }
}
