<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifFacture extends Mailable
{
    use Queueable, SerializesModels;

    protected $data;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.facture')
        ->with([

            'eleve' => $this->data['eleve'], 'ecole' =>  $this->data['ecole'], 'payementsPDF' =>  $this->data['payementsPDF'],
            'totalPaye' =>  $this->data['totalPaye'], 'dateDuJour' => date('Y-m-d')]
        )
        ->from("notify@pconduite.com","Pconduite")
        ->subject("Facture / Invoice");
    }
}
