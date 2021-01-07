<style>
    .font-label {
        font-size: 9px;
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

    .font-weight-bold {
        font-weight: bold;
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
</style>

<table cellpadding="3" style="width:100%;background-color: white;font-family: Arial, Helvetica, sans-serif; font-size:9px;">
<tr>
    <td>
    <table border="0">
        <tr>
            <td rowspan="4" style="width:75%">
                @include('attestation.permis',['numero'=>$eleve->numero_permis])
                @include('attestation.eleve',['eleve'=>$eleve])
            </td>
            <td style="width:25%;text-align:center">
                <tcpdf method="write1DBarcode" params="{{$params}}" />
            </td>
        </tr>
        <tr>
            <td style="width:25%;text-align:center">
                @include('attestation.noAttestation',['numero'=>$attestation->numero])
            </td>
        </tr>
        <tr>
            <td style="width:25%;height:1px"></td>
        </tr>
        <tr>
            <td style="width:20%;text-align:center">
                @include('attestation.noEcole',['numero'=>$ecole->numero])
            </td>
        </tr>
    </table>
    </td>
</tr>
<tr>
    <td>
    <table border="0">
        <tr>
            <td>
                @include('attestation.ecole',['ecole'=>$ecole])
            </td>
        </tr>
    </table>
    </td>
</tr>
<tr>
    <td>
    <table>
        <tr>
            <td>
                <table border="0" cellpadding="0">
                    <tr>
                        <td align="center" style="background-color: lightgray; width:25%"><?php $phaseUne = $eleve->modules->filter(function ($value, $key) {
                                                                                                return  $value['phase_id'] == 1;
                                                                                            }); ?>
                            @include('attestation.phase',['modules'=>$phaseUne,'phase'=>1])
                        </td>
                        <td colspan="4" style="width:75%;">
                            <?php
                            $id = $attestation->personne_responsable_id;
                            $personneUne = $personnes->filter(function ($value, $key) use ($id) {
                                return  $value->id == $id;
                            });
                            $personneUne = $personneUne->first();
                            ?>
                            @include('attestation.resultatPhaseUne',['attestation'=>$attestation,'personne'=>$personneUne])
                            @include('attestation.signature')
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="background-color: lightgray; width:25%"></td>
                        <td  colspan="4" style="width:75%;"></td>
                    </tr>
                    <tr>
                        <td style="background-color: lightgray; width:25%;text-align: left;">
                            <?php $phaseDeux = $eleve->modules->filter(function ($value, $key) {
                                return  $value['phase_id'] == 2;
                            }); ?>
                            @if($isAll)
                            @include('attestation.phase',['modules'=>$phaseDeux,'phase'=>2])
                            <table cellpadding="3">
                                <tr>
                                    <td style="font-size:7px;" class="font-weight-bold"><em>Théorie : 12 modules - 24 heures
                                            Pratique : 15 sorties - 15 heures</em>
                                    </td>
                                </tr>
                            </table>

                            @endif
                        </td>
                        <td style="background-color: lightgray; width:5%">
                        </td>
                        <td style="background-color: lightgray; width:32.5%">
                            <?php $phaseTrois = $eleve->modules->filter(function ($value, $key) {
                                return  $value['phase_id'] == 3;
                            }); ?>
                            @if($isAll)
                            @include('attestation.phase',['modules'=>$phaseTrois,'phase'=>3])
                            @endif
                        </td>
                        <td style="background-color: lightgray; width:5%">
                        </td>
                        <td style="background-color: lightgray; width:32.5%;height:165px">
                            <?php $phaseQuatre = $eleve->modules->filter(function ($value, $key) {
                                return  $value['phase_id'] == 4;
                            }); ?>
                            @if($isAll)
                            @include('attestation.phase',['modules'=>$phaseQuatre,'phase'=>4])
                            @endif
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    </td>
</tr>
<tr>
    <td>
    <table>
        <tr>
            <td style="width: 75%;">

            </td>
            <td style="width: 25%;text-align: center;font-weight:bolder">Sceau de l'école
            </td>
        </tr>
        <tr>
            <td style="width: 75%;">
                <?php
                $id2 = $attestation->personne_responsable2_id;
                $personne = $personnes->filter(function ($value, $key) use ($id2) {
                    return  $value->id == $id2;
                });
                $personne = $personne->first();
                ?>
                @if($isAll)
                @include('attestation.resultatFinal',['attestation'=>$attestation,'personne'=>$personne])
                @include('attestation.signatureFinal')
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