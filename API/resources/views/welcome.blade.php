<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    @include('header',['title'=>$title])

    <div class="container-fluid">@include('carousel')</div>
   
    <div class="container" style="margin-top: 50px;"> 
    <div class="row" style="background: white;">
    <div class="col-lg-6 col-md-12 col-xs-12">
        
            <h1>Tarifs</h1>
        
            <img src="{{url('/images/PESR-Pconduite-Flyer221.jpg')}}" alt="Paiement" style="width: 100%;">
        
    </div>
    <div class="col col-lg-6" style="padding-right: 0;">
    <h1>Perfectionnement</h1>
    <img src="{{url('/images/perfectionnement20220124.jpg')}}" alt="Dispositif" style="width: 100%;"/>
    </div>
    </div>
</div>
<div class="container"> @include('service') </div>
    <div class="container" style="margin-top: 50px;"> @include('mission') </div>
    @include('contactForm')
    <div class="container" style="background-color: white;">
        
        @include('servicesBottom')
        <!-- If we need navigation buttons -->

    </div>
    <div class="container-fluid footer">
        @include('footer')
    </div>
    @include('script')
</body>

</html>