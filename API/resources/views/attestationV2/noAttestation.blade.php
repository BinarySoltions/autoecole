<table border="1" cellpadding="1">
    <tr>
        <th class="bg-color-black" style="text-align:center;font-weight:bolder">Numéro d'attestation</th>
    </tr>
    <tr>
        <td style="color:red;text-align:center;font-weight:bolder;font-size:14px;letter-spacing: 4px;">{{$numero}}</td>
    </tr>
    <tr>
        <td><tcpdf method="write1DBarcode" params="{{$params}}" /></td>
    </tr>
</table>