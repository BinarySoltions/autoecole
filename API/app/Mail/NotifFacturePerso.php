<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifFacturePerso extends Mailable
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
        return $this->view('pfactureperso')
        ->with([

            'eleve' => $this->data['eleve'], 'ecole' => $this->data['ecole'],
                    'payementsPDF' => $this->data['payements'], 'totalPaye' => $this->data['totalPaye'], 'dateDuJour' => date('Y-m-d'),
                    'description' => $this->data['description']
                    ]
        )
        ->from("notify@pconduite.com","Pconduite")
        ->subject("Facture / Invoice");
    }
}
