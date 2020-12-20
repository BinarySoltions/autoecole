<div id="1pdf"  style="background-color: white;font-family: Arial, Helvetica, sans-serif; font-size:11px;">
<table border="0" >
      <tr><td style="text-align: left;" colspan="3"><img src="{{url('/images/SAAQ_logo.jpg')}}" width="100"/></td></tr>
      <tr>
        <td colspan="3" style="text-align: right;width: 100%;font-size: 11px;margin-bottom: 20px;"><b>{{__('examen.title')}}</b><br/>{{__('examen.subtitle')}}</td>
      </tr>
      <tr><td colspan="3" style="height:20px"></td></tr>
      <tr><td style="text-align: left;width: 150px;padding-left:0px"><b>{{__('examen.test_num')}}</b></td><td  style="text-align: left;"><div style="border-bottom: 1px solid black;width: 400px;height:25px;">{{$examenReponses->numeroTest}}</div></td><td style="width: 100px;"></td></tr>
      <tr><td style="text-align: left;width:150px;"><b>{{__('examen.name')}}</b></td><td style="text-align: left;"><div style="border-bottom: 1px solid black;width: 400px;height:25px;">{{$examenReponses->nomComplet}}</div></td><td style="width: 100px;"></td></tr>
      <tr><td style="text-align: left;width: 150px;"><b>{{__('examen.school')}}</b></td><td style="text-align: left;"><div style="border-bottom: 1px solid black;width: 400px;height:25px;">{{$examenReponses->nomEcole}}</div></td><td style="width: 100px;"></td></tr>
      <tr><td style="text-align: left;width: 150px;"><b>{{__('examen.date')}}</b></td><td style="text-align: left;"><div style="border-bottom: 1px solid black;width: 400px;height:25px;">{{$examenReponses->date}}</div></td><td style="width: 100px;"></td></tr>
      <tr><td colspan="3" style="text-align: left;width: 100%;"><span style="float: left;"><b>{{__('examen.retaking_test')}} </b>
       @if(isset($examenReponses->reprise->uneFois))
       <img src="{{url('/images/checked.png')}}" width="10">
        @else
        <img src="{{url('/images/unchecked.png')}}" width="10">
        @endif
       <span>&nbsp;</span>{{__('examen.first')}}<span> - </span>
       @if(isset($examenReponses->reprise->deuxFois))
       <img src="{{url('/images/checked.png')}}" width="10">
        @else
        <img src="{{url('/images/unchecked.png')}}" width="10">
        @endif
       <span>&nbsp;</span>{{__('examen.second')}}
      </span>
       <span  style="float: right;">  
        <b>{{__('examen.third')}}</b>
        @if(isset($examenReponses->reprise->nFois))
        <img src="{{url('/images/checked.png')}}" width="10">
        @else
        <img src="{{url('/images/unchecked.png')}}" width="10">
        @endif
        <b>{{__('examen.third_suffix')}}</b>&nbsp;&nbsp;</span> 
    </td> 
 </tr> 
    </table>
    <br/>
    <h3><b>{{__('examen.instructions')}}</b></h3>
    <ul>
      <li>{{__('examen.i_one')}}</li>
      <li><span>{!!__('examen.i_two')!!}</span></li>
      <li><span >{!!__('examen.i_three')!!}</span></li>
      <li>{{__('examen.i_four')}}</li>
    </ul>
    <p>{{__('examen.success')}}</p>
  
    <h2><b>{{__('examen.answer_grid')}}</b></h2>
    <table border="1" cellpadding="4">
      <tr>
        <th  style="width: 5%;background-color: white;"></th>
        <th align="center"   style="width: 10%;">A</th>
        <th   align="center"  style="width: 10%;">B</th>
        <th   align="center" style="width: 10%;">C</th>
        <th   align="center" style="width: 10%;">(D)</th>
        <th  style="width: 5%;background-color: white;"></th>
        <th  style="width: 5%;background-color: white;"></th>
        <th  align="center" style="width: 10%;">A</th>
        <th  align="center" style="width: 10%;">B</th>
        <th  align="center" style="width: 10%;">C</th>
        <th  align="center" style="width: 10%;">(D)</th>
      </tr>
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
  </div>