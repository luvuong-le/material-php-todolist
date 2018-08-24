<?php 

use Slim\Http\Request;
use Slim\Http\Response;
use Helpers\Session;

$app->get('/api/todos', TodoController::class . ':getAll');

$app->post('/api/todo/create', TodoController::class . ':create');

$app->post('/api/todo/delete', TodoController::class . ':delete');

$app->post('/api/todo/edit', TodoController::class . ':edit');

?>