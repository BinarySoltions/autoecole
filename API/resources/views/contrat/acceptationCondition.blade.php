<table border="1">
    <tr>
        <th  class="contrat-title-header">
            5- ACCEPTATION DES CONDITIONS / <em>ACCEPTANCE OF TERMS AND CONDITIONS</em>
        </th>
    </tr>
    <tr>
        <td>
            <table border="0" cellpadding="3" class="w-100 margin-bottom">
                <tr>
                    <td width="50%" class="sbr">{!! $loiConditionUne !!}</td>
                    <td class="sb">{!! $loiConditionENG !!}</td>
                </tr>
                <tr>
                    <td colspan="2" class="sb" style="text-align:center;padding:5px">Pour plus d'infos, consulter le site http://www.opc.gouv.qc.ca. /
                        <em>For additional information, go to http://www.opc.gouv.qc.ca.</em>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="sb">{!! $loiConditionDeux !!}</td>
                </tr>
                <tr>
                    <td colspan="2" style="height: 5px;"></td>
                </tr>
                <tr>
                    <td colspan="2" class="" style="padding:20px;">
                        <table class="w-100">
                            <tr>
                                <td style="width:35%">Fait et signé à / <em>Completed and signed in </em>:</td>
                                <td style="width:15%" class="sb"></td>
                                <td style="width:35%">, le / <em>on</em> (JJ/MM/AAAA) / <em>(MM/DD/ YYYY)</em>:</td>
                                <td style="width:15%" class="sb"></td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="height: 5px;"></td>
                </tr>
                <tr>
                    <td colspan="2" class="sb">{!! $loiConditionTrois !!}</td>
                </tr>
                <tr>
                    <td colspan="2" style="height: 5px;"></td>
                </tr>
                <tr>
                    <td colspan="2"><strong> NB. - L'école doit conserver le dossier de l’élève conformément aux lois applicables et ne peut le détruire avant l’expiration d’une période de 5 ans suivant la fin du contrat de service avec l’élève (cf. article 4.48 m) des Exigences détaillées, v. {{date('Y-m-d',strtotime($dateVersion))}})). /
                            <em>The driving school must keep the student's file according to the applicable laws and must not get rid of the student's file before the end of the 5-year-period following the expiration of the student's service contract (see article 4.48 m) of the Detailed Requirements, v. {{date('Y-m-d',strtotime($dateVersion))}}).
                            </em>
                        </strong>
                    </td>
                </tr>
                <!--nom et signature-->
                <tr>
                    <td width="40%" class="sb" style="height:25px">
                    </td>
                    <td class="">
                    </td>
                </tr>
                <tr>
                    <td align="center" class="">
                        Nom et signature du représentant de l’école <br />
                        <em>Name and signature of the school representative</em>
                    </td>
                    <td class="">
                    </td>
                </tr>
                <!--nom et signature parent-->
                <tr>
                    <td class="">
                    </td>
                    <td class="sb" style="height:25px">
                    </td>
                </tr>
                <tr>
                    <td class="">
                    </td>
                    <td align="center" class="">
                        Nom et signature du parent ou du tuteur pour les moins de 18 ans.<br />
                        <em>Name and signature of parent or guardian for those under 18 years old.</em>
                    </td>
                </tr>
                <!--nom et signature-->
                <tr>
                    <td width="40%" class="sb" style="height:25px">
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td align="center" style="padding-bottom:25px">
                        Nom et signature de l’élève /
                        <em>Student’s name and signature</em>
                    </td>
                    <td style="padding-bottom:25px">
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="height: 5px;"></td>
                </tr>
            </table>
        </td>
    </tr>
</table>