<table border="1" cellpadding="2">
    <tr>
        <th colspan="4" class="bg-color-black centrer font-weight-bold">Phase {{$phase}}</th>
    </tr>
    <tr>
        <td rowspan="2"  class="bg-color-green centrer font-weight-bold">Module</td>
        <td  class="bg-color-green centrer font-weight-bold" colspan="3">Complété le</td>
    </tr>
    <tr>
        <td colspan="3">
            <table border="0">
                <tr>
                    <td style="" class="bg-color-green  centrer">Année</td>
                    <td style="" class="bg-color-green  centrer">mois</td>
                    <td style="" class="bg-color-green centrer ">Jour</td>
                </tr>
            </table>
        </td>
    </tr>
    @foreach($modules as $module)
    <tr>
        <td class="font-label bg-color-white  centrer">{{$module->nom}}</td>
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