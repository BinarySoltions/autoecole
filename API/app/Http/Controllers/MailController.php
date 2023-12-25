<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactEmail;
use App\Mail\NotifReservation;
use App\EvenementEleve;
use App\Eleve;
use App\Ecole;
use App\Payement;
use App\Coordonnee;
use App\Mail\NotifFinDossier;
use App\Mail\NotifLoginPWD;
use App\Mail\NotifPayement;
use App\Mail\NotifFacture;
use Illuminate\Encryption\Encrypter;

class MailController extends Controller
{
    //
    public function emailInfo(Request $request)
    {

        if (isset($request)) {
            $data = [
                'email' => $request->email,
                'nom' => $request->nom,
                'sujet' => $request->sujet,
                'message' => $request->message
            ];
            Mail::to('autoecolepconduite@gmail.com', 'Information')
                ->send(new ContactEmail($data));
            echo "HTML Email Sent. Check your inbox.";
        }
    }

    public function emailReservations()
    {

        $this->emailReservation();
    }
    public function emailNotification()
    {
        $this->emailReservation();
        $this->emailEndOfDossier();
        $this->emailStopPayment();
    }
    public function emailReservation()
    {

        $dateStart = date('Y-m-d', strtotime(' + 3 days'));
        $dateEnd = date('Y-m-d', strtotime(' + 4 days'));

        $eleves = EvenementEleve::distinct()
            ->select(
                'evenement_eleve.date',
                'evenement_eleve.heure_debut',
                'evenement_eleve.heure_fin',
                'eleve.prenom',
                'eleve.nom',
                'eleve.email',
                'evenement_eleve.nom_module',
                'eleve.id'
            )
            ->leftJoin('eleve', function ($join) {
                $join->on('eleve.id', '=', 'evenement_eleve.eleve_id');
            })
            ->whereDate('evenement_eleve.date', '>=', $dateStart)
            ->whereDate('evenement_eleve.date', '<', $dateEnd)
            ->orderBy('date', 'asc')
            ->orderBy('heure_debut', 'asc')
            ->get();


        if (isset($eleves)) {
            $allId = $eleves->map(function ($ele) {
                return $ele->id;
            });

            $allId = array_unique($allId->all(), SORT_REGULAR);
            echo "Send email reservation start\r\n";
            foreach ($allId as $id) {

                $data = $eleves->filter(function ($e) use ($id) {
                    return $e->id == $id;
                });
                Mail::to($data->first()->email, 'Information')
                    ->send(new NotifReservation($data));
                echo "Email to: ".$data->first()->nom." ".$data->first()->prenom."\r\n";
            }
            echo "Send email reservation end\r\n";
        }
    }

    public function emailEndOfDossier()
    {
        $dateSup = date("Y-m-d", strtotime("120 days"));
        $dateInf = date("Y-m-d", strtotime("119 days"));
        $eleves = Eleve::where(function ($query) use ($dateInf, $dateSup) {
            $query->whereDate('date_fin_permis', '<=', $dateSup)
                ->whereDate('date_fin_permis', '>', $dateInf);
        })
            ->orWhere(function ($query) use ($dateInf, $dateSup) {
                $query->whereDate('date_fin_contrat', '<=', $dateSup)
                    ->whereDate('date_fin_contrat', '>', $dateInf);
            })
            ->orderBy('created_at', 'desc')->get();
        if (isset($eleves)) {
            echo "Send email contract start\r\n";
            foreach ($eleves as $data) {
                Mail::to($data->email, 'Information')
                    ->send(new NotifFinDossier($data));
                echo "Email to: ".$data->nom." ".$data->prenom."\r\n";
            }
            echo "Send email contract end\r\n";
        }
    }

    public function emailStopPayment()
    {
        $dateSup = date("Y-m-d", strtotime("+1 day"));
        $dateInf = date("Y-m-d", strtotime("-1 day"));
        $eleves = Eleve::where(function ($query) use ($dateInf, $dateSup) {
            $query->whereDate('date_rappel_payement', '<', $dateSup)
                ->whereDate('date_rappel_payement', '>', $dateInf);
        })
            ->orderBy('created_at', 'desc')->get();
        if (isset($eleves)) {
            echo "Send email payment start\r\n";
            foreach ($eleves as $data) {
                Mail::to($data->email, 'Information')
                    ->send(new NotifPayement($data));
                echo "Email to: ".$data->nom." ".$data->prenom."\r\n";
            }
            echo "Send email payment end\r\n";
        }
    }

