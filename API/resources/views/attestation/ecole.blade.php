<table border="1" cellpadding="1">
    <tr>
        <th  class="bg-color-green" align="left">
            Identification de l'école
        </th>

    </tr>
    <tr>
        <td>
            <table border="0"  cellpadding="0">
                <tr class="">
                    <td colspan="3" class="font-label">
                        Raison sociale - Nom de l'école
                    </td>
                </tr>
                <tr class="">
                    <td colspan="3" class="">
                        <span class="text-left font-label"> {{$ecole->raison_social}}</span>
                    </td>

                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td>
            <table border="0"  cellpadding="0">
                <tr class="">
                    <td colspan="3" class="font-label">
                        Adresse (Numéro, rue, app)
                    </td>
                </tr>
                <tr>
                    <td colspan="3" class="font-label">
                        @if(isset($ecole->adresse->numero))
                        {{$ecole->adresse->numero}}
                        @endif
                        @if(isset($ecole->adresse->rue))
                        ,&nbsp;{{$ecole->adresse->rue}}
                        @endif
                        @if(isset($ecole->adresse->appartement))
                        ,&nbsp;{{$ecole->adresse->appartement}}
                        @endif
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td>
            <table border="0"  cellpadding="0">
                <tr class="">
                    <td class=" font-label">
                        Municipalité
                    </td>
                    <td class=" font-label">
                    Province</td>
                    <td class=" font-label ">
                    Code postal</td>
                </tr>
                <tr>
                    <td class="font-label">
                    @if(isset($ecole->adresse->municipalite))
                        {{$ecole->adresse->municipalite}}
                        @endif
                    </td>
                    <td class="font-label">
                    @if(isset($ecole->adresse->province))
                        {{$ecole->adresse->province}}
                        @endif
                    </td>
                    <td class="font-label">
                    @if(isset($ecole->adresse->code_postal))
                        {{$ecole->adresse->code_postal}}
                        @endif
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td>
            <table border="0"  cellpadding="0">
                <tr class="">
                    <td colspan="3" class="font-label">
                        Adresse de courriel
                    </td>
                </tr>
                <tr>
                    <td colspan="3" class=" font-label">
                        {{$ecole->email}}
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>