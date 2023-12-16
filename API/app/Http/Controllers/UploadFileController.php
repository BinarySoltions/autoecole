<?php

namespace App\Http\Controllers;

Use Image;
use App\File;
use App\Http\Resources\FileResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\View;

class UploadFileController extends Controller
{
    private $disk = "prod";
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
            'file' => 'required|mimes:jpg,png,jpeg,pdf|max:1048576',
            'group' => 'required',
            'lang' => 'required'
            ]);
            $fileModel = new File();
            if($req->file()) {
                $fileName = time().'_'.$req->file->getClientOriginalName();
                $filePath = $req->file('file')->storeAs('uploads', $fileName, $this-> disk);
                //$ImageUpload = Image::make($req->file);
                //$ImageUpload->resize(250,125);
                Storage::disk($this-> disk)->makeDirectory('thumbnails');
                $filePath_Thumbnail = Storage::disk($this-> disk)->path('thumbnails/');
                //$ImageUpload->save( $filePath_Thumbnail.$fileName);
                $mime = mime_content_type( Storage::disk($this-> disk)->path('').'/'.$filePath);
                $fileModel->name =  $fileName;
                $fileModel->path = '/' . $filePath;
                $fileModel->path_thumbnail = '/thumbnails/'.$fileName ;
                $fileModel->group_file = Request::createFromGlobals()->get('group');
                $fileModel->lang = Request::createFromGlobals()->get('lang');
                $fileModel->mime = $mime;
                $fileModel->description = Request::createFromGlobals()->get('description');
                $fileModel->save();
                return response()->json([
                    'link' => $filePath
                ]);
            }
    }

    public function getFiles(Request $req){
        $file = File::where('group_file','!=',null)->get();
        return FileResource::Collection($file);
    }
    public function getFilesByGroup(Request $req){
        if(isset($req->lang)){
            $file = File::where('group_file','=',$req->group)
            ->where('lang','=',$req->lang)
            ->get();
        }else{
            $file = File::where('group_file','=',$req->group)->get();
        }
      
        return FileResource::Collection($file);
    }
    public function deleteFiles(Request $request){
        if($request){
            foreach($request->all() as $req){
                $file = File::find($req['id']);
                Storage::disk($this-> disk)->delete($file->path);
                Storage::disk($this-> disk)->delete($file->path_thumbnail);
                $file->delete();
            }
        }
        return response()->json([
            'success' => true
        ]);
    }

    public function getFilesByGroupWeb(Request $req){
        if(isset($req->lang)){
            $file = File::where('group_file','=',$req->group)
            ->where('lang','=',$req->lang)->orderBy('created_at','desc')
            ->take($req->nbr)->get();
        }else{
            $file = File::where('group_file','=',$req->group)
            ->orderBy('created_at','desc')->take($req->nbr)->get();
        }
        $visible = false;
        if(strcmp($req->group,"Groupe")==0){
            $visible = true;
        }
        return View::make("webViewRender.group",['groupes'=>$file,'nbr'=>$req->nbr,'visibleDesc'=>$visible])
        ->render();
    }
}
