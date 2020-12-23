<style>
  tbody tr:nth-child(odd) {
    background-color: white !important;
  }

  td {

    /* font-weight: 500; */
    color: black;
  }

  td {
    padding: 0px 8px;
  }

  .w-100 {
    width: 100% !important;
  }

  .w-50 {
    width: 50% !important;
  }

  .c-padding-right {
    padding-right: 10px;
  }

  .c-padding-left {
    padding-left: 10px;
  }

  .h-row {
    height: 7.5px !important;
  }

  .h-s {
    height: 1px !important;
  }

  .no-bottom {
    border-bottom-style: solid;
    border-bottom-width: 0px;
    border-bottom-color: white;
  }

  .row-spacing {
    border-collapse: separate;
    border-spacing: 0 8px;
  }

  .no-border-right {
    border-right-style: none;
    border-right-width: 1px;
    border-right-color: white;
  }

  td.no-border {
    border-style: none;
    border-width: 0px;
    border-color: white;
  }

  .border-right {
    border-right-style: solid;
    border-right-width: 1px;
    border-right-color: black;
  }

  .contrat-title-header {
    background-color: #cccccc;
    padding: 0 5px;
    border-bottom: 1px solid black;
    font-weight: bolder;
    font-size: 10px;
  }

  .no-bottom-space {
    padding: 0 1rem;
  }

  .no-bottom-space>p {
    margin-bottom: 1px !important;
    font-size: 5px;
  }

  .contrat-title-cell {
    background-color: #cecece;
    font-weight: bold;
  }

  .border-bold {
    border-style: solid;
    border-width: 1.5px;
    border-color: black;
  }

  .border-normal {
    border-style: solid;
    border-width: 1px;
    border-color: black;
  }

  .border-bottom {
    /* border-bottom: 1 solid black !important; */
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: black;
  }

  .border-top {
    /* border-top: 1 solid black !important; */
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: black;
  }

  .border-bottom>td {
    /* border-bottom: 1 solid black !important; */
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: black;
  }

  .no-border-left {
    /* border-left-color: transparent !important; */
    border-left-style: none;
    border-left-width: 0px;
    border-left-color: white;
  }

  .border-left {
    /* border-left-color: black !important; */
    border-left-style: solid;
    border-left-width: 1px;
    border-left-color: black;
  }

  .no-border-top>td {
    /* border-top-color: white; */
    border-top-style: none;
    border-top-width: 0px;
    border-top-color: white;
  }

  .no-border-top {
    /* border-top-color: white; */
    border-top-style: solid;
    border-top-width: 0px;
    border-top-color: white;
  }

  .input-w-80 {
    width: 100px;
    height: 30px;
    text-align: right;
    border: white;
    padding-right: 5px;
  }

  .chk-size-8 {
    width: 8px;
    height: 8px;
  }

  .padding-bottom>td {
    padding-bottom: 15px;
  }

  .padding-top>td {
    padding-top: 15px;
  }

  .margin-bottom {
    margin-bottom: 15px;
  }

  .bg-color-transparent {
    background-color: white;
    color: black;
  }

  .sr {
    border-right: 1px solid black;
    border-image: url('<?php echo url('/images/droite.png');?>');
  }

  .sbr {
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    border-image: url('<?php echo url('/images/droite.png');?>');
  }

  .sb {
    border-bottom: 1px solid black;
    border-image: url('<?php echo url('/images/droite.png');?>');
  }

  .s {
    border: 1px solid black;
    border-image: url('<?php echo url('/images/droite.png');?>');
  }

  .w-input {
    width: 40px;
    text-align: right;
  }
