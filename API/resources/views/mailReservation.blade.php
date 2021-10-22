<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <h2>Information pconduite</h2>
    <p>Bonjour {{$person->first()->nom}} {{$person->first()->prenom}},</p><br/>
    <p>Rappel :</p>
    @foreach ($person as $msg)
    <p>
    <span style="font-weight: bolder;">Sortie : {{explode(" ", $msg->nom_module)[1]}} </span> <br/>
           
    <span style="font-weight: bolder;">Date : {{$msg->date}} </span> <br/>
         
    <span style="font-weight: bolder;">Heures : {{substr($msg->heure_debut,0,5)}} - {{substr($msg->heure_fin,0,5)}}</span>
</p>
<br/>
    @endforeach
    <p>Pour plus d’informations vous pouvez nous appeler au 514-632-9644<br/>Merci<br/>Pconduite<br/></p>
    <h5>Version anglaise</h5>
    <p>Hello {{$person->first()->nom}} {{$person->first()->prenom}},</p><br/>
    <p>Reminder :</p>
    @foreach ($person as $msg)
    <p>
    <span style="font-weight: bolder;">Session : {{explode(" ", $msg->nom_module)[1]}} </span> <br/>
           
    <span style="font-weight: bolder;">Date : {{$msg->date}} </span> <br/>
         
    <span style="font-weight: bolder;">Times : {{substr($msg->heure_debut,0,5)}} - {{substr($msg->heure_fin,0,5)}}</span>
</p>
<br/>
    @endforeach
    <p>For more information you can call us at 514-632-9644<br/>Regards<br/>Pconduite<br/></p>
  </body>
</html>