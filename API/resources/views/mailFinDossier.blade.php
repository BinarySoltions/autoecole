<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
      @if($person->date_fin_contrat > $person->date_fin_permis)
    <h2>EXPIRATION DE VOTRE CONTRAT</h2>
    <p>Bonjour {{$person->nom}} {{$person->prenom}},<br/>
Votre contrat avec l’Ecole de conduite expire le {{date('Y-m-d',strtotime($person->date_fin_contrat))}} ?<br/>
Pensez à compléter le programme avant l’expiration sinon vous devriez le renouveler et des frais de renouvellement s’appliqueront<br/>

Pour plus d’informations vous pouvez nous appeler au 514-632-9644<br/>
Merci<br/>
Pconduite<br/>
<h5>Version anglaise</h5>
<h2>EXPIRATION CONTRACT</h2>
    <p>Hi {{$person->nom}} {{$person->prenom}},<br/>
Your contract with the school driving will expire on {{date('Y-m-d',strtotime($person->date_fin_contrat))}} ?<br/>
Think about finishing your program before otherwise you'll have to renew it before continuing the courses 
<br/>

For more information, call us at 514-632-9644<br/>
Regards<br/>
Pconduite<br/>
      @else
        <h2>EXPIRATION DE VOTRE PERMIS D’APPRENTI CONDUCTEUR</h2>
    <p>Bonjour {{$person->nom}} {{$person->prenom}},<br/>
Votre permis d’apprenti conducteur expire en le 
 {{date('Y-m-d',strtotime($person->date_fin_permis))}} ?<br/>
 Pensez à compléter le programme avant son expiration sinon vous devriez le renouveler pour pouvoir compléter le programme.<br/>

Pour plus d’informations vous pouvez nous appeler au 514-632-9644<br/>
Merci<br/>
Pconduite<br/>
<h5>Version anglaise</h5>
<h2>EXPIRATION LEARNER'S LICENCE</h2>
    <p>Hi {{$person->nom}} {{$person->prenom}},<br/>
Your learner’s licence will expire on {{date('Y-m-d',strtotime($person->date_fin_permis))}} ?<br/>
Think about finishing your program before otherwise you'll have to renew it before continuing the courses 
<br/>

For more information, call us at 514-632-9644<br/>
Regards<br/>
Pconduite<br/>
      @endif
    </p>
  </body>
</html>