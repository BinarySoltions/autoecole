<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <h2>MOT DE PASSE</h2>
    <p>Bonjour {{$person->nom}} {{$person->prenom}},<br/>
Votre mot de passe : {{$person->password_default}}<br/><br/>
Pour plus d’informations vous pouvez nous appeler au 514-632-9644<br/>
Merci<br/>
Pconduite<br/>
<h5>Version anglaise</h5>
<h2>PASSWORD</h2>
    <p>Hi {{$person->nom}} {{$person->prenom}},<br/>
    Your password : {{$person->password_default}}<br/><br/>
For more information, call us at 514-632-9644<br/>
Regards<br/>
Pconduite<br/>
     
  </body>
</html>