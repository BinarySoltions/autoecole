<?php

namespace App\Http\Middleware;

use Closure;
use App\Eleve;
use Illuminate\Http\RedirectResponse;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
use App\Http\Controllers\EleveController;
use Illuminate\Support\Facades\Auth;

class EnsureTokenIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::guard('api')->check()) {
           
           return $next($request);
        }
        
        $token = json_decode(base64_decode($request->header('X-Header-Public')));
       
        if($token == null){
            return redirect()->action([EleveController::class, 'notvalide']);
        }
        
            //$key32 = env('APP_KEY_OTHER');
            //$encrypter = new Encrypter($key32, 'AES-256-CBC');
            
           // $password  = $token->token;
            $eleve = Eleve::find($token->id);
            if (isset($eleve)){
               // $password_decrypt  = Crypt::decrypt($eleve->password);
                $diff = strtotime(date('Y-m-d H:i:s')) - strtotime($eleve->expire_time);
          
                 if ($diff >= 0 /*|| isset($password) && $password != $password_decrypt*/) {
                     //
                     return redirect('/api/notvalide');
                 }
            }
          
        
        return $next($request);
    }
}
