<table border="1">
    <tr>
        <th colspan="3" class="contrat-title-header">
            3 - COÛT DE LA FORMATION (sur la base d’un taux horaire unique pour la formation théorique et pratique) / <em>TRAINING FEES (based on a fixed hourly rate for both theoretical and practical instruction)</em>
        </th>
    </tr>
    <tr>
        <td class="" colspan="4" style="font-size: 7px;">
            <table border="0" cellpadding="3" class="w-100 margin-bottom">
                <tr class="no-border-top">
                    <td colspan="3" style="padding-top:5px;">Type de formation / <em>Type of training</em> (Sélectionnez un cours / <em>Select a course</em>) </td>
                </tr>
                <tr>
                    <td class="" style="width: 30%;"><strong><img src="/images/checked.png" width="5"> Automobile / <em>Automobile</em> </strong></td>
                    <td class="" style="width: 45%;"><strong><img src="/images/unchecked.png" width="5"> Cyclomoteur / <em>Moped and Motorized Scooter</em> </strong></td>
                    <td class="" style="width: 25%;"></td>
                </tr>
                <tr>
                    <td align="left" style="width: 30%;"><strong><img src="/images/unchecked.png" width="5"> Motocyclette / <em>Motorcycle</em> </strong></td>
                    <td align="left" style="width: 45%;"><strong><img src="/images/unchecked.png" width="5"> Motocyclette à trois roues / <em>Three-Wheeled Motorcycle</em></strong></td>
                    <td style="width: 25%;"></td>
                </tr>
                <tr >
                    <td colspan="2" >Total d’heures de cours théoriques / <em>Total number of hours of theoretical modules</em> :
                    </td>
                    <td >
                        <!-- <input class="input-w-80 border-normal" type="number" [(ngModel)]="heureTheorique" /> heures / <em>hours</em> -->
                        @include('contrat.input',['class'=>'s w-input','value'=>'24','value_two'=>'<span>heures / <em>hours</em></span>'])
                    </td>
                </tr>
                <tr >
                    <td colspan="2" >Total d’heures de sorties sur la route ou cours pratiques / <em>Total number of hours of on-the-road sessions or practical courses</em> :
                    </td>
                    <td >
                        @include('contrat.input',['class'=>'s w-input','value'=>'15','value_two'=>'<span>heures / <em>hours</em></span>'])
                    </td>
                </tr>
                <tr >
                    <td colspan="2">Total d’heures / <em>Total numbers of hours</em> :
                    </td>
                    <td >
                        <!-- <input class="input-w-80 border-bottom bg-color-transparent" type="number" [disabled]="true" [value]="obtenirHeuresTotales()" /> -->
                        @include('contrat.input',['class'=>'sb w-input','value'=>'39','value_two'=>''])
                    </td>
                </tr>
                <tr >
                    <td colspan="2" >Taux horaire / <em>Hourly rate</em> :
                    </td>
                    <td >
                        <!-- <input class="input-w-80 border-bottom bg-color-transparent" type="number" [disabled]="true" [value]="obtenirTauxHoraire()" />$ -->
                        @include('contrat.input',['class'=>'sb w-input','value'=>'17.41','value_two'=>'$'])
                    </td>
                </tr>
                <tr >
                    <td colspan="2" class="contrat-title-cell">Prix total avant taxes / <em>Total training cost before taxes</em> :
                    </td>
                    <td >
                        <!-- <input class="input-w-80 border-bold bg-color-transparent" type="number" [disabled]="true" [value]="obtenirMontantHorsTaxes()" />$ -->
                        @include('contrat.input',['class'=>'s w-input','value'=>number_format($eleve->frais_inscription/1.14975,2),'value_two'=>'$'])
                    </td>
                </tr>
                <tr>
                    <td colspan="2">T.P.S. / <em>G.S.T.</em> : (No. T.P.S. / <em>G.S.T. no. </em> 7052 7727 RT0001 ):
                    </td>
                    <td>
                        <!-- <input class="input-w-80 border-bottom bg-color-transparent" type="number" [disabled]="true" [value]="obtenirTPS()" />$ -->
                        @include('contrat.input',['class'=>'sb w-input','value'=>number_format(($eleve->frais_inscription/1.14975)*0.05,2),'value_two'=>'$'])
                    </td>
                </tr>
                <tr>
                    <td colspan="2">T.V.Q. / <em>Q.S.T.</em> : (No. T.V.Q. / <em>Q.S.T. no. </em> 1224768920 TQ0001 ):
                    </td>
                    <td >
                        <!-- <input class="input-w-80 border-bottom bg-color-transparent" type="number" [disabled]="true" [value]="obtenirTVQ()" />$ -->
                        @include('contrat.input',['class'=>'sb w-input','value'=>number_format(($eleve->frais_inscription/1.14975)*0.09975,2),'value_two'=>'$'])
                    </td>
                </tr>
                <tr >
                    <td colspan="2" class="contrat-title-cell">Prix total après taxes / <em>Total training cost after taxes</em> :
                    </td>
                    <td >
                        <!-- <input class="input-w-80 border-bold bg-color-transparent" type="number" [disabled]="true" [value]="coutFormation" />$ -->
                        @include('contrat.input',['class'=>'s w-input','value'=>number_format($eleve->frais_inscription,2),'value_two'=>'$'])
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        {!! $loiCoutFormation !!}
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>