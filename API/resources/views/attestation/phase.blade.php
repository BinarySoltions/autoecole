<table border="0" style="text-align:center" cellpadding="5">
<tr>
    <td ><table border="1" cellpadding="1" style="width: 96%;">
    <tr>
        <th colspan="4" class="bg-color-black centrer font-weight-bold">Phase {{$phase}}</th>
    </tr>
    <tr>
        <td style="font-size:7px" class="bg-color-green centrer font-weight-bold">Module</td>
        <td   colspan="3">
        <table class="bg-color-green centrer font-weight-bold" style="font-size:7px" border="0">
                <tr><td colspan="3">
                Complété le
                </td></tr>
                <tr>
                    <td style="font-size:7px;font-weight:normal" class="bg-color-green  centrer">Année</td>
                    <td style="font-size:7px;font-weight:normal" class="bg-color-green  centrer">mois</td>
                    <td style="font-size:7px;font-weight:normal" class="bg-color-green centrer ">Jour</td>
                </tr>
            </table>
        </td>
    </tr>
    @foreach($modules as $module)
    <tr>
        <td style="font-size:7px;" class="font-label bg-color-white font-weight-bold  centrer">{{$module->nom}}</td>
        <td class=" font-label bg-color-white centrer" colspan="3">
            @if(isset($module->eleve_module->date_complete))
            {{date('Y-m-d',strtotime($module->eleve_module->date_complete))}}
            @endif
            @if(isset($module->eleve_module->sans_objet))
            S.O
            @endif
        </td>
    </tr>
    @endforeach
</table>
    </td>
</tr>
</table>