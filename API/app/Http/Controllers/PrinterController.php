<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Encryption\Encrypter;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
use Exception;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
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

class PrinterController extends Controller
{
    //

    public function printAttestation(Request $request)
    {
        set_time_limit(0);
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
        $paramsText = $pdf::serializeTCPDFtagParameters(array(45, 9, 'Adresse', 1, 'J', 1, 0, '', '', true, 0, false, true, 9, 'M'));
        $paramsTextModules = $pdf::serializeTCPDFtagParameters(array(15, 7, 'Modules', 0, $ln=0, 'C', 0, '', 0, false, 'T', 'C'));
       
        $view = View::make(
            'attestationV2.pattestation',
            ['eleve' =>  $eleve, 'ecole' => $ecole, 'params' => $params,'paramsM' => $paramsTextModules,
            'paramsT' => $paramsText, 'attestation' => $attestation, 'personnes' => $personnes, 'isAll' => !$isAll]
        );
        $html = $view->render();
        if (isset($html)) {

           /*  $pdf::setHeaderCallback(function ($pdf) use ($numero) {

                $html = '<table class="w-100" style="font-size:7px" cellpadding="2"><tr><td style="width:2%">  </td><td><img src="' . url('/images/logo_pconduite.jpg') . '" width="110" /></td>
                  <td style="width:72%;text-align:right;"><table><tr><td class="w-100"  style="text-align:right;font-weight:bold;font-size:14px">
                  Attestation de cours de conduite<br />pour la classe 5</td></tr></table></td>
                  <td style="width:2%">  </td>
                  </tr>
</table>';
                $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
            }); */
            $pdf::SetMargins(5, 5, 7);
            $pdf::SetHeaderMargin(5);
            $pdf::SetFooterMargin(20);
            $pdf::SetAutoPageBreak(TRUE, 5);
            $copie='';
            if ($isAll) {
                $copie = '';
                $pdf::AddPage();
                $pdf::writeHTML($html, true, false, true, false, '');

            
                $pdf::setFooterCallback(function ($pdf) use ($copie) {
    
                    $html = '<table class="w-100" style="font-size:5px;font-weight:bolder;font-family: "Helvetica Neue lt std",Helvetica, sans-serif;"><tr>
                   <td colspan="2" align="left" style="font-size:9px;font-weight:bolder">Société de l\'assurance automobile du Québec</td>
                   </tr>
                   <tr>
                   <td colspan="2" align="left" style="background-color:black;height:3px;"></td>
                   </tr>
                   <tr>
                   <td align="left" style="font-size:9px;">4241 35 <span style="font-weight:normal">(2022-03)</span></td>
                   <td align="right" style="text-align:right;font-size:9px;font-weight:normal">              Page 1 de 2</td> </tr></table>';
                    $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
                });
            }
           

            if (!$isAll) {
                $pdf::AddPage();
               
                $pdf::writeHTML($html, true, false, true, false, '');

                $pdf::setFooterCallback(function ($pdf) use ($copie) {

                    $html = '<table class="w-100" style="font-size:5px;font-weight:bolder"><tr>
                   <td colspan="2" align="left" style="font-size:9px;font-weight:bolder">Société de l\'assurance automobile du Québec</td>
                   </tr>
                   <tr>
                   <td colspan="2" align="left" style="background-color:black;height:3px;"></td>
                   </tr>
                   <tr>
                   <td align="left" style="font-size:9px;">4241 35 <span style="font-weight:normal">(2022-03)</span></td>
                   <td align="right" style="text-align:right;font-size:9px;font-weight:normal">              Page 2 de 2</td>
                   </tr>
    </table>';
                    $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
                });

            }

            $pdf::lastPage();
            $result =  $pdf::Output('pconduite.pdf', 'E');
            return  $result;
        }
    }

}
