<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    @include('header',['title'=>$title])

    <div class="container" style="background-color: white;">
    @include('tarifsPrix')
    <div style="margin: 20px;">
    <img src="{{url('/images/AA_PAIEMENT.jpg')}}" alt="Paiement" style="width: 100%;">
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