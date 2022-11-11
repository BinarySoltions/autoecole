<table border="1" cellpadding="1">
    <tr>
        <th colspan="2" class="bg-color-black-bolder" align="left">
            Renseignements sur l'école
        </th>
    </tr>
    <tr>
        <td colspan="2"> 
            <table border="0"  cellpadding="0" class="hfull-s">
                <tr class="">
                    <td class="font-label font-weight-bolder sr" align="left">
                        Numéro de reconnaissance
                    </td>
                    <td colspan="2" class="font-label">
                        Nom de l'école
                    </td>
                </tr>
                <tr class="">
                <td  class="sr font-label-l font-weight-bolder">
                    {{$ecole->numero}}
                    </td>
                    <td colspan="2" class=" font-label-l">
                         {{$ecole->raison_social}}
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td  class="bg-color-green font-label s10-s" >
        <tcpdf method="MultiCell" params="{{$paramsT}}" />   
        </td>
        <td class="s90-s">
            <table border="0"  cellpadding="0" class="full-s" >
                <tr class="">
                    <td  class="font-label sr s20-s" >
                        Numéro
                    </td>
                    <td colspan="2" class="font-label s80-s">
                        Rue
                    </td>
                </tr>
                <tr>
                    <td  class="font-label-l sr s20-s">
                        @if(isset($ecole->adresse->numero))
                        {{$ecole->adresse->numero}}
                        @endif
                    </td>
                    <td  colspan="2"  class="font-label-l s80-s">
                        @if(isset($ecole->adresse->rue))
                        &nbsp;{{$ecole->adresse->rue}}
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
        <td colspan="2">
            <table border="0"  cellpadding="0" class="hfull-s">
                <tr class="">
                    <td class=" font-label sr"  colspan="2">
                        Ville, village ou Municipalité
                    </td>
                    <td class=" font-label sr">
                    Province
                    </td>
                    <td class=" font-label" >
                    Code postal</td>
                </tr>
                <tr>
                    <td  colspan="2" class="font-label-l sr">
                    @if(isset($ecole->adresse->municipalite))
                        {{$ecole->adresse->municipalite}}
                        @endif
                    </td>
                    <td class="font-label-l sr">
                    @if(isset($ecole->adresse->province))
                        {{$ecole->adresse->province}}
                        @endif
                    </td>
                    <td class="font-label-l " >
                    @if(isset($ecole->adresse->code_postal))
                        {{$ecole->adresse->code_postal}}
                        @endif
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>