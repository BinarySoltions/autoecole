<nav class="navbar navbar-expand-lg navbar-light">
  <div class="container-fluid" style="z-index: 2;">
      <div class="col col-lg-3">
          <div class="header__logo">
    <a class="navbar-brand" href="#"><img src="{{url('/images/logo_pconduite.jpg')}}" width="200" /></a>
      </div>
      </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02" style="background-color: #00742c;padding-left:16px">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link {{Request::is('/') ? 'active' : ''}}" aria-current="page" href="/">Accueil</a>
        </li>
        <li class="nav-item">
          <a class="nav-link {{Request::is('tarifs') ? 'active' : ''}}" href="tarifs">Tarifs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Liens utils</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Perfectionnement</a>
        </li>
        <li class="nav-item">
          <a class="nav-link {{Request::is('formation') ? 'active' : ''}}" href="formation">Formation</a>
        </li>
        <li class="nav-item">
          <a class="nav-link {{Request::is('contactez-nous') ? 'active' : ''}}" href="contactez-nous" >Contact</a>
        </li>
      </ul>
    </div>
    
  </div>
</nav>