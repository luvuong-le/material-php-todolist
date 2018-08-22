<?php 

use Slim\Http\Request;
use Slim\Http\Response;
// use Models\User;

use Helpers\Session;

$app->get('/', function (Request $request, Response $response, array $args) {
    if (isAuthenticated()) {
        return $this->view->render($response, 'home.twig', array(
            'authenticated' => isAuthenticated(),
            'email' => Session::_user('user', 'email'),
            'id' => Session::_user('user', 'id')
        ));
    }
    return $this->view->render($response, 'user/signup.twig');
});

$app->get('/user/{id}', function (Request $request, Response $response, array $args) {
    return $this->view->render($response, 'home.twig', array(
        'authenticated' => isAuthenticated(),
        'email' => Session::_user('user', 'email'),
        'id' => Session::_user('user', 'id')
    ));
});

$app->get('/logout', function (Request $request, Response $response, array $args) {
    Session::_unset('user');
    return $response->withStatus(200)->withHeader('Location', '/login');
});

$app->get('/login', function (Request $request, Response $response, array $args) {
    return $this->view->render($response, 'user/login.twig');
});

$app->post('/signup', function (Request $request, Response $response, array $args) {
    $userData = $request->getParsedBody();

    $newUser = new User($userData['username'], $userData['email'], $userData['password']);

    $newUser->create();

    return $response->withStatus(200)->withHeader('Location', '/');
});

$app->post('/login', function (Request $request, Response $response, array $args) {
    $userData = $request->getParsedBody();

    if (!User::emailExists($userData)) {
        return $this->view->render($response, 'user/login.twig', array(
            'errors' => 'Email does not exist'
        ));
    }

    if (User::verifyPassword($userData)) {
        // Set a session variable to keep track of logged in user
        Session::_set('user', array(
            'authenticated' => true,
            'id' => User::get('id', $userData),
            'email' => User::get('email', $userData)
        ));

        // Redirect
        return $response->withStatus(200)->withHeader('Location', '/user/' . User::get('id', $userData));
    } else {
        return $this->view->render($response, 'user/login.twig', array(
            'errors' => 'Incorrect Password'
        ));
    }
});
?>