<?php 

use Slim\Http\Request;
use Slim\Http\Response;
use Helpers\Session;

$app->get('/api/todos', function (Request $request, Response $response, array $args) {
    // TODO: Get all todos from database
});

$app->post('/api/todo/create', function (Request $request, Response $response, array $args) {
    $userData = $request->getParsedBody();

    $newTodo = new Todo($userData['content'], Session::_user('user', 'id'));

    $newTodo->create();

    echo json_encode(
        array(
            'message' => 'Todo Created',
            'data' => $userData
        )
    );
});

?>