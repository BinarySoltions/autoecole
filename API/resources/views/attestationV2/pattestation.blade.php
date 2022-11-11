<style>
    .font-label {
        font-size: 9px;
    }

    .font-label-l {
        font-size: 11px;
    }
    .font-label-small{
        font-size: 7px;
        text-align: justify;
    }
    table {
        width: 100%;
    }

    .centrer {
        text-align: center !important;
    }

    .bg-color-white {
        background-color: white;
    }

    .bg-color-green {
        background-color: lightgray;
        font-weight: bolder;
    }

    .bg-color-black {
        background-color: black;
        color: white;
    }

    .bg-color-black-bolder {
        background-color: black;
        color: white;
        font-weight: bolder;
    }

    .font-weight-bold {
        font-weight: bold;
    }

    .font-weight-bolder {
        font-weight: bolder;
    }

    .sr {
        border-right: 1px solid black;
        border-image: url('<?php echo url('/images/droite.png'); ?>');
    }

    .sbr {
        border-right: 1px solid black;
        border-bottom: 1px solid black;
        border-image: url('<?php echo url('/images/droite.png'); ?>');
    }

    .sb {
        border-bottom: 1px solid black;
        border-image: url('<?php echo url('/images/droite.png'); ?>');
    }

    .s {
        border: 1px solid black;
        border-image: url('<?php echo url('/images/droite.png'); ?>');
    }

    .stw {
        border-image: url('<?php echo url('/images/bar-white.png'); ?>');
    }
    .padding-l{
        padding:auto auto auto 0px !important;
    }
    .full-s{
        width: 100%;
    }
    .s20-s{
        width: 20%;
    }
    .s80-s{
        width: 80%;
    }
    .s60-s{
        width: 60%;
    }
    .s10-s{
        width: 10%;
    }
    .s90-s{
        width: 90%;
    }
    .hfull-s{
        height:100%;
    }
    .pad-tb{
        padding-top: 10%;
        padding-bottom: 10%;
    }
    .italic-s{
        font-style: italic;
    }
</style>

<table cellpadding="0" style="width:100%;background-color: white;font-family: 'Helvetica Neue lt std', Helvetica, Arial, sans-serif; font-size:9px;">
<tr>
    <td>
    <table border="0">
        <tr>
            <td  style="width:25%"><img width="auto" src="<?php echo url('/images/saaq.png'); ?>" />
            </td>
            <td style="width:50%;text-align:center;">
                <table  cellpadding="3">
                <tr><td class="bg-color-black-bolder" style="text-align:center;font-size:6px;">
                &nbsp;&nbsp;&nbsp;&nbsp;
                </td></tr>
                    <tr><td class="bg-color-black-bolder" style="text-align:center;font-size:12px;">
                Attestation de cours de conduite - Classe 5
                </td></tr>
                
            </table>
            </td>
            <td style="width:25%;text-align:center">
                @include('attestationV2.noAttestation',['numero'=>$attestation->numero, 'params'=>$params])
            </td>
        </tr>
    </table>
    </td>
</tr>
<tr>
    <td>
    <table border="0" >
    <tr>
            <td>
            <span class="font-label-small">* Prenez note que ce formulaire est exigé par la Société et doit être rempli par une école reconnue.</span>
              
            </td>
        </tr>
        <tr>
            <td>
              @include('attestationV2.eleve',['eleve'=>$eleve,'paramsT'=>$paramsT])
            </td>
        </tr>
    </table>
    </td>
</tr>
<tr><td style="height:10px"></td></tr>
<tr>
    <td>
    <table border="0" >
        <tr>
            <td>
                @include('attestationV2.ecole',['ecole'=>$ecole,'paramsT'=>$paramsT])
            </td>
        </tr>
    </table>
    </td>