</style>
<div id="1pdf" style="width:100%;background-color: white;font-family: Arial, Helvetica, sans-serif; font-size:7px;">
  <table border="0" style="width:100%;">
    <tr>
      <td class="w-50 margin-bottom">
        <!-- <app-ecole-conduite [ecole]="ecole"></app-ecole-conduite> -->
        @include('contrat.ecoleConduite',['ecole'=>$ecole])
      </td>
      <td class="c-padding-left " align="bottom">
        <!-- <app-numero-contrat [numero]="eleve?.numero_contrat"></app-numero-contrat> -->
        <!-- <app-moto-conduite></app-moto-conduite> -->
        <!-- @include('contrat.numero',['numero'=>$eleve->numero_contrat]) -->
        @include('contrat.motoConduite')
      </td>
    </tr>
    <tr>
      <!-- titre -->
      <td colspan="2" style="height: 10px;">

      </td>
    </tr>
    <tr>
      <!-- titre -->
      <td colspan="2" align="center" class="">
        <strong>CONTRAT DE VENTE DES COURS OFFICIELS DE LA SAAQ / SALES CONTRACT FOR SAAQ’S OFFICIAL DRIVING COURSES </strong>
        <br />Formation théorique et pratique : tarif unitaire unique / Theoretical and practical instruction: Single unit rate
      </td>
    </tr>
    <tr>
      <!-- titre -->
      <td colspan="2" style="height: 10px;">

      </td>
    </tr>
    <tr>
      <!-- description formation -->
      <td colspan="2" class="">
        <!-- <app-eleve-info [eleve]="eleve"></app-eleve-info> -->
        @include('contrat.eleveInfo',['eleve'=>$eleve])
      </td>
    </tr>
    <tr>
      <!-- titre -->
      <td colspan="2" style="height: 10px;">

      </td>
    </tr>
    <tr>
      <!-- description formation -->
      <td colspan="2" class="">
        <!-- <app-description-formation [descriptionFormation]="parametres.description_formation"></app-description-formation> -->
        @include('contrat.descriptionFormation',['descriptionFormation'=>$parametres->description_formation])
      </td>
    </tr>
    <tr>
      <!-- titre -->
      <td colspan="2" style="height: 205px;">

      </td>
    </tr>
  </table>

  <table border="0" style="width:100%;">
    <tr>
      <td colspan="2">
        <!-- <app-numero-contrat [numero]="eleve?.numero_contrat"></app-numero-contrat> -->
        <!-- @include('contrat.numero',['numero'=>$eleve->numero_contrat]) -->
      </td>
    </tr>
    <tr>
      <!-- cout formation -->
      <td colspan="2">
        <!-- <app-cout-formation [loiCoutFormation]="parametres.cout_formation" [coutFormation]="eleve?.frais_inscription"></app-cout-formation> -->
        @include('contrat.loiCoutFormation',['loiCoutFormation'=>$parametres->cout_formation,
        'eleve'=>$eleve,'nbTheorique'=>$nbTheorique,'nbPratique'=>$nbPratique])
      </td>
    </tr>
  </table>

  <table border="0" style="width:100%;">
    <tr>
      <!-- titre -->
      <td style="height: 10px;">

      </td>
    </tr>
    <tr>
      <td>
        @include('contrat.modalitePayement',['modalitePayementUn'=>$parametres->modalite_payement_un,
        'modalitePayementDeux'=>$parametres->modalite_payement_deux,'modalitePayementTrois'=>$parametres->modalite_payement_trois,
        'eleve'=>$eleve,'versement'=>number_format($eleve->frais_inscription/3,2)])
        <!-- <app-modalite-payement [modalitePayementUn]="parametres.modalite_payement_un"
        [modalitePayementDeux]="parametres.modalite_payement_deux"
        [modalitePayementTrois]="parametres.modalite_payement_trois"
        [eleve]="eleve"
        [versement]="versement" [dateDebut]="eleve.date_contrat"
        ></app-modalite-payement> -->
      </td>
    </tr>
  </table>

  <table style="width:100%;">
    <tr>
      <td style="height: 40px;">
        <!-- <app-numero-contrat [numero]="eleve?.numero_contrat"></app-numero-contrat> -->
      </td>
    </tr>
    <tr>
      <td>
      @include('contrat.acceptationCondition',['loiConditionUne'=>$parametres->acceptation_condition_un,
        'loiConditionENG'=>$parametres->acceptation_condition_anglais,'loiConditionDeux'=>$parametres->acceptation_condition_deux,
        'loiConditionTrois'=>$parametres->acceptation_condition_trois,'dateVersion'=>$dateVersion])
        <!-- <app-acceptation-condition [loiConditionUne]="parametres.acceptation_condition_un" [loiConditionENG]="parametres.acceptation_condition_anglais" [loiConditionDeux]="parametres.acceptation_condition_deux" [loiConditionTrois]="parametres.acceptation_condition_trois"></app-acceptation-condition> -->
      </td>
    </tr>
  </table>
  <table style="width:100%;">
  <tr>
      <td style="height: 50px;">
        <!-- <app-numero-contrat [numero]="eleve?.numero_contrat"></app-numero-contrat> -->
      </td>
    </tr>
    <tr>
      <td class="w-50">
        <!-- <app-ecole-conduite [ecole]="ecole"></app-ecole-conduite> -->
        @include('contrat.ecoleConduite',['ecole'=>$ecole])
      </td>
      <td class="w-50 c-padding-left" align="bottom">
        <!-- <app-numero-contrat [numero]="eleve?.numero_contrat"></app-numero-contrat>
        <app-moto-conduite></app-moto-conduite> -->
        @include('contrat.motoConduite')
      </td>
    </tr>
    <tr>
      <!-- titre -->
      <td style="height: 10px;">

      </td>
    </tr>
    <tr>
      <!-- titre -->
      <td colspan="2" align="center">
        <strong>CONTRAT DE VENTE DES COURS OFFICIELS DE LA SAAQ / SALES CONTRACT FOR SAAQ’S OFFICIAL DRIVING COURSES </strong>
        <br />Formation théorique et pratique : tarif unitaire unique / Theoretical and practical instruction: Single unit rate
      </td>
    </tr>
    <tr>
      <!-- titre -->
      <td style="height: 10px;">

      </td>
    </tr>
    <tr>
      <td colspan="2" >
        <!-- <app-resiliation></app-resiliation> -->
        @include('contrat.resiliation')
      </td>
    </tr>
  </table>
</div>