<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    @include('header',['title'=>$title])

    <div class="container content" style="background-color: white;">
    <h2>Dispositif de formation du programme d’éducation à la sécurité routière</h2>
    <div style="margin: 20px;">
    <img src="{{url('/images/DISPOSITIF.png')}}" alt="Dispositif" style="width: 100%;">
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