    function emailPassword(Request $request)
    {
        $nom = strtolower($request->nom);
        $eleve = Eleve::where('numero_contrat', '=', trim($request->numero))
            ->whereRaw('lower(nom) like (?)', ["%{$nom}%"])
            ->where('eleve.deleted_at','=',null)
            ->first();
    if(!isset($eleve)){
        return response()->json([
            'isValid' => false
        ]);
    }
    try{
        //$key32 = env('APP_KEY_OTHER');
       // $encrypter = new Encrypter($key32, 'AES-256-CBC');
        if(isset($eleve) && $eleve->password_default == null){

            $password = $this->randomPassword();
            $encrypt_password  = Crypt::encrypt($password);
            $eleve->password = $encrypt_password;
            $eleve->password_default = $password;
        }else {
            $encrypt_password  =  Crypt::encrypt($eleve->password_default);
            $eleve->password =  $encrypt_password;
        }


        $eleve->save();

        Mail::to($eleve->email,'Information')
        ->send(new NotifLoginPWD($eleve));
        return response()->json([
            'isValid' => true
        ]);
    }catch(DecryptException $e){
        return response()->json([
            'isValid' => false
        ]);
    }
    }

    function decrypt($ivHashCiphertext, $password)
    {
        $method = "AES-256-CBC";
        $iv = substr($ivHashCiphertext, 0, 16);
        $hash = substr($ivHashCiphertext, 16, 32);
        $ciphertext = substr($ivHashCiphertext, 48);
        $key = hash('sha256', $password, true);

        if (!hash_equals(hash_hmac('sha256', $ciphertext . $iv, $key, true), $hash)) return null;

        return openssl_decrypt($ciphertext, $method, $key, OPENSSL_RAW_DATA, $iv);
    }

    function randomPassword()
    {
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < 8; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass); //turn the array into a string
    }


    public function sendBillPayment(Request $request)
    {

        if ($request->facturePerso) {
            $payement = new Payement();
            $payement->montant = $request->montant;
            $payement->eleve_id = 0;
            $payement->type =  $request->type;
            $payement->date_payement =  $request->date_payement;
            $payement->detail = $request->detail;

            $payement->save();

            $payements = Payement::where('id', '=', $payement->id)->get();

            $eleve = new Eleve();
            $detail = json_decode($request->detail, false);

            $eleve->prenom = $detail->prenom;
            $eleve->nom = $detail->nom;
            $eleve->coordonnee = new Coordonnee;
            $eleve->coordonnee->telephone = $detail->telephone;
            $description = $detail->description;

            $ecole = Ecole::with('adresse')->first();
            $totalPaye = 0;

            foreach ($payements as $p) {
                $totalPaye = $totalPaye + $p->montant;
            }

            $data = [
                    'eleve' => $eleve, 'ecole' => $ecole,
                    'payementsPDF' => $payements, 'totalPaye' => $totalPaye, 'dateDuJour' => date('Y-m-d'),
                    'description' => $description
                ];
                if(isset($request->email)){
                    $email = $request->email;
                }
                Mail::to($email, 'Facture / Bill')
                ->send(new NotifFacture($data));
            echo "Veuillez vérifier votre courriel, la facture a été envoyée / Please check your email, the invoice has been sent";
        } else {
            $eleves = Eleve::with('adresse', 'coordonnee', 'payements')
                ->find($request->id);
            $ecole = Ecole::with('adresse')->first();
            $totalPaye = 0;
            $ids = $request->payments;

            $payements = $eleves->payements->filter(function ($value, $key) use ($ids) {
                return  in_array($value['id'], $ids);
            });

            foreach ($payements as $p) {
                $totalPaye = $totalPaye + $p->montant;
            }
            if(isset($request->email)){
                $email = $request->email;
            }else{
                $email = $eleves->email;
            }
            $data = ['eleve' => $eleves, 'ecole' => $ecole, 'payementsPDF' => $payements, 'totalPaye' => $totalPaye, 'dateDuJour' => date('Y-m-d')];

            Mail::to($email, 'Facture / Bill')
                ->send(new NotifFacture($data));
            echo "Veuillez vérifier votre courriel, la facture a été envoyée / Please check your email, the invoice has been sent";
        }
    }
}
