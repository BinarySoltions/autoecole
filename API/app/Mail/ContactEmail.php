<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ContactEmail extends Mailable
{
    use Queueable, SerializesModels;

    protected $contact;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($info)
    {
        $this->contact = $info;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $from = ['address' => $this->contact['email'], 'name' => $this->contact['nom']];
        return $this->view('mailInfo')
        ->with([
            'msg' => $this->contact['message']
        ])
        ->from($this->contact['email'],$this->contact['nom'])
        ->subject($this->contact['sujet']);
    }
}
