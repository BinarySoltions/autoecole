<table border="1" cellpadding="3">
    <tr>
        <th class="contrat-title-header">
            4 - MODALITÉS DE PAIEMENT / <em>PAYMENT TERMS </em>
        </th>
    </tr>
    <tr>
        <td>
            <table border="0" class="w-100">
                <tr>
                    <td colspan="4">{!! $modalitePayementUn !!}</td>
                </tr>
                <tr>
                    <td colspan="4" style="height: 5px;"></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <table class="w-100">
                            <tr><td style="width: 50%;">Début du contrat - date du 1er cours / <em>Beginning of contract – Date of first course</em> :</td>
                                <td class="sb" style="width: 50%;"><span>{{date('Y-m-d',strtotime($eleve->date_contrat))}}</span></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>(JJ/MM/AAAA) / <em>(MM/DD/ YYYY)</em> </td>
                            </tr>
                        </table>
                        <table class="w-100">
                            <tr>
                                <td style="width: 25%;">Fin du contrat / <em>End of contract</em> :</td>
                                <td class="sb" style="width: 75%;"><span>{{date('Y-m-d',strtotime($eleve->date_fin_contrat))}}</span></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>(JJ/MM/AAAA) / <em>(MM/DD/ YYYY)</em> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colspan="4" style="height: 5px;"></td>
                </tr>
                <tr>
                    <td colspan="4">{!! $modalitePayementDeux !!}</td>
                </tr>
                <tr>
                    <td colspan="4" style="height: 5px;"></td>
                </tr>
                <tr>
                    <td colspan="2"  style="width:35%">
                        @include('contrat.versement',['noFR'=>'1er','noENG'=>'1st','versement'=>$versement[0],'dFR'=>'Début du contrat','dENG'=>'At the beginning'])
                        @include('contrat.versement',['noFR'=>'2eme','noENG'=>'2nd','versement'=>$versement[1],'dFR'=>'Au module 5','dENG'=>'At module 5'])
                        @include('contrat.versement',['noFR'=>'3eme','noENG'=>'3rd','versement'=>$versement[2],'dFR'=>'À la sortie 1','dENG'=>'At in car session 1'])
                        @include('contrat.versement',['noFR'=>'4eme','noENG'=>'4th','versement'=>$versement[3],'dFR'=>'À la sortie 5','dENG'=>'At in car session 5'])
                        @include('contrat.versement',['noFR'=>'5eme','noENG'=>'5th','versement'=>$versement[4],'dFR'=>'À la sortie 9','dENG'=>'At in car session 9'])
                        @include('contrat.versement',['noFR'=>'6eme','noENG'=>'6th','versement'=>$versement[5],'dFR'=>'À la sortie 11','dENG'=>'At in car session 11'])
                        <!-- <app-date-versement [noFR]="'1er'" [noENG]="'1st'" [versement]="versement"></app-date-versement>
                        <app-date-versement [noFR]="'2eme'" [noENG]="'2nd'" [versement]="versement"></app-date-versement>
                        <app-date-versement [noFR]="'3eme'" [noENG]="'3rd'" [versement]="versement"></app-date-versement>
                        <app-date-versement [noFR]="'4eme'" [noENG]="'4th'"></app-date-versement> -->
                    </td>
                    <td colspan="2" style="width:65%"><span>Les versements seront étalés comme suit:<br/>
      Premier versement totalisant 20% du coût total  du cours de conduite au début de la première phase.<br/> 
      Cinq autres versements égaux  étalés de la façon suivante :<br/>
      - un versement au début de chacune des phases 2, 3 et 4;<br/>
      - un versement après que l’élève ait complété 50% des apprentissages de la phase 3;<br/>
      - un versement après que l’élève ait complété 50% des apprentissages de la phase 4;<br/>
/
      <em>The total payment will be split  as follows:<br/>
      First payment totaling 20% of the total cost of the driving course at the start of the first phase.<br/>
      Five other equal installments split as follows:<br/>
      - a payment at the beginning of each of phases 2, 3 and 4;<br/>
      - a payment after the student has completed 50% of the learning in phase 3;<br/>
      - a payment after the student has completed 50% of the learning in phase 4;</em></span><br/>
  </td>
                </tr>
                <tr>
                    <td colspan="4">{!! $modalitePayementTrois !!}</td>
                </tr>
            </table>
        </td>
    </tr>
</table>