<td align="center" style="background-color: rgb(236, 234, 234);">{{$number[0]}}-</td>
<td align="center">
@if(isset($reponse->a)  && $reponse->a == 1)
<img src="{{url('/images/checked.png')}}" width="10">
@else
<img src="{{url('/images/unchecked.png')}}" width="10">
@endif
</td>
<td align="center">
@if(isset($reponse->b)  && $reponse->b == 1)
<img src="{{url('/images/checked.png')}}" width="10">
@else
<img src="{{url('/images/unchecked.png')}}" width="10">
@endif
</td>
<td align="center">
@if(isset($reponse->c) && $reponse->c == 1)
<img src="{{url('/images/checked.png')}}" width="10">
@else
<img src="{{url('/images/unchecked.png')}}" width="10">
@endif
</td>
<td align="center">
@if(isset($reponse->d)  && $reponse->d == 1)
<img src="/images/checked.png" width="10">
@else
<img src="{{url('/images/unchecked.png')}}" width="10">
@endif
</td>
<td style="background-color: rgb(185, 184, 184);"></td>
<td align="center" style="background-color: rgb(236, 234, 234);">{{$number[1]}}-</td>
<td align="center">
@if(isset($reponsePlus->a)  && $reponsePlus->a == 1)
<img src="{{url('/images/checked.png')}}" width="10">
@else
<img src="{{url('/images/unchecked.png')}}" width="10">
@endif
</td>
<td align="center">
@if(isset($reponsePlus->b) && $reponsePlus->b == 1)
<img src="{{url('/images/checked.png')}}" width="10">
@else
<img src="{{url('/images/unchecked.png')}}" width="10">
@endif
</td>
<td align="center">
@if(isset($reponsePlus->c) && $reponsePlus->c == 1)
<img src="{{url('/images/checked.png')}}" width="10">
@else
<img src="{{url('/images/unchecked.png')}}" width="10">
@endif
</td>
<td align="center"  style="">
@if(isset($reponsePlus->d) && $reponsePlus->d == 1)
<img src="{{url('/images/checked.png')}}" width="10">
@else
<img src="{{url('/images/unchecked.png')}}" width="10">
@endif
</td>