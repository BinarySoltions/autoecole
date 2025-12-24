import { Module } from './module.entity';
import { Deserializable } from './deserializable.entite';
import { Phase } from './phase.entity';

export class EleveModule implements Deserializable{
    id:number;
    eleve_id:number;
    module_id:number;
    date_complete:Date|null;
    sans_objet:number;
    note:string;
    module:Module;
    phase:Phase
    deserialize(obj: any): this {
         Object.assign(this,obj);
         this.module = new Module().deserialize(obj.module);
         this.phase = new Phase().deserialize(obj.phase);
         return this;
    }
}
