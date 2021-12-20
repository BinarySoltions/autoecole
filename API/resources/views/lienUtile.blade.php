<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    @include('header',['title'=>$title])

    <div class="container content" style="background-color: white;text-align:center">
    <h2>Liens utiles</h2>
    <div style="margin: 20px;">
    <a href="https://saaq.gouv.qc.ca/cours-conduite">
    <h5 style="font-weight: bold;">Cours de conduite</h5>
        </a>
        <a href="https://saaq.gouv.qc.ca/en/driving-course">
        <h5 style="font-weight: bold;">Driving Course</h5>
        </a>
    </div>
    <div style="margin: 20px;">
    
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