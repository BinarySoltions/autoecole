<?php
namespace App\Providers;
use Illuminate\Support\ServiceProvider;
use Illuminate\Container\Container;
use App\Services\Eleve\IEleveService;
use App\Services\Eleve\EleveService;

class EleveServiceProvider extends ServiceProvider
{

    public function boot()
    {
        //
    }
    
    public function register()
    {
        $container = Container::getInstance();
        $container->bind(IEleveService::class, EleveService::class);
        $instance = $container->make(IEleveService::class);
    }
}