import { Deserializable } from './deserializable.entite';

export class EvenementEleve implements Deserializable{
    id:number;
    eleve_id:number;
    numero:string;
    nom_module:string;
    module_id:number;
    place:number;
    date:any;
    heure_debut:any;
    heure_fin:any;
    complete:boolean;
    status:number;
    condition:boolean;
    
    deserialize(obj: any): this {
        Object.assign(this,obj);
        return this;
    }
}

export class Evenement implements Deserializable{
    id:number;
    places:number;
    date:any;
    heure_debut:any;
    heure_fin:any;
    place?:number;
    prenom?:string;
    nom?:string;
    numero_contrat?:string;
    nom_module?:string;
    
    deserialize(obj: any): this {
        Object.assign(this,obj);
        return this;
    }
}