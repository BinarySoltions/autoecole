<div class="container" style="background-color: white;">
<div id="msgC" class="toast  w100 btn-primary" style="position:absolute;z-index:-1">
    <div class="toast-header">
      Information
    </div>
    <div class="toast-body">
      Merci pour votre message!<br/> Notre service à la clientèle vous répondra le plus rapidement possible!
    </div>
  </div>
<form id="formContact" data-action="{{url('/api/sendContact')}}">
<h1>Contactez nous</h1>
<div class="form-group">
    <label for="nom">Nom (obligatoire)</label>
    <input type="text" class="form-control" name="nom" id="nom"  placeholder="votre nom" required>
  </div>
  <div class="form-group">
    <label for="email">Email (obligatoire)</label>
    <input type="email" class="form-control" name="email" id="email" placeholder="votre email" required>
  </div>
  <div class="form-group">
    <label for="telephone">Téléphone  (obligatoire)</label>
    <input type="text" class="form-control" name="telephone" id="telephone" placeholder="votre téléphone" required>
  </div>
  <div class="form-group">
    <label for="sujet">Sujet</label>
    <input type="text" class="form-control" name="sujet" id="sujet" placeholder="Sujet">
  </div>
  <div class="form-group">
    <label for="message">Message (obligatoire)</label>
    <textarea class="form-control" id="message" name="message" rows="5" required></textarea>
  </div>
  <div class="row">
      <div class="col col-12">
      <button type="submit" id="sendContact" class="btn btn-primary">Envoyer</button>
      </div>
  
  </div>
 
</form>
</div>