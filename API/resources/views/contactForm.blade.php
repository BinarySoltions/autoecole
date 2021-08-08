<div class="container" style="background-color: white;">
<form id="formContact" data-action="{{url('/api/sendContact')}}">
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