<?php 

use Slim\Http\Request;
use Slim\Http\Response;
use Models\User;

$app->get('/', function (Request $request, Response $response, array $args) {
    return $this->view->render($response, 'home.twig');
});

$app->get('/signup', function (Request $request, Response $response, array $args) {
    return $this->view->render($response, 'user/signup.twig');
});

$app->get('/login', function (Request $request, Response $response, array $args) {
    return $this->view->render($response, 'user/login.twig');
});

$app->post('/signup', function (Request $request, Response $response, array $args) {
    $userData = $request->getParsedBody();

    $newUser = new User($userData['email'], $userData['username'], $userData['password']);

    $newUser->create();

    return $response->withStatus(200)->withHeader('Location', '/');
});
?>