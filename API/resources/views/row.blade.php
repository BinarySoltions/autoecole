<td align="center" class="s" style="background-color: rgb(236, 234, 234);width:5%">{{$number[0]}}-</td>
<td align="center" class="s" style="width: 10%;">
@if(isset($reponse->a)  && $reponse->a == 1)
<img src="{{url('/images/checked.png')}}" width="10">
@else
<img src="{{url('/images/unchecked.png')}}" width="10">
@endif
</td>
<td align="center" class="s" style="width: 10%;">
@if(isset($reponse->b)  && $reponse->b == 1)
<img src="{{url('/images/checked.png')}}" width="10">
@else
<img src="{{url('/images/unchecked.png')}}" width="10">
@endif
</td>
<td align="center" class="s" style="width: 10%;">
@if(isset($reponse->c) && $reponse->c == 1)
<img src="{{url('/images/checked.png')}}" width="10">
@else
<img src="{{url('/images/unchecked.png')}}" width="10">
@endif
</td>
<td align="center" class="s" style="width: 10%;">
@if(isset($reponse->d)  && $reponse->d == 1)
<img src="{{url('/images/checked.png')}}" width="10">
@else
<img src="{{url('/images/unchecked.png')}}" width="10">
@endif
</td>
@if($number[1] == 24)
<td class="sb" style="background-color: rgb(185, 184, 184);" style="width: 5%;"></td>
@else
<td style="background-color: rgb(185, 184, 184);" style="width: 5%;"></td>
@endif

<td align="center" class="s" style="background-color: rgb(236, 234, 234);width:5%">{{$number[1]}}-</td>
<td align="center" class="s" style="width: 10%;">
@if(isset($reponsePlus->a)  && $reponsePlus->a == 1)
<img src="{{url('/images/checked.png')}}" width="10">
@else
<img src="{{url('/images/unchecked.png')}}" width="10">
@endif
</td>
<td align="center" class="s" style="width: 10%;">
@if(isset($reponsePlus->b) && $reponsePlus->b == 1)
<img src="{{url('/images/checked.png')}}" width="10">
@else
<img src="{{url('/images/unchecked.png')}}" width="10">
@endif
</td>
<td align="center" class="s" style="width: 10%;">
@if(isset($reponsePlus->c) && $reponsePlus->c == 1)
<img src="{{url('/images/checked.png')}}" width="10">
@else
<img src="{{url('/images/unchecked.png')}}" width="10">
@endif
</td>
<td align="center" class="s" style="width: 10%;">
@if(isset($reponsePlus->d) && $reponsePlus->d == 1)
<img src="{{url('/images/checked.png')}}" width="10">
@else
<img src="{{url('/images/unchecked.png')}}" width="10">
@endif
</td>