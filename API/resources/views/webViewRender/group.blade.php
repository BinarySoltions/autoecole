<div class="row" style="background: white;">
@foreach($groupes as $groupe)
    @if($nbr == 1)
    <div class="col-lg-12 col-md-12 col-xs-12">
    @else
    <div class="col-lg-6 col-md-12 col-xs-12">
@endif
@if(isset($groupe->description))
<section>
    <span class="complete">{!! $groupe->description !!}</span>
    <span class="notAll">{!! substr($groupe->description,0,400)!!}</p></span>
    <span class="more" style="color:green;font-weight:bold;cursor:pointer;font-size:large">Voir plus..</span>
</section>
@endif

            <img src="{{url($groupe->path)}}" alt="{{$groupe->name}}" style="width: 100%;">
        
    </div>
    @endforeach
</div>