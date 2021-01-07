<table border="1" cellpadding="0">
    <tr>
        <th class="bg-color-green font-label" align="left">
            Attestation de la personne responsable autorisée
        </th>
    </tr>
    <tr>
        <td>
            <table border="0" cellpadding="3">
                <tr class="">
                    <td class="font-label height-champ" style="width: 55%;"> J'atteste que la phase 1 du cours de conduite est :
                    </td>
                    <td class="font-label" style="width: 14%;">@if(isset($attestation->resultat_phase_une) && $attestation->resultat_phase_une == 1)
                        <img src="{{url('/images/checked.png')}}" width="8">
                        @else
                        <img src="{{url('/images/unchecked.png')}}" width="6">
                        @endif Réussie
                    </td>
                    <td class=" font-label" style="width: 14%;">
                        @if(isset($attestation->resultat_phase_une) && $attestation->resultat_phase_une == 2)
                        <img src="{{url('/images/checked.png')}}" width="6">
                        @else
                        <img src="{{url('/images/unchecked.png')}}" width="8">
                        @endif Échouée
                    </td>
                    <td class=" font-label" style="width: 20%;">
                        @if(isset($attestation->resultat_phase_une) && $attestation->resultat_phase_une == 3)
                        <img src="{{url('/images/unchecked.png')}}" width="6">
                        @else
                        <img src="{{url('/images/unchecked.png')}}" width="8">
                        @endif Incomplète
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td>
            <table border="0" cellpadding="3">
                <tr>
                    <td class="font-label height-champ"> Nom de la personne responsable :
                    </td>
                    <td class="font-label height-champ ">
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
            <table border="0" cellpadding="5">
                <tr class="">
                    <td colspan="2" rowspan="2" class="font-label">Signature :
                    </td>
                    <td rowspan="2" class="font-label">Date : </td>
                    <td class=""></td>
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