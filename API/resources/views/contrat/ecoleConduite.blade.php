<table border="1" cellpadding="2" class="w-100">
    <tr>
        <td>
            <table border="0" class="w-100">
                <tr>
                    <td><strong>Nom de l’école de conduite / <em>Name of the driving school</em> : </strong></td>
                </tr>
                <tr>
                    <td class="h-row">{{$ecole->raison_social}}</td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td>
            <table border="0" class="w-100">
                <tr>
                    <td>No certificat | <em>Certificate no</em>. </td>
                </tr>
                <tr>
                    <td class="h-row"></td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td>
            <table border="0" class="w-100">
                <tr>
                    <td >Adresse / <em>Address</em> </td>
                </tr>
                <tr>
                    <td>{{$ecole->adresse->numero}}, &nbsp;{{$ecole->adresse->rue}}<span>, &nbsp;{{$ecole->adresse->appartement}}</span></td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td>
            <table border="0" class="w-100">
                <tr>
                    <td>Ville / <em>City</em> </td>
                </tr>
                <tr>
                    <td >&nbsp;{{$ecole->adresse->municipalite}}</td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td>
            <table border="0" class="w-100">
                <tr>
                    <td>Code postal /<em> Postal code</em> &nbsp;{{$ecole->adresse->code_postal}} </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<!-- <table border="0" class="w-100" style="font-size:9px">
    <tr>
        <td><strong>Nom de l’école de conduite / <em>Name of the driving school</em> : </strong></td>
    </tr>
    <tr>
        <td class="h-row">{{$ecole->raison_social}}</td>
    </tr>
    <tr>
        <td class="no-bottom">No certificat | <em>Certificate no</em>. </td>
    </tr>
    <tr>
        <td class="h-row border-bottom"></td>
    </tr>
    <tr>
        <td class="no-bottom">Adresse / <em>Address</em> </td>
    </tr>
    <tr>
        <td class="h-row border-bottom">{{$ecole->adresse->numero}}, &nbsp;{{$ecole->adresse->rue}}<span>, &nbsp;{{$ecole->adresse->appartement}}</span></td>
    </tr>
    <tr>
        <td class="no-bottom">Ville / <em>City</em> </td>
    </tr>
    <tr>
        <td class="border-bottom">&nbsp;{{$ecole->adresse->municipalite}}</td>
    </tr>
    <tr>
        <td class="border-bottom">Code postal /<em> Postal code</em> &nbsp;{{$ecole->adresse->code_postal}} </td>
    </tr>
</table> -->