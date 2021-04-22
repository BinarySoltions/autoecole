import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalNoteComponent } from 'src/app/modal-note/modal-note.component';

@Component({
  selector: 'app-phase-deux-affichage',
  templateUrl: './phase-deux-affichage.component.html',
  styleUrls: ['./phase-deux-affichage.component.scss']
})
export class PhaseDeuxAffichageComponent implements OnInit {

  @Input() modules:any = [];
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  obtenirDate(value):any{
    if(!(!value)){
      return value.sans_objet?"S.O":null;
    }
    return null;
  }

  showNote(row){
    console.log(row);
    const dialogRef = this.dialog.open(ModalNoteComponent, {
      width: '250px',
      data: {note: row.eleve_module.note, sortie: row.nom}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  isNote(row){
    if(row){
      return !!row.eleve_module.note;
    }
    return false;
  }
  isSession(row){
    return row.includes('Sortie');
  }

  session(row){
    if(row.includes('Sortie')){
      return row.replace('Sortie','').trim();
    }
    return row;
  }
}
