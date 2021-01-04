<table border="1" cellpadding="2">
    <tr>
        <th class="bg-color-green font-label" align="left">
            Attestation de la personne responsable autorisée
        </th>
    </tr>
    <tr>
        <td>
            <table border="0" cellpadding="2">
                <tr class="">
                    <td class="font-label height-champ sb" style="width: 55%;">
                        J'atteste que le cours de conduite est :
                    </td>
                    <td class="font-label sb" style="width: 15%;">
                        @if(isset($attestation->resultat_final) && $attestation->resultat_final == 1)
                        <img src="{{url('/images/checked.png')}}" width="7">
                        @else
                        <img src="{{url('/images/unchecked.png')}}" width="7">
                        @endif Réussie</td>
                    <td class=" font-label sb" style="width: 15%;">
                        @if(isset($attestation->resultat_final) && $attestation->resultat_final == 2)
                        <img src="{{url('/images/checked.png')}}" width="7">
                        @else
                        <img src="{{url('/images/unchecked.png')}}" width="7">
                        @endif Échouée</td>
                    <td class=" font-label sb" style="width: 15%;">
                        @if(isset($attestation->resultat_final) && $attestation->resultat_final == 3)
                        <img src="{{url('/images/checked.png')}}" width="7">
                        @else
                        <img src="{{url('/images/unchecked.png')}}" width="7">
                        @endif Incomplète</td>
                </tr>
                <tr>
                    <td class="font-label height-champ sb">
                        Nom de la personne responsable :
                    </td>
                    <td colspan="3" class="font-label height-champ sb">
                        @if(isset($personne) && isset($personne->nom))
                        {{$personne->nom}}
                        @endif
                    </td>
                </tr>
                <tr class="font-label">
                    <td colspan="4">
                        <table border="0" cellpadding="3">
                            <tr class="">
                                <td colspan="2" class="font-label">Signature :
                                </td>
                                <td class="font-label">Date : </td>
                                <td class=""></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<table border="0">
    <tr>
        <td style="height: 2px;"></td>
    </tr>
</table>