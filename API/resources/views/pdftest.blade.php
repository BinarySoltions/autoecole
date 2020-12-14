<div id="1pdf" style="width:100%;height: 792px;font-weight: 500;">
  <table cellspacing="0" cellpadding="1" class="" style="width:100%;margin-bottom:50px">
    <tr>
      <td width="20%" align="center">
        <div class="" >
        <br/>
          <img style="width:150px" src="/images/logo_pconduite.jpg" alt="logo" />
      </div>
      </td>
      <td width="50%" align="center" style="padding-top:0px;">
        <div class="" style="padding-top:0px;">
          <h3>{{$ecole->raison_social}} {{$ecole->nom}}</h3>
          @if ($ecole->adresse != null)
      <span>{{$ecole->adresse->numero}}
        @if ($ecole->adresse->rue != null)
          <span >, {{$ecole->adresse->rue}}</span>
          @endif
          @if ($ecole->adresse->appartement != null)
          <span >, #{{$ecole->adresse->appartement}}</span>
          @endif
          @if ($ecole->adresse->code_postal != null)
          <span >, {{$ecole->adresse->code_postal}}</span>
          @endif
          @if ($ecole->adresse->municipalite != null)
          <span >, {{$ecole->adresse->municipalite}}, {{$ecole->adresse->province}}</span>
          @endif
      </span>
      @endif
          <span><i class="fas fa-phone"></i> - Tel : 438-387-6644 </span><br/><br/>
        </div>
      </td>
      <td align="center" style="padding-top:0px;">
        <div style="padding-top:0px">
          <h4>Facture</h4>
      </div>
      </td>
    </tr>
  </table><!--end-->
<table cellspacing="0" cellpadding="1" class="" style="width:100%;margin:50px 0px;font-size: 12px !important">
  <tr>
    <td width="50%" align="left">
        <h4>Facturé à</h4>
      <span>{{$eleve->nom}} {{$eleve->prenom}}</span><br/>
      @if ($eleve->adresse != null)
      <span>{{$eleve->adresse->numero}}
        @if ($eleve->adresse->rue != null)
          <span >, {{$eleve->adresse->rue}}</span>
          @endif
          @if ($eleve->adresse->appartement != null)
          <span >, #{{$eleve->adresse->appartement}}</span>
          @endif
          @if ($eleve->adresse->code_postal != null)
          <span >, {{$eleve->adresse->code_postal}}</span>
          @endif
          @if ($eleve->adresse->municipalite != null)
          <span >, {{$eleve->adresse->municipalite}}, {{$eleve->adresse->province}}</span>
          @endif
      </span>
      @endif
      <br/>
      @if ($eleve->coordonnee != null)
      <span  ><i class="fas fa-phone"></i>Tel : {{$eleve->coordonnee->telephone}}</span>
      <br/><br/>
      @endif
    </td>
    <td align="right">
    <br/>
        <span>No de facture :</span><br/>
        <span>Date :</span> <br/>
        <span>Coût de la formation :</span><br/>
        <span *ngIf="totalPaye">Total payé :</span><br/>
    </td>
    <td align="left">
        <span>{{$dateDuJour}}</span><br/>
        <span>{{$dateDuJour}}</span><br/>
      <span>{{$eleve->frais_inscription }}</span><br/>
      <span >${{$totalPaye }}</span><br/>
      <br/>
    </td>
  </tr>
</table>
<div class="" style="width:100%;margin:20px 0px">
  <table cellspacing="0" cellpadding="4" border="1" width="100%" style="font-size: 12px !important">
    <tr>
    <th style="width:40%;text-align:center">Type de payement</th><th style="width:40%;text-align:center">Date payement</th><th style="width:20%;text-align:right;">Montant</th>
  </tr>
  @foreach($payementsPDF as $payementPDF)
  <tr ><td align="center">{{$payementPDF->type}}</td><td align="center">{{$payementPDF->date_payement}}</td><td style="text-align:right;">{{$payementPDF->montant*1.14975}}</td></tr>
  @endforeach
  <tr>
      <td colspan="2" align="right" style="border:0px solid white;border-left-color:black;border-bottom-color:black">
          <table border="0" >
          <tr><td colspan="2" align="right" style="padding:10px 0px">Sous Total : </td></tr>
        <tr><td  colspan="2" align="right">TVQ (no. 1224768920 TQ0001) :</td></tr>
        <tr><td  colspan="2" align="right" style="padding:10px 0px">TPS (no. 7052 7727 RT0001) :</td></tr>
         <tr><td  colspan="2" align="right" > Total : </td></tr>
          </table>
      </td>
      <td align="left" style="border:0px solid white;border-right-color:black;border-bottom-color:black">
      <table border="0" >
        <tr><td style="text-align:right;padding:10px 0px">{{$totalPaye}}</td></tr>
        <tr><td style="text-align:right;">{{$totalPaye}}</td></tr>
        <tr><td style="text-align:right;padding:10px 0px" >{{$totalPaye}}</td></tr>
        <tr><td style="text-align:right;">{{$totalPaye}}</td></tr>  
        </table>
      </td>
  </tr>
  <!-- <tr style="border:0px solid white"><td colspan="2" align="right" style="border:0px solid white">Sous Total : </td><td style="border:0px solid white;text-align:right;padding-right: 10px">{{$totalPaye}}</td></tr>
  <tr style="border:0px solid white"><td  colspan="2" align="right" style="border:0px solid white">TVQ (no. 1224768920 TQ0001) :</td><td style="border:0px solid white;text-align:right;padding-right: 10px">{{$totalPaye}}</td></tr>
  <tr style="border:0px solid white"><td  colspan="2" align="right" style="border:0px solid white">TPS (no. 7052 7727 RT0001) :</td><td style="border:0px solid white;text-align:right;padding-right: 10px" >{{$totalPaye}}</td></tr>
  <tr style="border:0px solid white"><td  colspan="2" align="right" style="border:0px solid white"> Total : </td><td style="border:0px solid white;text-align:right;padding-right: 10px">{{$totalPaye}}</td></tr> -->
  </table>
</div>
</div>