<?php 

use Slim\Http\Request;
use Slim\Http\Response;

use Helpers\Session;
use app\controllers\UserController;


$app->get('/', UserController::class . ':index');

$app->get('/profile', UserController::class . ':profile');

$app->get('/logout', UserController::class . ':logout');

$app->get('/login', UserController::class . ':login');

$app->post('/signup', 'UserController:signup');

$app->post('/login', 'UserController:postLogin');
?>