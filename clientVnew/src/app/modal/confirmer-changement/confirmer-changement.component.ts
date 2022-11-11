import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ShowModalService } from 'src/app/service/show-modal.service';
declare var $:any;

@Component({
  selector: 'app-confirmer-changement',
  templateUrl: './confirmer-changement.component.html',
  styleUrls: ['./confirmer-changement.component.scss']
})
export class ConfirmerChangementComponent implements OnInit {
  public onClose :Subject<boolean>;
  constructor(private showModalService: ShowModalService) { }

  ngOnInit() {
    this.onClose = new Subject();
    this.showModalService.add(this);
  }

  public open(){
    $('#confirmerChangementModal').modal('show');
  }
  public close(){
    $('#confirmerChangementModal').modal('hide');
  }
  ok(){
    this.onClose.next(true);
  }

  fermer(){
    this.onClose.next(false);
  }
}
