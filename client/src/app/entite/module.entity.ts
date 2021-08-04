import { Deserializable } from './deserializable.entite';
import { Phase } from './phase.entity';
import { EleveModule } from './eleve-module.entity';

export class Module implements Deserializable{
    id:number;
    phase_id:number;
    nom:string;
    type:string;
    numero:number;
    eleve_module:EleveModule;
    date_complete:any;
    sans_objet:number;
    
    deserialize(obj: any): this {
        Object.assign(this,obj);
        return this;
    }
}
