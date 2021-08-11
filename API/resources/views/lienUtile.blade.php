<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    @include('header',['title'=>$title])

    <div class="container content" style="background-color: white;text-align:center">
    <h2>Testez vos connaissance</h2>
    <div style="margin: 20px;">
    <a href="https://testdeconnaissances.saaq.gouv.qc.ca/fr/">
        <img src="{{url('/images/testervoscon.png')}}" alt="Dispositif" style="width: 100%;"/>
        </a>
    </div>
    <div style="margin: 20px;">
    <a href="https://saaq.gouv.qc.ca/cours-conduite">
        <img src="{{url('/images/PESR.png')}}" alt="Dispositif" style="width: 100%;"/>
        </a>
    </div>
    <h2>Autres liens</h2>
    <div style="margin: 20px;">
    <a href="https://www.aecq.ca/">
        <img src="{{url('/images/AECQ-Logo.png')}}" alt="Dispositif" style="width: 50%;"/>
        </a>
        <a href="https://aqtr.com/">
        <img src="{{url('/images/AQTR_evenement_TM.png')}}" alt="Dispositif" style="width: 50%;"/>
        </a>
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