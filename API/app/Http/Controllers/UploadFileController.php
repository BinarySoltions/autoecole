<?php

namespace App\Http\Controllers;

use App\File;
use Illuminate\Http\Request;

class UploadFileController extends Controller
{
    /**
     * Update the avatar for the user.
     *
     * @param  Request  $request
     * @return Response
     */
    public function upload(Request $req)
    {
       // dd($req->file('file'));
        $req->validate([
            'file' => 'required|mimes:jpg,png,JPEG,PNG,pdf|max:1048576'
            ]);
            $fileModel = new File();
            if($req->file()) {
                $fileName = time().'_'.$req->file->getClientOriginalName();
                $filePath = $req->file('file')->storeAs('uploads', $fileName, 'prod');
                $fileModel->name = time().'_'.$req->file->getClientOriginalName();
                $fileModel->path = '/' . $filePath;
                $fileModel->save();
                return back()
                ->with('success','File has been uploaded.')
                ->with('file', $fileName);
            }
    }
}
