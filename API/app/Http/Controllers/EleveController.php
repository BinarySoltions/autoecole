<?php

namespace App\Http\Controllers;

use Illuminate\Encryption\Encrypter;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
use Exception;
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
use App\Http\Resources\EvenementEleveResource;
use App\Http\Resources\EvenementResource;
use App\Eleve;
use App\Adresse;
use App\Coordonnee;
use App\Module;
use App\Examen;
use App\Ecole;
use App\EleveModule;
use App\AdresseEcole;
use App\Payement;
use App\ParametreContrat;
use App\Attestation;
use App\Evenement;
use App\PersonneResponsable;
use App\EvenementEleve;
use Elibyy\TCPDF\Facades\TCPDF;
use App\MYPDF;

use Plivo\RestClient;

class EleveController extends Controller
{
    protected $serviceEleve;

    public function __construct(IEleveService $eleveService)
    {
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

    public function notvalide()
    {
        return  response()->json([
            'valid' => false,
            'isValid' => false
        ],401)
        ->header('X-Header-Public', 'error');
    }
    public function partialStudents($limit)
    {
        $dateJour = date('Y-m-d');
        $eleves = Eleve::with('adresse', 'coordonnee', 'modules', 'attestation', 'examens')
            ->where(function ($query) use ($dateJour) {
                $query->whereDate('date_fin_permis', '>=', $dateJour)
                    ->orwhereNull('date_fin_permis');
            })
            ->orWhere(function ($query) use ($dateJour) {
                $query->whereDate('date_fin_contrat', '>=', $dateJour)
                    ->orwhereNull('date_fin_contrat');
            })
            ->orderBy('created_at', 'desc')->take($limit)->get();
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
        $eleves = Eleve::with('adresse', 'coordonnee', 'modules.phase')
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
        if ($eleve) {
            Eleve::where('id', '=', $id)->delete();
            $valid = true;
        }

        return response()->json([
            'valid' => $valid
        ]);
    }
    public function export(Request $request)
    {
        if ($request) {
            $annee = date("Y");
            //$annee = date("Y",strtotime('-1 year'));
            if ($request->trimestre == 1) {
                $dateInf = date("Y-m-d", strtotime($annee . "-01-01"));
                $dateSup = date("Y-m-d", strtotime($annee . "-03-31"));
            } else if ($request->trimestre == 2) {
                $dateInf = date("Y-m-d", strtotime($annee . "-04-01"));
                $dateSup = date("Y-m-d", strtotime($annee . "-06-30"));
            } else if ($request->trimestre == 3) {
                $dateInf = date("Y-m-d", strtotime($annee . "-07-01"));
                $dateSup = date("Y-m-d", strtotime($annee . "-09-30"));
            } else if ($request->trimestre == 4) {
                $dateInf = date("Y-m-d", strtotime($annee . "-10-01"));
                $dateSup = date("Y-m-d", strtotime($annee . "-12-31"));
            }


            $eleves = Eleve::leftJoin('adresse', 'eleve.id', '=', 'adresse.eleve_id')
                ->leftJoin('coordonnee', 'eleve.id', '=', 'coordonnee.eleve_id')
                ->leftJoin('attestation', 'eleve.id', '=', 'attestation.eleve_id')
                ->whereDate('date_inscription', '<=', $dateSup)
                ->whereDate('date_inscription', '>=', $dateInf)
                ->select(
                    DB::raw('DATE_FORMAT(eleve.date_inscription, "%Y-%m-%d") as date_inscription'),
                    'eleve.nom',
                    'eleve.prenom',
                    'adresse.numero as numero_adresse',
                    'adresse.rue',
                    'adresse.municipalite',
                    'adresse.code_postal',
                    'eleve.email',
                    'coordonnee.telephone',
                    DB::raw('DATE_FORMAT(eleve.date_naissance, "%Y-%m-%d") as date_naissance'),
                    'eleve.numero_permis',
                    'eleve.numero_contrat as numero_contrat_theorie',
                    'eleve.numero_contrat as numero_contrat_pratique',
                    'attestation.numero'
                )->get();
            return  new EleveResource($eleves);
        }
    }
    public function search($term)
    {
        if (!$term)
            return null;

        $eleves = Eleve::with('adresse', 'coordonnee', 'modules', 'attestation')
            ->where('prenom', 'like', '%' . $term . '%')
            ->orWhere('nom', 'like', '%' . $term . '%')
            ->orderBy('created_at', 'desc')->get();
        return EleveResource::Collection($eleves);
    }
    public function notify()
    {
        $dateSup = date("Y-m-d", strtotime("120 days"));
        $dateInf = date("Y-m-d");
        $eleves = Eleve::with('adresse', 'coordonnee', 'modules', 'attestation')
            ->where(function ($query) use ($dateInf, $dateSup) {
                $query->whereDate('date_fin_permis', '<=', $dateSup)
                    ->whereDate('date_fin_permis', '>=', $dateInf);
            })
            ->orWhere(function ($query) use ($dateInf, $dateSup) {
                $query->whereDate('date_fin_contrat', '<=', $dateSup)
                    ->whereDate('date_fin_contrat', '>=', $dateInf);
            })
            ->orderBy('created_at', 'desc')->get();
        return EleveResource::Collection($eleves);
    }

    public function pass(Request $request)
    {

        if ($request) {
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
        $eleves = Examen::with('eleve')->where('eleve_id', '=', $id)->orderBy('created_at', 'desc')->get();

        return  ExamenResource::Collection($eleves);
    }

    public function getTestById($id)
    {
        $eleves = Examen::find($id);
        return  new ExamenResource($eleves);
    }

    public function updateTest(Request $request)
    {
        if ($request) {
            $examen = Examen::find($request->id);
            if ($examen) {
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

        // $client = new RestClient("MAYJHMOTDIOGMYMZLKZM", "OWNiZTIxNWZmZmFkYjQ5ODE1NGJhNWM3MTQ0MjI2");
        // //$client->setHttpClient($http);
        // $response = $client->messages->create(
        //     '5147084568', 
        //     ['4388282886'],
        //     'Hello, this is a sample text'
        // );
        // print_r($response);
        // // Prints only the message_uuid
        // print_r($response->getmessageUuid(0));
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

        $view = View::make(
            'pfacture',
            ['eleve' => $eleves, 'ecole' => $ecole, 'payementsPDF' => $payements, 'totalPaye' => $totalPaye, 'dateDuJour' => date('Y-m-d')]
        );
        $html = $view->render();

        $pdf = new TCPDF('P', 'mm', 'LETTER', true, 'UTF-8', false);
        // Set font
        $pdf::SetFont('helvetica', '', 10);
        // Title
        //$pdf::SetHeaderData('/images/logo_pconduite.jpg', 100, 'PDF_HEADER_TITLE', "PDF_HEADER_STRING");
        //$pdf::SetMargins(PDF_MARGIN_LEFT, 0, PDF_MARGIN_RIGHT);
        $pdf::AddPage();
        $pdf::writeHTML($html, true, false, true, false, '');
        $result =  $pdf::Output('hello_world.pdf', 'E');
        return  $result;
    }

    public function printExam(Request $request)
    {
        $id = $request->id;
        $eleves = Examen::find($id);
        $lang = $eleves->langue;
        if ($lang == "eng") {
            $lang = "en";
        }

        App::setLocale($lang);
        $examenReponse = json_decode($eleves->resultat);
        $view = View::make(
            'pExam',
            ['examenReponses' =>  $examenReponse]
        );
        $html = $view->render();
        if (isset($html)) {
            $pdf = new TCPDF('P', 'mm', 'LETTER', true, 'UTF-8', false);
            // Set font
            //$pdf::SetFont('helvetica', '', 10);
            // Title
            //$pdf::SetHeaderData('/images/logo_pconduite.jpg', 100, 'PDF_HEADER_TITLE', "PDF_HEADER_STRING");
            //$pdf::SetMargins(PDF_MARGIN_LEFT, 0, PDF_MARGIN_RIGHT);
            $pdf::AddPage();
            $pdf::writeHTML($html, true, false, true, false, '');
            $result =  $pdf::Output('hello_world.pdf', 'E');
            return  $result;
        }
    }

    public function printContrat(Request $request)
    {
        $eleve = Eleve::with('adresse', 'coordonnee')
            ->find($request->id);
        $ecole = Ecole::with('adresse')->first();
        $parametre_contrat = ParametreContrat::first();
        $dateVersion =  date("Y-m-d", strtotime("2019-01-01"));
        $view = View::make(
            'contrat.pOneContrat',
            [
                'eleve' =>  $eleve, 'ecole' => $ecole,
                'parametres' => $parametre_contrat,
                'dateVersion' => $dateVersion, 'nbTheorique' => $request->heureTheorique, 'nbPratique' => $request->heurePratique
            ]
        );
        $html = $view->render();
        if (isset($html)) {
            $pdf = new TCPDF('P', 'mm', 'LETTER', true, 'UTF-8', false);
            $numero = $eleve->numero_contrat;
            $pdf::setHeaderCallback(function ($pdf) use ($numero) {

                $html = '<style>.sb {
                    border-bottom: 1px solid black;
                    border-image: url("/images/droite.png");
                  }</style><table class="w-100" style="font-size:7px"><tr><td style="width:10px"></td>
                  <td style="width:98%"><table><tr><td class="w-100 sb" style="width:100%">No de contrat / <em>Contract no. :</em>' . $numero . '</td></tr></table></td>
                  </tr>
</table>';
                $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
            });
            $pdf::setFooterCallback(function ($pdf) {
                $dateVersion =  date("Y-m-d", strtotime("2019-01-01"));
                $html = '<table class="w-100" style="font-size:7px"><tr><td style="width:10px"></td>
                <td style="width:98%"><table><tr><td class="w-100 sb" style="width:100%">Version ' . $dateVersion . '</td></tr></table></td>
                </tr>
</table>';
                $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
            });
            // $pdf = new MYPDF('P', 'mm', 'LETTER', true, 'UTF-8', false);
            // Set font
            //$pdf::SetFont('helvetica', '', 9);
            // Title
            //$pdf::setPrintHeader(true);
            //$pdf::setPrintFooter(true);

            $pdf::SetMargins(10, 11, 10);
            $pdf::SetHeaderMargin(5);
            $pdf::SetFooterMargin(10);
            $pdf::SetAutoPageBreak(TRUE, 5);
            //$pdf::SetMargins(PDF_MARGIN_LEFT, 0, PDF_MARGIN_RIGHT);
            $pdf::AddPage();
            $pdf::writeHTML($html, true, false, true, false, '');
            //$pdf::lastPage();

            $view = View::make(
                'contrat.pTwoContrat',
                [
                    'eleve' =>  $eleve, 'ecole' => $ecole,
                    'parametres' => $parametre_contrat,
                    'dateVersion' => $dateVersion, 'nbTheorique' => $request->heureTheorique, 'nbPratique' => $request->heurePratique
                ]
            );
            $html = $view->render();
            $pdf::AddPage();
            $pdf::writeHTML($html, true, false, true, false, '');

            $view = View::make(
                'contrat.pcontrat',
                [
                    'eleve' =>  $eleve, 'ecole' => $ecole,
                    'parametres' => $parametre_contrat,
                    'dateVersion' => $dateVersion, 'nbTheorique' => $request->heureTheorique, 'nbPratique' => $request->heurePratique
                ]
            );
            $html = $view->render();
            $pdf::AddPage();
            $pdf::writeHTML($html, true, false, true, false, '');
            $pdf::lastPage();
            $result =  $pdf::Output('hello_world.pdf', 'E');
            return  $result;
        }
    }

    public function printAttestation(Request $request)
    {
        $eleve = Eleve::with('adresse', 'coordonnee', 'modules')
            ->find($request->id);
        $isAll = $request->copie;
        $ecole = Ecole::with('adresse')->first();
        $attestation = Attestation::where('eleve_id', '=', $request->id)->first();
        $personnes = PersonneResponsable::orderBy('created_at', 'desc')->get();
        $pdf = new TCPDF('P', 'mm', 'LETTER', true, 'UTF-8', false);
        $numero = $attestation->numero;
        define('K_TCPDF_CALLS_IN_HTML', true);
        $params = $pdf::serializeTCPDFtagParameters(array($numero, 'C128C', '', '', '', 8, 0.50, array('position' => 'C', 'border' => false, 'padding' => 1, 'fgcolor' => array(0, 0, 0), 'bgcolor' => array(255, 255, 255), 'text' => false, 'font' => 'helvetica', 'fontsize' => 7), 'N'));
        $view = View::make(
            'attestation.pattestation',
            ['eleve' =>  $eleve, 'ecole' => $ecole, 'params' => $params, 'attestation' => $attestation, 'personnes' => $personnes, 'isAll' => !$isAll]
        );
        $html = $view->render();
        if (isset($html)) {

            $pdf::setHeaderCallback(function ($pdf) use ($numero) {

                $html = '<table class="w-100" style="font-size:7px" cellpadding="2"><tr><td style="width:2%">  </td><td><img src="' . url('/images/logo_pconduite.jpg') . '" width="110" /></td>
                  <td style="width:72%;text-align:right;"><table><tr><td class="w-100"  style="text-align:right;font-weight:bold;font-size:14px">
                  Attestation de cours de conduite<br />pour la classe 5</td></tr></table></td>
                  <td style="width:2%">  </td>
                  </tr>
</table>';
                $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
            });
            $pdf::SetMargins(5, 20, 5);
            $pdf::SetHeaderMargin(5);
            $pdf::SetFooterMargin(7);
            $pdf::SetAutoPageBreak(TRUE, 5);
            if ($isAll) {
                $copie = '';
                $pdf::AddPage();
                $pdf::writeHTML($html, true, false, true, false, '');
            }

            if (!$isAll) {
                $pdf::AddPage();
                $copie =  "COPIE DU DÉLÉGATAIRE";
                $pdf::setFooterCallback(function ($pdf) use ($copie) {

                    $html = '<table class="w-100" style="font-size:7px;font-weight:bolder"><tr>
                    <td align="center">Formulaire prescrit par l\'AQTr pour la réussite du cours de conduite dans une école reconnue.<br/><span style="color:red">' . $copie . '</span></td>
                    </tr>
    </table>';
                    $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
                });

                $pdf::writeHTML($html, true, false, true, false, '');

                $pdf::AddPage();
                $copie =  "COPIE DE l'école";
                $pdf::setFooterCallback(function ($pdf) use ($copie) {

                    $html = '<table class="w-100" style="font-size:7px;font-weight:bolder"><tr>
                   <td align="center">Formulaire prescrit par l\'AQTr pour la réussite du cours de conduite dans une école reconnue.<br/><span style="color:red">' . $copie . '</span></td>
                   </tr>
   </table>';
                    $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
                });

                $pdf::writeHTML($html, true, false, true, false, '');
                $pdf::AddPage();
                $copie =  "COPIE DE l'élève";
                $pdf::setFooterCallback(function ($pdf) use ($copie) {

                    $html = '<table class="w-100" style="font-size:7px;font-weight:bolder"><tr>
                    <td align="center">Formulaire prescrit par l\'AQTr pour la réussite du cours de conduite dans une école reconnue.<br/><span style="color:red">' . $copie . '</span></td>
                    </tr>
    </table>';
                    $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
                });

                $pdf::writeHTML($html, true, false, true, false, '');
            }

            $pdf::lastPage();
            $result =  $pdf::Output('hello_world.pdf', 'E');
            return  $result;
        }
    }

    public function saveEvent(Request $request)
    {

        try {
            if (!isset($request->date)) {
                return response()->json([
                    'isValid' => false
                ]);
            }
            
            $dateSup = date("Y-m-d");
            //$dateInf = date("Y-m-d");
            $eleves = Eleve::where('id', '=', $request->eleve_id)
                ->where(function ($query) use ($dateSup) {
                    $query->whereDate('date_fin_contrat', '<=', $dateSup)
                        ->orWhereDate('date_fin_permis', '<=', $dateSup)
                        ->orWhere('date_rappel_payement', '!=', null);
                })
                ->first();

                if (isset($eleves)) {
                    return response()->json([
                        'isValid' => false
                    ]);
                }
            $event = new EvenementEleve;
            $event->numero = $request->numero;
            $event->eleve_id = $request->eleve_id;
            $event->nom_module = $request->nom_module;
            $event->module_id = $request->module_id;
            $event->place = $request->place;
            $event->date = date('Y-m-d', strtotime($request->date));
            $event->heure_debut = date('H:i', strtotime($request->heure_debut));
            $event->heure_fin = date('H:i', strtotime($request->heure_fin));

            $events = EvenementEleve::distinct()
                ->select(
                    'evenement_eleve.date',
                    'evenement_eleve.heure_debut',
                    'evenement_eleve.heure_fin',
                    'evenement.places',
                    DB::raw('count(*) as place')
                )
                ->leftJoin('evenement', function ($join) {
                    $join->on('evenement.date', '=', 'evenement_eleve.date');
                    $join->on('evenement.heure_debut', '=', 'evenement_eleve.heure_debut');
                    $join->on('evenement.heure_fin', '=', 'evenement_eleve.heure_fin');
                })
                ->groupBy(
                    'evenement_eleve.date',
                    'evenement_eleve.heure_debut',
                    'evenement_eleve.heure_fin',
                    'evenement.places'
                )
                ->whereDate('evenement_eleve.date', '=', $event->date)
                ->where('evenement_eleve.heure_debut', '=', $event->heure_debut)
                ->where('evenement_eleve.heure_fin', '=', $event->heure_fin)->first();
            $evtEle = 0;
            $erreur = false;
           
            if (isset($events)) {
                if ($events->place < $events->places) {
                    $event->place =  $events->place + 1;
                    $event->save();
                } else {
                    $erreur = true;
                }
            } else {
                $event->place =  1;
                $event->save();
            }

            if ($erreur) {
                return response()->json([
                    'isValid' => false
                ]);
            }
            $events = EvenementEleve::where('numero', '=', $request->numero)
                ->orderBy('created_at', 'desc')
                ->get();
            $coll =  EvenementEleveResource::Collection($events);
            return response()->json([
                'isValid' => true,
                'data' => $coll
            ]);
        } catch (Exception $e) {
            if (strpos($e, '1062 Duplicate entry') !== false) {
                return response()->json([
                    'isValid' => false
                ]);
            }
            return $e;
        }
    }

    public function savePlaces(Request $requests)
    {
        try {
            $data = [];
            $result = $requests->all();

            foreach ($result as $request) {
                array_push($data, [
                    'places' => $request['places'],
                    'date' => date('Y-m-d', strtotime($request['date'])),
                    'heure_debut' => date('H:i', strtotime($request['heure_debut'])),
                    'heure_fin' => date('H:i', strtotime($request['heure_fin']))
                ]);
            }

            Evenement::insert($data);
            return response()->json([
                'isValid' => true
            ]);
        } catch (Exception $e) {
            return $e;
            // return response()->json([
            //     'isValid' => false
            // ]);
        }
    }

    function getDatesHeures(Request $request)
    {
        $dateEnd = date('Y-m-d', strtotime($request->dateEnd));
        $dateStart = date('Y-m-d', strtotime($request->dateStart));
        $events = Evenement::distinct()
            ->select(
                'evenement.date',
                'evenement.heure_debut',
                'evenement.heure_fin',
                'evenement.places',
                'evenement_eleve.place'
            )
            ->leftJoin('evenement_eleve', function ($join) {
                $join->on('evenement.date', '=', 'evenement_eleve.date');
                $join->on('evenement.heure_debut', '=', 'evenement_eleve.heure_debut');
                $join->on('evenement.heure_fin', '=', 'evenement_eleve.heure_fin');
                $join->on('evenement.places', '=', 'evenement_eleve.place');
            })
            ->whereDate('evenement.date', '>=', $dateStart)
            ->whereDate('evenement.date', '<', $dateEnd)
            ->orderBy('evenement.date', 'asc')
            ->orderBy('evenement.heure_debut', 'asc')
            ->get();
        return EvenementResource::Collection($events);
    }
    function getDatesHeuresEvents(Request $request)
    {
        $dateEnd = date('Y-m-d', strtotime($request->dateEnd));
        $dateStart = date('Y-m-d', strtotime($request->dateStart));
        $events = Evenement::distinct()
            ->select(
                'evenement.id',
                'evenement.date',
                'evenement.heure_debut',
                'evenement.heure_fin',
                'evenement.places',
                'evenement_eleve.place',
                'eleve.prenom',
                'eleve.nom',
                'eleve.numero_contrat',
                'evenement_eleve.nom_module'
            )
            ->leftJoin('evenement_eleve', function ($join) {
                $join->on('evenement.date', '=', 'evenement_eleve.date');
                $join->on('evenement.heure_debut', '=', 'evenement_eleve.heure_debut');
                $join->on('evenement.heure_fin', '=', 'evenement_eleve.heure_fin');
            })
            ->leftJoin('eleve', function ($join) {
                $join->on('eleve.id', '=', 'evenement_eleve.eleve_id');
            })
            ->whereDate('evenement.date', '>=', $dateStart)
            ->whereDate('evenement.date', '<', $dateEnd)
            ->orderBy('evenement.date', 'asc')
            ->orderBy('evenement.heure_debut', 'asc')
            ->get();
        return EvenementResource::Collection($events);
    }
    function getEvenementsEleve(Request $request)
    {
        $events = EvenementEleve::where('numero', '=', trim($request->numero))
            ->orderBy('date', 'desc')
            ->orderBy('heure_debut', 'desc')
            ->get();
        return EvenementEleveResource::Collection($events);
    }

    function ajouterNoteSortie(Request $request)
    {
        if (isset($request)) {
            //retrieve data
            $module = Eleve::where('id', $request->id)
                ->with(['modules' => function ($query) use ($request) {
                    $query->where('module_id', '=', $request->id_module);
                }])->get();
            $valid = true;
            //update
            foreach ($module as $md) {
                $res = $md->modules()->updateExistingPivot(
                    $request->id_module,
                    ['note' => $request->note]
                );
                if (!$res) {
                    $valid = false;
                }
            }

            return response()->json([
                'valid' => $valid
            ]);
        }
    }

    function loginEleveParNom(Request $request)
    {
        $valid = false;
        $id = 0;
        $password_decrypt = null;
        if (isset($request)) {
            $nom = strtolower($request->nom);
            //$key32 = env('APP_KEY_OTHER');
            //$encrypter = new Encrypter($key32, 'AES-256-CBC');
            $password  = $request->password;
            $eleve = Eleve::where('numero_contrat', trim($request->numero))
                ->whereRaw('lower(nom) like (?)', ["%{$nom}%"])
                ->first();
            //$password_decrypt  = Crypt::decrypt($eleve->password);
            if (isset($eleve) /*&& isset($password) && $password == $password_decrypt*/) {
                $dateToday = date('Y-m-d H:i:s');
                $eleve->login_time = $dateToday;
                $eleve->expire_time = date('Y-m-d H:i:s', strtotime('+ 28 days'));
                $eleve->save();
                $valid = true;
                $id = $eleve->id;
            }
        }

        return response()->json([
            'isValid' => $valid,
            'id' => $id
        ]);
    }

    function deleteAdminEvent(Request $request)
    {
        $valid = false;
        if (isset($request)) {
            $eventsEleves = EvenementEleve::whereDate('date', '=', date('Y-m-d', strtotime($request->date)))
                ->where('heure_debut', '=', date('H:i:s', strtotime($request->heure_debut)))
                ->where('heure_fin', '=', date('H:i:s', strtotime($request->heure_fin)))
                ->where('id', '!=', $request->id)
                ->get();
             //retrieve data
             $eventsEleve = EvenementEleve::find($request->id)
             ->delete();

            $i = 1;
            if(isset($eventsEleves) && count($eventsEleves) > 0 ){
            foreach ($eventsEleves  as $evt) {
                $evt->place = $i;
                $evt->save();
                $i++;
            }
        }
           
            $valid = true;
        }

        return response()->json([
            'valid' => $valid
        ]);
    }

    function deleteEvent(Request $request)
    {
        $result = $this->loginEleveParNom($request);
        if (!($result->getData()->isValid)) {
            return response()->json([
                'valid' => false
            ]);
        }
        return $this->deleteAdminEvent($request);
    }

    function deletePlacesEvent(Request $request)
    {
        $valid = false;
        if (isset($request)) {
            //retrieve data
            $module = Evenement::destroy($request->all());
            $valid = true;
        }

        return response()->json([
            'valid' => $valid
        ]);
    }

    function updatePlacesEvent(Request $request)
    {
        try {
            $valid = false;
            if (isset($request)) {
                $result = $request->all();

                foreach ($result as $requ) {
                    $evt = Evenement::find($requ['id']);
                    $evt->places = $requ['places'];
                    $evt->save();
                }

                $valid = true;
            }

            return response()->json([
                'valid' => $valid
            ]);
        } catch (Exception $e) {
            return $e;
            // return response()->json([
            //     'isValid' => false
            // ]);
        }
    }

    function reorderEvents(Request $request)
    {
        $updateEvents = null;
        $deleteEvents = null;
        $events = EvenementEleve::distinct()
        ->select(
            'evenement_eleve.id',
            'evenement_eleve.date',
            'evenement_eleve.heure_debut',
            'evenement_eleve.heure_fin',
            'evenement_eleve.nom_module',
            'evenement_eleve.module_id'
        )
        ->leftJoin('eleve_module', function ($join) {
            $join->on('eleve_module.module_id', '=', 'evenement_eleve.module_id');
            $join->on('eleve_module.eleve_id', '=', 'evenement_eleve.eleve_id');
        })
        ->leftJoin('eleve', function ($join) {
            $join->on('eleve.id', '=', 'evenement_eleve.eleve_id');
        })
        ->where('evenement_eleve.numero', '=', trim($request->numero))
        ->where('eleve_module.date_complete','=',null)
        ->where('eleve_module.sans_objet','=',null)
        ->where(function ($query) {
            $query->where('evenement_eleve.status','=',null)
            ->orWhere('evenement_eleve.status', '!=', 2);
        })->orderBy('evenement_eleve.date', 'asc')
        ->orderBy('evenement_eleve.heure_debut', 'asc')
        ->get();

        $eleveModule = EleveModule::distinct()
        ->select(
            'module.id',
            'module.numero',
            'module.nom'
        ) ->join('eleve', function ($join) {
            $join->on('eleve.id', '=', 'eleve_module.eleve_id');
        })
        ->join('module', function ($join) {
            $join->on('module.id', '=', 'eleve_module.module_id');
        })
        ->where('eleve.numero_contrat', '=', trim($request->numero))
        ->where('eleve_module.date_complete','=',null)
        ->where('eleve_module.sans_objet','=',null)
        ->where('eleve.deleted_at','=',null)
        ->where('module.type','=','P')
        ->orderBy('module.numero', 'asc')
        ->get();

        $modulesAll = Module::distinct()
        ->select(
            'module.id',
            'module.phase_id',
            'module.nom',
            'module.type',
            'module.numero'
        )
        ->where('type','P')
        ->orderBy('numero', 'asc')->get();

        foreach($events as $ev){
             if(isset($eleveModule) && count($eleveModule) > 0){
                $evtToUp = $eleveModule->first();
                $ev->nom_module = $evtToUp->nom;
                $ev->module_id = $evtToUp->id;
                $eleveModule = $eleveModule->filter(function ($e) use ($evtToUp){
                    return $e->numero > $evtToUp->numero;
                });
            }
        }

        $updateEvents = $events;
  
        $modulesOneTwo = $modulesAll->take(2);

        if(isset($modulesOneTwo) && count($modulesOneTwo)>0){
            $sessionOne = $events->filter(function ($e) use ($modulesOneTwo){
                return $e->module_id == $modulesOneTwo->first()->id;
            });
            if(isset($sessionOne) && count($sessionOne)>0){
                $sessionTwo = $events->filter(function ($e) use ($modulesOneTwo){
                    return $e->module_id == $modulesOneTwo->last()->id;
                });
                if(isset($sessionTwo) && count($sessionTwo)>0 &&  $sessionTwo->date ==  $sessionOne->date){
                    $deleteEvents = $sessionTwo;
                    $updateEvents = $events->filter(function ($e) use ($modulesOneTwo){
                        return $e->module_id != $modulesOneTwo->first()->id;
                    });
                    foreach($updateEvents as $ev){
                        if(isset($events) && count($events) > 0){
                            $evtToUp = $events->first();
                            $ev->nom_module = $evtToUp->nom_module;
                            $ev->module_id = $evtToUp->module_id;
                            $events = $events->filter(function ($e) use ($evtToUp){
                                return $e->numero > $evtToUp->numero;
                            });
                        }
                    }
                }
            }
        }

        if(isset($updateEvents) && count($updateEvents)>0){
            foreach($updateEvents as $e){
                $event = EvenementEleve::find($e->id);
                $event->nom_module = $e->nom_module;
                $event->module_id = $e->module_id;
                $event->save();
            }
        }
        
       if(isset($deleteEvents) && count($deleteEvents) > 0){
        foreach($deleteEvents as $de){
            $event = EvenementEleve::find($de->id)->delete();
        }
       }
        return $this->getEvenementsEleve($request);
    }

    function updateStatusReservation(Request $request){
        if(isset($request) && isset($request->id)){
            $event = EvenementEleve::find($request->id);
            $event->status = 2;
            $event->save();
            return $this->getEvenementsEleve($request);
        }
    }

    function changePassword(Request $request){
        $nom = strtolower($request->nom);
        $eleve = Eleve::where('numero_contrat','=',trim($request->numero))
        ->whereRaw('lower(nom) like (?)', ["%{$nom}%"])
        ->where('eleve.deleted_at','=',null)
        ->first();
        try{
        if(isset($eleve)){
        //$key32 = env('APP_KEY_OTHER');
        //$encrypter = new Encrypter($key32, 'AES-256-CBC');
        $password  =  Crypt::decrypt($eleve->password);
        if( $password == $request->password){
            $eleve->password =   Crypt::encrypt($request->password_new);
            //$eleve->save();
            return response()->json([
                'isValid' => true
            ]);
        }
        }
        return response()->json([
            'isValid' => false
        ]);
    }catch(DecryptException $e){
        return response()->json([
            'isValid' => false
        ]);
    }
    }
}
