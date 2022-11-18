<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    @include('header',['title'=>$title])

    <div class="container content" style="background-color: white;text-align:center">
    <h2> PERFECTIONNEMENT DE CONDUITE POUR OBTENTION DU PERMIS DE CONDUIRE CLASSE 5 DU QUÉBEC</h2>

Vous avez terminé votre programme d’éducation à la sécurité routière dans une école de conduite reconnue et vous désirez améliorer votre conduite pour aller passer votre examen pratique à la SAAQ,

Vous désirez changer votre permis étranger et obtenir le permis de conduire du Québec,<br/>

<span class="primary"> Pconduite</span><br/>

a le bon plan de perfectionnement pour vous !!<br/>

Pour plus d’informations, prenez <a href="contactez-nous"> contact</a> avec nous.<br/>
    <div id="grpFlyersPerfectionnement" style="margin: 20px;">
    
    </div>
    
        @include('servicesBottom')
        <!-- If we need navigation buttons -->

    </div>
    <div class="container-fluid footer">
        @include('footer')
    </div>
    @include('script')
</body>

</html>