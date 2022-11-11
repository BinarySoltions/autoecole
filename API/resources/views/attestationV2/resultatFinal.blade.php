<table border="1" cellpadding="0">
    <tr>
        <th class="bg-color-black-bolder font-label" align="left">
            Attestation de la personne responsable autorisée
        </th>
    </tr>
    <tr>
        <td>
            <table border="0" cellpadding="2">
                <tr class="">
                    <td class="font-label height-champ" style="width: 50%;">J'atteste que le cours de conduite est :
                    </td>
                    <td class="font-label" style="width: 14%;">@if(isset($attestation->resultat_final) && $attestation->resultat_final == 1)
                        <img src="{{url('/images/checked.png')}}" width="8">
                        @else
                        <img src="{{url('/images/unchecked.png')}}" width="6">
                        @endif Réussi
                    </td>
                    <td class=" font-label" style="width: 19%;">
                        @if(isset($attestation->resultat_final) && $attestation->resultat_final == 2)
                        <img src="{{url('/images/checked.png')}}" width="6">
                        @else
                        <img src="{{url('/images/unchecked.png')}}" width="8">
                        @endif Non réussi
                    </td>
                    <td class=" font-label" style="width: 20%;">
                        @if(isset($attestation->resultat_final) && $attestation->resultat_final == 3)
                        <img src="{{url('/images/unchecked.png')}}" width="6">
                        @else
                        <img src="{{url('/images/unchecked.png')}}" width="8">
                        @endif Non terminé
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td>
            <table border="0" cellpadding="0">
                <tr>
                    <td class="font-label height-champ">Nom de la personne responsable 
                    </td>
                </tr>
                <tr>
                    <td class="font-label-l height-champ ">
                        @if(isset($personne) && isset($personne->nom))
                        {{$personne->nom}}
                        @endif
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td>
            <table border="0" cellpadding="2">
            <tr class="">
                    <td colspan="5" rowspan="2" class="font-label sr">
                    </td>
                    <td colspan="2" class="font-label centrer">Date (Année-Mois-Jour)</td>
                </tr>
                <tr class="">
                    <td colspan="2" class="font-label"></td>
                </tr>
                <tr class="">
                    <td colspan="5" class="font-label sr">Signature :
                    </td>
                    <td colspan="2" class="font-label"></td>
                </tr>
            </table>
        </td>
    </tr>
</table>