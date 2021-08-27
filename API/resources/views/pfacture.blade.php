<div id="1pdf" style="width:100%;height: 792px;font-weight: 500;font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
    line-height: 1.5;">
  <table cellspacing="0" cellpadding="1" class="" style="width:100%;margin-bottom:50px">
    <tr>
      <td width="20%" align="center">
        <div class="" >
        <br/>
          <img style="width:150px" src="{{url('/images/logo_pconduite.jpg')}}" alt="logo" />
      </div>
      </td>
      <td width="50%" align="center" style="padding-top:0px;">
        <div class="" style="padding-top:0px;">
          <h3>{{$ecole->raison_social}} {{$ecole->nom}}</h3>
          @if (isset($ecole->adresse))
      <span>{{$ecole->adresse->numero}}
        @if (isset($ecole->adresse->rue))
          <span >, {{$ecole->adresse->rue}}</span>
          @endif
          @if (isset($ecole->adresse->appartement))
          <span >, #{{$ecole->adresse->appartement}}</span>
          @endif
          @if (isset($ecole->adresse->code_postal))
          <span >, {{$ecole->adresse->code_postal}}</span>
          @endif
          @if (isset($ecole->adresse->municipalite))
          <span >, {{$ecole->adresse->municipalite}}, {{$ecole->adresse->province}}</span>
          @endif
      </span>
      @endif
          <span><i class="fas fa-phone"></i> - Tél : 438-387-6644 </span><br/><br/>
        </div>
      </td>
      <td align="center" style="padding-top:0px;">
        <div style="padding-top:0px">
          <h4>Facture</h4>
      </div>
      </td>
    </tr>
  </table><!--end-->
<table cellspacing="0" cellpadding="1" class="" style="width:100%;margin:50px 0px;">
  <tr><th width="50%"><h4>Facturé à</h4></th><th></th><th></th></tr>
<tr>
    <td  align="left"><span>{{$eleve->nom}} {{$eleve->prenom}}</span><br/>
      @if (isset($eleve->adresse))
      <span>{{$eleve->adresse->numero}}
        @if (isset($eleve->adresse->rue))
          <span >, {{$eleve->adresse->rue}}</span>
          @endif
          @if (isset($eleve->adresse->appartement))
          <span >, #{{$eleve->adresse->appartement}}</span>
          @endif
          <br/>
          @if (isset($eleve->adresse->code_postal))
          <span >, {{$eleve->adresse->code_postal}}</span>
          @endif
          @if (isset($eleve->adresse->municipalite))
          <span >, {{$eleve->adresse->municipalite}} @if (isset($eleve->adresse->province)),{{$eleve->adresse->province}}@endif</span>
          @endif
      </span>
      @endif
      <br/>
      @if (isset($eleve->coordonnee->telephone))
      <span  ><i class="fas fa-phone"></i>Tél : {{$eleve->coordonnee->telephone}}</span>
      @endif
      <br/><br/>
    </td>
    <td align="right">
        <span>No de facture :</span><br/>
        <span>Date :</span> <br/>
        <span>Coût de la formation :</span><br/>
        <span *ngIf="totalPaye">Total payé :</span>
    </td>
    <td align="left"><span>{{date("Hms")}}</span><br/>
    <span>{{$dateDuJour}}</span><br/>
      <span>${{$eleve->frais_inscription }}</span><br/>
      <span >${{$totalPaye }}</span><br/>
      <br/>
    </td>
  </tr>
</table>
<div class="" style="width:100%;margin:20px 0px">
  <table cellspacing="0" cellpadding="4" border="1" style="border-color:#313233" width="100%">
    <tr>
    <th style="width:40%;text-align:center">Type de payement</th><th style="width:40%;text-align:center">Date payement</th><th style="width:20%;text-align:right;">Montant</th>
  </tr>
  @foreach($payementsPDF as $payementPDF)
  <tr ><td align="center">{{$payementPDF->type}}</td><td align="center">{{$payementPDF->date_payement}}</td><td style="text-align:right;">${{number_format($payementPDF->montant/1.14975,2)}}</td></tr>
  @endforeach
  <tr>
      <td colspan="2" align="right" style="border:0px solid white;border-left-color:black;border-bottom-color:black">
          <table border="0" >
          <tr><td colspan="2" align="right" style="padding:10px 0px">Sous Total : </td></tr>
        <tr><td  colspan="2" align="right">TVQ (no. 1224768920 TQ0001) :</td></tr>
        <tr><td  colspan="2" align="right" style="padding:10px 0px">TPS (no. 70752 7727 RT0001) :</td></tr>
         <tr><td  colspan="2" align="right" > Total : </td></tr>
          </table>
      </td>
      <td align="left" style="border:0px solid white;border-right-color:black;border-bottom-color:black">
      <table border="0" >
        <tr><td style="text-align:right;padding:10px 0px">${{number_format($totalPaye/(1+0.05+0.09975),2)}}</td></tr>
        <tr><td style="text-align:right;">${{number_format(($totalPaye/(1+0.05+0.09975))*0.09975,2)}}</td></tr>
        <tr><td style="text-align:right;padding:10px 0px" >${{number_format(($totalPaye/(1+0.05+0.09975))*0.05,2)}}</td></tr>
        <tr><td style="text-align:right;">${{number_format($totalPaye,2)}}</td></tr>  
        </table>
      </td>
  </tr>
  </table>
</div>
</div>