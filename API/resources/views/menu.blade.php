<div class="row justify-content-end top-bar">
<div class="col-auto">
<a class="btn btn-primary my-2 my-sm-0" href="https://pconduite.com/auto/public/inscription">Inscription</a>
<a class="btn btn-primary my-2 my-sm-0" href="https://pconduite.com/auto/public/reservation">Réservation</a>
<button id="test" class="btn btn-primary my-2 my-sm-0 mr-1" type="button">(438) 387-6644</button>
</div>
</div>
<div class="container top-nav">
<nav class="navbar navbar-expand-lg navbar-light">
  <div class="container-fluid" style="z-index: 2;">
    <div class="col col-lg-3">
      <div class="header__logo">
        <a class="navbar-brand" href="/"><img src="{{url('/images/logo_pconduite.jpg')}}" width="200" /></a>
      </div>
    </div>
   
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02" style="background-color: #00742c;padding-left:16px">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link {{Request::is('/') ? 'active' : ''}}" aria-current="page" href="/"><span>Accueil<span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link {{Request::is('tarifs') ? 'active' : ''}}" href="tarifs"><span>Tarifs<span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link {{Request::is('liens-utiles') ? 'active' : ''}}" href="liens-utiles"><span>Liens utiles<span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link {{Request::is('perfectionnement') ? 'active' : ''}}" href="perfectionnement"><span>Perfectionnement<span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link {{Request::is('formation') ? 'active' : ''}}" href="formation"><span>Formation<span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link {{Request::is('contactez-nous') ? 'active' : ''}}" href="contactez-nous"><span>Contact</span></a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</div>