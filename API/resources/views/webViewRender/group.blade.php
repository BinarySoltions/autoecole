<div class="row" style="background: white;">
@foreach($groupes as $groupe)
    @if($nbr == 1)
    <div class="col-lg-12 col-md-12 col-xs-12">
    @else
    <div class="col-lg-6 col-md-12 col-xs-12">
@endif

@if($visibleDesc)
<section style="overflow: overlay; height: 200px;">
@if(isset($groupe->lang) && $groupe->lang=="fr")<h3>Nouveau Groupe</h3>@else <h3>New Group</h3> @endif
    <span style="text-align: justify;">{!! $groupe->description !!}</span>
</section>
@endif

            <img src="{{url($groupe->path)}}" alt="{{$groupe->name}}" style="width: 100%;">
        
    </div>
    @endforeach
</div>