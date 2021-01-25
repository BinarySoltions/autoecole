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
    
    deserialize(obj: any): this {
        Object.assign(this,obj);
        return this;
    }
}