<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifLoginPWD extends Mailable
{
    use Queueable, SerializesModels;

    public $person;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->person = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.mailLoginPWD')
        ->from("notify@pconduite.com","Pconduite")
        ->subject("Se connecter / Login");
    }
}
