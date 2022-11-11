import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PayementService } from '../payement.service';

@Component({
  selector: 'app-balance-paie',
  templateUrl: './balance-paie.component.html',
  styleUrls: ['./balance-paie.component.scss']
})
export class BalancePaieComponent implements OnInit,OnChanges {
  @Input('totalPaye') totalPaye;
  @Input('total') total;

  balance: number;

  constructor(
    private translate:TranslateService,) {
     this.translate.setDefaultLang('fr');
    }
  ngOnChanges(changes: SimpleChanges): void {
    this.balance = this.total - this.totalPaye;
  }

  ngOnInit() {
  }


}
