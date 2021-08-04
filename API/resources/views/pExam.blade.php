<style>
    .sb {
        border-bottom: 1px solid black;
        border-image: url('<?php echo url('/images/droite.png');?>');
    }

    .s {
        border: 1px solid black;
        border-image: url('<?php echo url('/images/unchecked.png');?>');
    }

    .sr {
        border-right: 1px solid black;
        border-image: url('<?php echo url('/images/droite.png');?>');
    }

    table.pad tr td {
        padding-top: 8px;
        padding-bottom: 8px;
    }
</style>
<div id="1pdf" style="background-color: white;font-family: Arial, Helvetica, sans-serif; font-size:11px;">
    <table border="0">
        <tr>
            <td style="text-align: left;" colspan="3"><img src="{{url('/images/SAAQ_logo.jpg')}}" width="100" /></td>
        </tr>
        <tr>
            <td colspan="3" style="text-align: right;width: 100%;font-size: 11px;margin-bottom: 20px;"><b>{{__('examen.title')}}</b><br />{{__('examen.subtitle')}}</td>
        </tr>
        <tr>
            <td colspan="3" style="height:20px"></td>
        </tr>
    </table>
    <table border="0" cellpadding="2">
        <tr>
            <td style="text-align: left;width: 170px;padding-left:0px"><b>{{__('examen.test_num')}}</b></td>
            <td style="text-align: left;width: 350px;" class="sb">
                {{$examenReponses->numeroTest}}
            </td>
            <td style="width: 100px;"></td>
        </tr>
        <tr>
            <td style="text-align: left;width:170px;"><b>{{__('examen.name')}}</b></td>
            <td style="text-align: left;width: 350px;" class="sb">
                {{$examenReponses->nomComplet}}
            </td>
            <td style="width: 100px;"></td>
        </tr>
        <tr>
            <td style="text-align: left;width: 170px;"><b>{{__('examen.school')}}</b></td>
            <td style="text-align: left;width: 350px;" class="sb">
                {{$examenReponses->nomEcole}}
            </td>
            <td style="width: 100px;"></td>
        </tr>
        <tr>
            <td style="text-align: left;width: 170px;"><b>{{__('examen.date')}}</b></td>
            <td style="text-align: left;width: 350px;" class="sb">
                {{$examenReponses->date}}
            </td>
            <td style="width: 100px;"></td>
        </tr>
        <tr>
            <td colspan="3" style="height: 10px;"></td>
        </tr>
        <tr>
            <td colspan="3" style="text-align: left;width: 100%;"><span style="float: left;"><b>{{__('examen.retaking_test')}} </b>
                    @if(isset($examenReponses->reprise->uneFois) && $examenReponses->reprise->uneFois === TRUE)
                    <img src="{{url('/images/checked.png')}}" width="10">
                    @else
                    <img src="{{url('/images/unchecked.png')}}" width="10">
                    @endif
                    <span>&nbsp;</span>{{__('examen.first')}}<span> - </span>
                    @if(isset($examenReponses->reprise->deuxFois) && $examenReponses->reprise->deuxFois === TRUE)
                    <img src="{{url('/images/checked.png')}}" width="10">
                    @else
                    <img src="{{url('/images/unchecked.png')}}" width="10">
                    @endif
                    <span>&nbsp;</span>{{__('examen.second')}}
                </span>
                <span style="float: right;">
                    <b>{{__('examen.third')}}</b>
                    @if(isset($examenReponses->reprise->nFois))
                    <span class="sb" style="width: 10px;">{{$examenReponses->reprise->nFois}}</span>
                    @else
                         
                    @endif
                    <b>{{__('examen.third_suffix')}}</b>&nbsp;&nbsp;</span>
            </td>
        </tr>
    </table>
    <table border="0" cellpadding="2">
        <tr>
            <td>
                <h3><b>{{__('examen.instructions')}}</b></h3>
                <ul>
                    <li>{{__('examen.i_one')}}</li>
                    <li><span>{!!__('examen.i_two')!!}</span></li>
                    <li><span>{!!__('examen.i_three')!!}</span></li>
                    <li>{{__('examen.i_four')}}</li>
                </ul>
                <p>{{__('examen.success')}}</p>
            </td>
        </tr>
        <tr>
            <td style="height: 5px;"></td>
        </tr>
        <tr>
            <td><h2><b>{{__('examen.answer_grid')}}</b></h2>
                <table border="0" cellpadding="5">
                    <tr>
                        <th class="sb sr" style="width: 5%;background-color: white;"></th>
                        <th class="s" align="center" style="font-weight:bolder;width: 10%;background-color: rgb(236, 234, 234);">A</th>
                        <th class="s" align="center" style="font-weight:bolder;width: 10%;background-color: rgb(236, 234, 234);">B</th>
                        <th class="s" align="center" style="font-weight:bolder;width: 10%;background-color: rgb(236, 234, 234);">C</th>
                        <th class="s" align="center" style="font-weight:bolder;width: 10%;background-color: rgb(236, 234, 234);">(D)</th>
                        <th class="sb" style="width: 5%;background-color: white;"></th>
                        <th class="sb sr" style="width: 5%;background-color: white;"></th>
                        <th class="s" align="center" style="font-weight:bolder;width: 10%;background-color: rgb(236, 234, 234);">A</th>
                        <th class="s" align="center" style="font-weight:bolder;width: 10%;background-color: rgb(236, 234, 234);">B</th>
                        <th class="s" align="center" style="font-weight:bolder;width: 10%;background-color: rgb(236, 234, 234);">C</th>
                        <th class="s" align="center" style="font-weight:bolder;width: 10%;background-color: rgb(236, 234, 234);">(D)</th>
                    </tr>
                </table>
                <table border="0" cellpadding="5">
                    <!-- <tr>
            <th style="width: 5%;background-color: white;"></th>
            <th align="center" style="width: 10%;"></th>
            <th align="center" style="width: 10%;"></th>
            <th align="center" style="width: 10%;"></th>
            <th align="center" style="width: 10%;"></th>
            <th style="width: 5%;background-color: white;"></th>
            <th style="width: 5%;background-color: white;"></th>
            <th align="center" style="width: 10%;"></th>
            <th align="center" style="width: 10%;"></th>
            <th align="center" style="width: 10%;"></th>
            <th align="center" style="width: 10%;"></th>
        </tr> -->
                    <tr>
                        @include('row',['number'=>array("1","13"),'reponse'=>$examenReponses->q1,'reponsePlus'=>$examenReponses->q13])
                    </tr>
                    <!-- ligne 2 -->
                    <tr>
                        @include('row',['number'=>array("2","14"),'reponse'=>$examenReponses->q2,'reponsePlus'=>$examenReponses->q14])
                    </tr>
                    <!-- ligne 3 -->
                    <tr>
                        @include('row',['number'=>array("3","15"),'reponse'=>$examenReponses->q3,'reponsePlus'=>$examenReponses->q15])
                    </tr>
                    <!-- ligne 4 -->
                    <tr>
                        @include('row',['number'=>array("4","16"),'reponse'=>$examenReponses->q4,'reponsePlus'=>$examenReponses->q16])
                    </tr>
                    <!-- ligne 5 -->
                    <tr>
                        @include('row',['number'=>array("5","17"),'reponse'=>$examenReponses->q5,'reponsePlus'=>$examenReponses->q17])
                    </tr>
                    <!-- ligne 6 -->
                    <tr>
                        @include('row',['number'=>array("6","18"),'reponse'=>$examenReponses->q6,'reponsePlus'=>$examenReponses->q18])
                    </tr>
                    <!-- ligne 7 -->
                    <tr>
                        @include('row',['number'=>array("7","19"),'reponse'=>$examenReponses->q7,'reponsePlus'=>$examenReponses->q19])
                    </tr>
                    <!-- ligne 8 -->
                    <tr>
                        @include('row',['number'=>array("8","20"),'reponse'=>$examenReponses->q8,'reponsePlus'=>$examenReponses->q20])
                    </tr>
                    <!-- ligne 9 -->
                    <tr>
                        @include('row',['number'=>array("9","21"),'reponse'=>$examenReponses->q9,'reponsePlus'=>$examenReponses->q21])
                    </tr>
                    <!-- ligne 10 -->
                    <tr>
                        @include('row',['number'=>array("10","22"),'reponse'=>$examenReponses->q10,'reponsePlus'=>$examenReponses->q22])
                    </tr>
                    <!-- ligne 11 -->
                    <tr>
                        @include('row',['number'=>array("11","23"),'reponse'=>$examenReponses->q11,'reponsePlus'=>$examenReponses->q23])
                    </tr>
                    <!-- ligne 12 -->
                    <tr>
                        @include('row',['number'=>array("12","24"),'reponse'=>$examenReponses->q12,'reponsePlus'=>$examenReponses->q24])
                    </tr>
                </table>
            </td>
        </tr>
    </table>


</div>