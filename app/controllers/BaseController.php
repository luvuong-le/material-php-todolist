<?php 

namespace app\controllers;

use \Slim\Views\Twig as View;

class BaseController
{
    protected $view;
    protected $model;

    public function __construct($container)
    {
        $this->view = $container->get('view');
        $this->model = $container->get('model');
    }
}

?>