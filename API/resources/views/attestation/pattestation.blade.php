<style>
    .font-label {
        font-size: 7px;
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
</style>

<div style="width:100%;background-color: white;font-family: Arial, Helvetica, sans-serif; font-size:7px;">
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
    <table border="0">
        <tr>
            <td style="height: 1px;">
            </td>
        </tr>
        <tr>
            <td>
                @include('attestation.ecole',['ecole'=>$ecole])
            </td>
        </tr>
    </table>
    <table>
        <tr>
            <td>
            </td>
        </tr>
    </table>
    <table cellpadding="2">
        <tr>
            <td>
                <table border="0" cellpadding="3">
                    <tr>
                        <td style="background-color: lightgray; width:25%">
                            <?php $phaseUne = $eleve->modules->filter(function ($value, $key) {
                                return  $value['phase_id'] == 1;
                            }); ?>
                            @include('attestation.phase',['modules'=>$phaseUne,'phase'=>1])
                        </td>
                        <td colspan="4" style="width:75%;padding-right:0px">
                            <?php 
                            $id = $attestation->personne_responsable_id;
                            $personneUne = $personnes->filter(function ($value, $key) use ($id) {
                                return  $value->id == $id;
                            }); ?>
                            @include('attestation.resultatPhaseUne',['attestation'=>$attestation,'personne'=>$personneUne])
                            @include('attestation.signature')
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: lightgray; width:25%;text-align: left;">
                            <?php $phaseDeux = $eleve->modules->filter(function ($value, $key) {
                                return  $value['phase_id'] == 2;
                            }); ?>
                            @include('attestation.phase',['modules'=>$phaseDeux,'phase'=>2])
                            <p class="font-weight-bold"><em>Théorie : 12 modules - 24 heures
                                    Pratique : 15 sorties - 15 heures</em></p>
                        </td>
                        <td style="background-color: lightgray; width:10%">
                        </td>
                        <td style="background-color: lightgray; width:27.5%">
                            <?php $phaseTrois = $eleve->modules->filter(function ($value, $key) {
                                return  $value['phase_id'] == 3;
                            }); ?>
                            @include('attestation.phase',['modules'=>$phaseTrois,'phase'=>3])
                        </td>
                        <td style="background-color: lightgray; width:10%">
                        </td>
                        <td style="background-color: lightgray; width:27.5%;">
                            <?php $phaseQuatre = $eleve->modules->filter(function ($value, $key) {
                                return  $value['phase_id'] == 4;
                            }); ?>
                            @include('attestation.phase',['modules'=>$phaseQuatre,'phase'=>4])
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table>
        <tr>
            <td style="height: 2px;"></td>
        </tr>
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
                    return  $value['id'] == $id2;
                }); ?>
                @include('attestation.resultatFinal',['attestation'=>$attestation,'personne'=>$personne])
                @include('attestation.signatureFinal')
            </td>
            <td style="width: 25%;">
            <table border="0">
                <tr>
                    <td class="s" style="height: 120px;"></td>
                </tr>
            </table>
            </td>
        </tr>
    </table>
</div>