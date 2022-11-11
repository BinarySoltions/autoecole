
<table border="1" cellpadding="1">
    <tr>
        <th colspan="2" class="bg-color-black-bolder" align="left">
            Renseignements sur l'élève
        </th>
    </tr>
    <tr>
    <td  class="bg-color-green font-label s20-s" >
    &nbsp;&nbsp;&nbsp;
        </td>
        <td class="s80-s"> 
            <table border="0"  cellpadding="0" class="hfull-s">
                <tr class="">
                    <td class="font-label sr" align="left">
                        Nom
                    </td>
                    <td colspan="2" class="font-label">
                        Prénom
                    </td>
                </tr>
                <tr class="">
                <td  class="sr font-label-l">
                    {{$eleve->nom}}
                    </td>
                    <td colspan="2" class=" font-label-l">
                         {{$eleve->prenom}}
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
                        @if(isset($eleve->adresse->numero))
                        {{$eleve->adresse->numero}}
                        @endif
                    </td>
                    <td  colspan="2"  class="font-label-l s80-s">
                        @if(isset($eleve->adresse->rue))
                        &nbsp;{{$eleve->adresse->rue}}
                        @endif
                        @if(isset($eleve->adresse->appartement))
                        ,&nbsp;{{$eleve->adresse->appartement}}
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
                    @if(isset($eleve->adresse->municipalite))
                        {{$eleve->adresse->municipalite}}
                        @endif
                    </td>
                    <td class="font-label-l sr">
                    @if(isset($eleve->adresse->province)){{$eleve->adresse->province}}
                        @endif
                    </td>
                    <td class="font-label-l " >
                    @if(isset($eleve->adresse->code_postal)){{$eleve->adresse->code_postal}}
                    @endif
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>