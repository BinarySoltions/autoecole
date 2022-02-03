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
                    <td colspan="4">
                        @include('contrat.versement',['noFR'=>'1er','noENG'=>'1st','versement'=>$versement,'dFR'=>'Début du contrat','dENG'=>'At the beginning'])
                        @include('contrat.versement',['noFR'=>'2eme','noENG'=>'2nd','versement'=>$versement,'dFR'=>'Au module 5','dENG'=>'At module 5'])
                        @include('contrat.versement',['noFR'=>'3eme','noENG'=>'3rd','versement'=>$versement,'dFR'=>'À la sortie 1','dENG'=>'At in car session 1'])
                        @include('contrat.versement',['noFR'=>'4eme','noENG'=>'4th','versement'=>$versement,'dFR'=>'À la sortie 5','dENG'=>'At in car session 5'])
                        @include('contrat.versement',['noFR'=>'5eme','noENG'=>'5th','versement'=>$versement,'dFR'=>'À la sortie 9','dENG'=>'At in car session 9'])
                        @include('contrat.versement',['noFR'=>'6eme','noENG'=>'6th','versement'=>$versement,'dFR'=>'À la sortie 11','dENG'=>'At in car session 11'])
                        <!-- <app-date-versement [noFR]="'1er'" [noENG]="'1st'" [versement]="versement"></app-date-versement>
                        <app-date-versement [noFR]="'2eme'" [noENG]="'2nd'" [versement]="versement"></app-date-versement>
                        <app-date-versement [noFR]="'3eme'" [noENG]="'3rd'" [versement]="versement"></app-date-versement>
                        <app-date-versement [noFR]="'4eme'" [noENG]="'4th'"></app-date-versement> -->
                    </td>
                </tr>
                <tr>
                    <td colspan="4">{!! $modalitePayementTrois !!}</td>
                </tr>
                <tr>
                    <!-- titre -->
                    <td colspan="4" style="height: 1px;">

                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>