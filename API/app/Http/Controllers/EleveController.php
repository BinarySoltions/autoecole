<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests;
use App\Services\Eleve\IEleveService;
use App\Services\Eleve\EleveRequete;
use App\Http\Resources\EleveResource;
use App\Http\Resources\ExamenResource;
use App\Eleve;
use App\Adresse;
use App\Coordonnee;
use App\Module;
use App\Examen;
use App\Ecole;
use App\AdresseEcole;
use App\Payement;
use App\ParametreContrat;
use Elibyy\TCPDF\Facades\TCPDF;
use App\MYPDF;
use MYPDF as GlobalMYPDF;

class EleveController extends Controller
{
    protected $serviceEleve;

    public function __construct(IEleveService $eleveService){
        $this->serviceEleve = $eleveService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->serviceEleve->obtenirListeEleves();
    }

    public function partialStudents($limit)
    {
        $dateJour = date('Y-m-d');
        $eleves = Eleve::with('adresse','coordonnee','modules','attestation','examens')
        ->where(function($query) use ($dateJour)
        {
            $query->whereDate('date_fin_permis','>=',$dateJour)
            ->orwhereNull('date_fin_permis');
        })
        ->orWhere(function($query) use ($dateJour)
        {
            $query->whereDate('date_fin_contrat','>=',$dateJour)
            ->orwhereNull('date_fin_contrat');
        })
        ->orderBy('created_at','desc')->take($limit)->get();
        return EleveResource::Collection($eleves);
    }
    public function seulement()
    {
        return $this->serviceEleve->obtenirListeElevesSeulement();
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->serviceEleve->sauvegarderEleve($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $eleves = Eleve::with('adresse','coordonnee','modules.phase')
        ->find($id);
        return  new EleveResource($eleves); 
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $eleve = Eleve::find($id);
        $valid = false;
        if($eleve){
            Eleve::where('id','=',$id)->delete();
            $valid = true;
        }
           
        return response()->json([
            'valid' => $valid
            ]);
    }
    public function export(Request $request)
    {
        if($request)
        {
            $annee = date("Y");
            if($request->trimestre == 1)
            {
                $dateInf = date("Y-m-d",strtotime($annee."-01-01"));
                $dateSup = date("Y-m-d",strtotime($annee."-03-31"));
            } else if($request->trimestre == 2){
                $dateInf = date("Y-m-d",strtotime($annee."-04-01"));
                $dateSup = date("Y-m-d",strtotime($annee."-06-30"));
            } else if($request->trimestre == 3){
                $dateInf = date("Y-m-d",strtotime($annee."-07-01"));
                $dateSup = date("Y-m-d",strtotime($annee."-09-30"));
            } else if($request->trimestre == 4){
                $dateInf = date("Y-m-d",strtotime($annee."-10-01"));
                $dateSup = date("Y-m-d",strtotime($annee."-12-31"));
            }
           

        $eleves = Eleve::leftJoin('adresse', 'eleve.id', '=', 'adresse.eleve_id')
        ->leftJoin('coordonnee', 'eleve.id', '=', 'coordonnee.eleve_id')
        ->leftJoin('attestation', 'eleve.id', '=', 'attestation.eleve_id')
        ->whereDate('date_inscription','<=',$dateSup)
        ->whereDate('date_inscription','>=',$dateInf)
        ->select(DB::raw('DATE_FORMAT(eleve.date_inscription, "%Y-%m-%d") as date_inscription'),
        'eleve.nom','eleve.prenom','adresse.numero as numero_adresse','adresse.rue','adresse.municipalite',
        'adresse.code_postal','eleve.email','coordonnee.telephone',
        DB::raw('DATE_FORMAT(eleve.date_naissance, "%Y-%m-%d") as date_naissance'),'eleve.numero_permis','eleve.numero_contrat as numero_contrat_theorie','eleve.numero_contrat as numero_contrat_pratique','attestation.numero')->get();
        return  new EleveResource($eleves);
        }
        
    }
    public function search($term)
    {
        if(!$term)
            return null;

        $eleves = Eleve::with('adresse','coordonnee','modules','attestation')
        ->where('prenom', 'like', '%' . $term . '%')
        ->orWhere('nom', 'like', '%' . $term . '%')
        ->orderBy('created_at','desc')->get();
        return EleveResource::Collection($eleves);
    }
    public function notify()
    {
        $dateSup = date("Y-m-d",strtotime("120 days"));
        $dateInf = date("Y-m-d");
        $eleves = Eleve::with('adresse','coordonnee','modules','attestation')
        ->where(function($query) use ($dateInf, $dateSup)
        {
            $query->whereDate('date_fin_permis','<=',$dateSup)
            ->whereDate('date_fin_permis','>=',$dateInf);
        })
        ->orWhere(function($query) use ($dateInf, $dateSup)
        {
            $query->whereDate('date_fin_contrat','<=',$dateSup)
            ->whereDate('date_fin_contrat','>=',$dateInf);
        })
        ->orderBy('created_at','desc')->get();
        return EleveResource::Collection($eleves);
    }

    public function pass(Request $request)
    {
       
        if($request){
          $arr_obj = $request->all();
          DB::table('examens')->insert($arr_obj);
            return response()->json([
                'isValid' => true
            ]);
        } else {
            return response()->json([
                'isValid' => false
            ]);
        }
    } 

    public function getTest($id)
    {
        $eleves = Examen::with('eleve')->where('eleve_id','=',$id)->orderBy('created_at','desc')->get();
        
        return  ExamenResource::Collection($eleves);
    }
    
    public function getTestById($id)
    {
        $eleves = Examen::find($id);
        return  new ExamenResource($eleves); 
    }

    public function updateTest(Request $request)
    {
        if($request) {
            $examen = Examen::find($request->id);
            if($examen){
                $examen->resultat = $request->resultat;
                $examen->save();
                return response()->json([
                    'isValid' => true
                ]);
            } else {
                return response()->json([
                    'isValid' => false
                ]);
            }
        } else {
            return response()->json([
                'isValid' => false
            ]);
        }
    }

    public function printPayment(Request $request)
    {
        $eleves = Eleve::with('adresse','coordonnee','payements')
        ->find($request->id);
        $ecole = Ecole::with('adresse')->first();
        $totalPaye = 0;
        $ids = $request->payments;
      
        $payements = $eleves->payements->filter(function ($value, $key) use($ids) {
            return  in_array($value['id'], $ids);
        });

       foreach($payements as $p){
        $totalPaye = $totalPaye + $p->montant;
       }

        $view = View::make('pfacture',
        ['eleve' => $eleves,'ecole' => $ecole,'payementsPDF' => $payements,'totalPaye' => $totalPaye,'dateDuJour' => date('Y-m-d')]);
        $html = $view->render();
       
        $pdf = new TCPDF('P', 'mm', 'LETTER', true, 'UTF-8', false);
        // Set font
            $pdf::SetFont('helvetica', '', 10);
        // Title
        //$pdf::SetHeaderData('/images/logo_pconduite.jpg', 100, 'PDF_HEADER_TITLE', "PDF_HEADER_STRING");
        //$pdf::SetMargins(PDF_MARGIN_LEFT, 0, PDF_MARGIN_RIGHT);
        $pdf::AddPage();
        $pdf::writeHTML($html, true, false, true, false, '');
        $result =  $pdf::Output('hello_world.pdf','E');
        return  $result;
    }

    public function printExam(Request $request)
    {
        $id = $request->id;
        $eleves = Examen::find($id);
        $lang = $eleves->langue;
        if( $lang == "eng"){
            $lang ="en";
        }
            
        App::setLocale($lang);
        $examenReponse = json_decode($eleves->resultat);
        $view = View::make('pExam',
        ['examenReponses' =>  $examenReponse]);
        $html = $view->render();
        if(isset($html)){
            $pdf = new TCPDF('P', 'mm', 'LETTER', true, 'UTF-8', false);
            // Set font
                //$pdf::SetFont('helvetica', '', 10);
            // Title
            //$pdf::SetHeaderData('/images/logo_pconduite.jpg', 100, 'PDF_HEADER_TITLE', "PDF_HEADER_STRING");
            //$pdf::SetMargins(PDF_MARGIN_LEFT, 0, PDF_MARGIN_RIGHT);
            $pdf::AddPage();
            $pdf::writeHTML($html, true, false, true, false, '');
            $result =  $pdf::Output('hello_world.pdf','E');
            return  $result;
        } 
    }

    public function printContrat(Request $request)
    {
        $eleve = Eleve::with('adresse','coordonnee')
        ->find($request->id);
        $ecole = Ecole::with('adresse')->first();
        $parametre_contrat = ParametreContrat::first();
        $dateVersion =  date( "Y-m-d", strtotime( "2019-01-01" ) );
        $view = View::make('contrat.pcontrat',
        ['eleve' =>  $eleve,'ecole'=>$ecole,'parametres'=>$parametre_contrat,'dateVersion'=>$dateVersion]);
        $html = $view->render();
        if(isset($html)){
            $pdf = new TCPDF('P', 'mm', 'LETTER', true, 'UTF-8', false);
            $pdf::setHeaderCallback(function($pdf) {

                $html = '<div><img src="./images/logo_pconduite.jpg"  width="90" alt=""></div>';
                $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
        
            });
            $pdf::setFooterCallback(function($pdf) {
                $dateVersion =  date( "Y-m-d", strtotime( "2019-01-01" ) );
                $html = '<div style="font-size:9px;">Version '.$dateVersion.'</div>';
                $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
        
            });
           // $pdf = new MYPDF('P', 'mm', 'LETTER', true, 'UTF-8', false);
            // Set font
            //$pdf::SetFont('helvetica', '', 9);
            // Title
            //$pdf::setPrintHeader(true);
            //$pdf::setPrintFooter(true);
           
            $pdf::SetMargins(10, 17, 10);
            $pdf::SetHeaderMargin(5);
            $pdf::SetFooterMargin(10);
            //$pdf::SetMargins(PDF_MARGIN_LEFT, 0, PDF_MARGIN_RIGHT);
            $pdf::AddPage();
            $pdf::writeHTML($html, true, false, true, false, '');
            $pdf::lastPage();
            $result =  $pdf::Output('hello_world.pdf','E');
            return  $result;
        } 
    }
}
