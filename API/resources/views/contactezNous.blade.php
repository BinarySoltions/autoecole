<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    @include('header',['title'=>$title])

    <div class="container content" style="background-color: white;">
    <div style="text-align: center;">
    <h2>Écolde de conduite Pconduite</h2>
    <p>Téléphone : (438) 387-6644 <br/>

Email : <a href="mailto:info@pconduite.com">info@pconduite.com</a><br/>

Adresse : 6875, avenue victoria<br/>

Montréal (QC) H3W 2T3<br/>

Pour toute information, veuillez remplir le formulaire ci-dessous</p>
</div>
    <div style="margin: 20px;">
   
    </div>
  
        @include('contactForm')
        <!-- If we need navigation buttons -->

    </div>
    <div class="container-fluid footer">
        @include('footer')
    </div>
    @include('script')
</body>

</html>