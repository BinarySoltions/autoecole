<table border="0" cellpadding="2" style="width: 100%;">
    <tr>
        <td class="{{$class}}">
        {{$value}}
        </td>
        <td>@if(isset($value_two))
            {!! $value_two !!}
            @endif
        </td>
    </tr>
</table>