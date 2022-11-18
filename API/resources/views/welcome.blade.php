<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    @include('header',['title'=>$title])

    <div class="container-fluid">@include('carousel')</div>
    <div id="grpImage" class="container" style="margin-top: 50px;"> 
    </div>
   
    <div id="grpFlyers" class="container" style="margin-top: 50px;"> 
   
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