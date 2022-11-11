<table border="0" style="text-align:center;width:98%;" cellpadding="0">
<tr>
<td style="height:2.5%"></td></tr>
<tr>
    <td><table border="1" cellpadding="0" >
    <tr>
        <th colspan="9" class="bg-color-black centrer font-weight-bold">Phase {{$phase}}</th>
    </tr>
    <tr>
        <td colspan="3" style="font-size:8px" class="bg-color-green centrer font-weight-bold">@if($phase == 1)<tcpdf method="Cell" params="{{$paramsM}}" />@else
        <table border="0"><tr><td>Modules</td></tr><tr><td><span style="font-weight:normal">et sorties</span></td></tr></table>@endif
        </td>
        <td   colspan="6">
        <table cellpadding="0" class="bg-color-green centrer font-weight-bold" style="font-size:8px" border="0">
                <tr><td colspan="6">Dates de réalisation
                </td></tr>
                <tr>
                    <td colspan="6" style="font-size:8px;font-weight:normal" class="bg-color-green  centrer sb">(Année-Mois-Jour)</td>
                </tr>
            </table>
        </td>
    </tr>
    @foreach($modules as $module)
    <tr>
        <td colspan="3" style="font-size:8px;text-align:left" class="font-label bg-color-white">
        @if(is_numeric($module->nom))
        Module  
        @endif
        {{$module->nom}}</td>
        <td class=" font-label bg-color-white centrer" colspan="6">
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