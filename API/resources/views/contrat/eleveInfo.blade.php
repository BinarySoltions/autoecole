<table border="0" cellpadding="2" class="w-100 margin-bottom">
    <tr>
        <th colspan="4" class="contrat-title-header border-bottom">
            1 - RENSEIGNEMENTS PERSONNELS / PERSONAL INFORMATION
        </th>
    </tr>
</table>
<table border="1" class="w-100" style="margin-bottom: 10px;">
    <tr>
        <td>
            <table border="0" cellpadding="2" class="w-100 margin-bottom">
                <tr>
                    <td colspan="2" class="">Nom / <em>Last Name</em>: {{$eleve->nom}} </td>
                    <td colspan="2" class="">Prénom / <em>Name</em> : {{$eleve->prenom}}</td>
                </tr>
                <tr>
                    <td colspan="4" class="no-bottom" style="font-size: 2px;"> </td>
                </tr>
                <tr>
                    <td class="sbr" style="width: 45%;">Adresse /<em>Address</em> : {{$eleve->adresse->numero}}, {{$eleve->adresse->rue}} </td>
                    <td class="sbr" style="width: 15%;">{{$eleve->adresse->appartement}}</td>
                    <td class="sbr" style="width: 20%;">{{$eleve->adresse->municipalite}}</td>
                    <td class="sb" style="width: 20%;">{{$eleve->adresse->code_postal}}</td>
                </tr>
                <tr>
                    <td align="center" class="no-bottom no-border-right Separator">Rue /<em>Street</em> </td>
                    <td class="no-bottom no-border-right no-border-left">No App. /<em>Apt No.</em></td>
                    <td class="no-bottom no-border-right no-border-left">Ville /<em>City</em></td>
                    <td align="center" class="no-bottom no-border-left">Code postal /<em>Postal code</em></td>
                </tr>
                <tr>
                    <td class="sbr">Tél. domicile / <em>Phone number (home) </em>: {{$eleve->coordonnee->telephone}}</td>
                    <td class="sb" colspan="3">Tél. professionnel / <em>Phone number (work)</em> : {{$eleve->coordonnee->telephone_autre}}</td>
                </tr>
                <tr>
                    <td colspan="4" class="no-bottom" style="font-size: 2px;"> </td>
                </tr>
                <tr>
                    <td class="sbr">Date de naissance / <em>Date of birth </em>: {{$eleve->date_naissance}}</td>
                    <td class="sb" colspan="3"> No Permis d’apprenti / <em>Learner’s licence no.</em> : {{$eleve->numero_permis}} </td>
                </tr>
                <tr>
                    <td align="center" class="no-bottom no-border-right">(JJ/MM/AAAA) / <em>(MM/DD/ YYYY)</em> </td>
                    <td colspan="3" class="no-bottom no-border-left"></td>
                </tr>
                <tr>
                    <td colspan="4"> Adresse électronique / <em>Email address </em> : {{$eleve->email}}</td>
                </tr>
            </table>
        </td>
    </tr>
</table>