<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactEmail;

class MailController extends Controller
{
    //
    public function emailInfo(Request $request) {
        
        $data = ['email'=>$request->email,
        'nom'=>$request->nom,
        'sujet'=>$request->sujet,
        'message'=>$request->message];
       Mail::to('autoecolepconduite@gmail.com','Information')
       ->send(new ContactEmail($data)); 
        echo "HTML Email Sent. Check your inbox.";
     }
}
