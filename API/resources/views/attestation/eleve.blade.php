<table border="1" cellpadding="2">
    <tr>
        <th  class="bg-color-green" align="left">
            Identification de l'élève
        </th>

    </tr>
    <tr>
        <td>
            <table border="0" cellpadding="1">
                <tr class="">
                    <td colspan="3" class="font-label">
                        Nom, prénom
                    </td>
                </tr>
                <tr class="">
                    <td colspan="3" class="sb">
                        <span class="text-left font-label"> {{$eleve->nom}},&nbsp;{{$eleve->prenom}}</span>
                    </td>

                </tr>
                <tr class="">
                    <td colspan="3" class="font-label">
                        Adresse (Numéro, rue, app)
                    </td>
                </tr>
                <tr>
                    <td colspan="3" class="sb font-label">
                        @if(isset($eleve->adresse->numero))
                        {{$eleve->adresse->numero}}
                        @endif
                        @if(isset($eleve->adresse->rue))
                        ,&nbsp;{{$eleve->adresse->rue}}
                        @endif
                        @if(isset($eleve->adresse->appartement))
                        ,&nbsp;{{$eleve->adresse->appartement}}
                        @endif
                    </td>
                </tr>
                <tr class="">
                    <td class=" font-label">
                        Municipalité
                    </td>
                    <td class=" font-label">Province</td>
                    <td class=" font-label ">Code postal</td>
                </tr>
                <tr>
                    <td class=" sb font-label">
                    @if(isset($eleve->adresse->municipalite))
                        {{$eleve->adresse->municipalite}}
                        @endif
                    </td>
                    <td class="sb font-label">
                    @if(isset($eleve->adresse->province))
                        {{$eleve->adresse->province}}
                        @endif
                    </td>
                    <td class="sb font-label">
                    @if(isset($eleve->adresse->code_postal))
                        {{$eleve->adresse->code_postal}}
                        @endif
                    </td>
                </tr>
                <tr class="">
                    <td class="font-label sr">
                        Numéro de contrat
                    </td>
                    <td class=" font-label sr ">Téléphone</td>
                    <td class="font-label">Téléphone autre</td>

                </tr>
                <tr>
                    <td class="sr font-label">
                        {{$eleve->numero_contrat}}
                    </td>
                    <td class="sr font-label">
                        {{$eleve->coordonnee->telephone}}
                    </td>
                    <td class="font-label">
                        {{$eleve->coordonnee->telephone_autre}}
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>