</tr>
<tr><td style="height:10px"></td></tr>
<tr>
    <td>
    <table>
        <tr>
            <td>
                <table border="0" cellpadding="2">
                    <tr>
                        <td align="center" style="background-color: lightgray; width:25%"><?php $phaseUne = $eleve->modules->filter(function ($value, $key) {
                                                                                                return  $value['phase_id'] == 1;
                                                                                            }); ?>
                            @include('attestationV2.phase',['modules'=>$phaseUne,'phase'=>1])
                            
                        </td>
                        @if(!$isAll)
                        <td colspan="3" style="width:75%;">
                        
                            <?php
                            $id = $attestation->personne_responsable_id;
                            $personneUne = $personnes->filter(function ($value, $key) use ($id) {
                                return  $value->id == $id;
                            });
                            $personneUne = $personneUne->first();
                            ?>
                            @include('attestationV2.resultatPhaseUne',['attestation'=>$attestation,'personne'=>$personneUne,'paramsM'=>$paramsM])
                        </td>
                        @else
                        <td style="background-color: lightgray;text-align: left;">
                            <?php $phaseDeux = $eleve->modules->filter(function ($value, $key) {
                                return  $value['phase_id'] == 2;
                            }); ?>
                            @if($isAll)
                            @include('attestationV2.phase',['modules'=>$phaseDeux,'phase'=>2,'paramsM'=>$paramsM])
                            @endif
                        </td>
                        
                        <td style="background-color: lightgray;">
                            <?php $phaseTrois = $eleve->modules->filter(function ($value, $key) {
                                return  $value['phase_id'] == 3;
                            }); ?>
                            @if($isAll)
                            @include('attestationV2.phase',['modules'=>$phaseTrois,'phase'=>3,'paramsM'=>$paramsM])
                            @endif
                        </td>
                        <td style="background-color: lightgray;">
                            <?php $phaseQuatre = $eleve->modules->filter(function ($value, $key) {
                                return  $value['phase_id'] == 4;
                            }); ?>
                            @if($isAll)
                            @include('attestationV2.phase',['modules'=>$phaseQuatre,'phase'=>4,'paramsM'=>$paramsM])
                            @endif
                        </td>
                        @endif
                    </tr>
                    @if($isAll)
                    <tr>
                        <td align="left" style="background-color: lightgray; width:25%">
                       
                            <table cellpadding="3">
                                <tr>
                                    <td style="font-size:7px;" class=""><em>Théorie : 12 modules (24 heures)
                                            Pratique : 15 sorties (15 heures)</em>
                                    </td>
                                </tr>
                            </table>
                    </td>
                        <td  colspan="3" style="background-color: lightgray;width:75%;"></td>
                    </tr>
                    @else
                    <tr>
                        <td align="left" style="background-color: lightgray; width:25%">
                       
                    </td>
                        <td  colspan="3" style="width:75%;"></td>
                    </tr>
                    @endif
                </table>
            </td>
        </tr>
    </table>
    </td>
</tr>
@if(!$isAll)
<tr><td style="height:150px"></td></tr>
@else
<tr><td style="height:90px"></td></tr>
@endif
<tr>
    <td>
    <table cellpadding="0">
        <tr>
            <td style="width: 75%;">

            </td>
            <td style="width: 25%;text-align: center;font-weight:bolder">Sceau de l'école
            </td>
        </tr>
        <tr>
            <td style="width: 75%;" align="bottom">
            @if(!$isAll)
            <table cellpadding="0" border="0"><tr><td style="height: 14px;"></td></tr></table>
            @else
            <table cellpadding="0" border="0"><tr><td style="height: 21px;"></td></tr></table>
            @endif
                <?php
                $id2 = $attestation->personne_responsable2_id;
                $personne = $personnes->filter(function ($value, $key) use ($id2) {
                    return  $value->id == $id2;
                });
                $personne = $personne->first();
                ?>
                @if($isAll)
                @include('attestationV2.resultatFinal',['attestation'=>$attestation,'personne'=>$personne])
                @else
                @include('attestationV2.communication')
                @endif
            </td>
            <td style="width: 25%;">
                <table border="0">
                    <tr>
                        <td class="s" style="height: 130px;"></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    </td>
</tr>
</table>