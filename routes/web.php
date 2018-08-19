<?php 

    use Slim\Http\Request;
    use Slim\Http\Response;

    $app->get('/', function(Request $request, Response $response, array $args) {
        return $this->view->render($response, 'home.twig');
    });

    $app->get('/signup', function(Request $request, Response $response, array $args) {
        return $this->view->render($response, 'user/signup.twig');
    });

    $app->get('/login', function(Request $request, Response $response, array $args) {
        return $this->view->render($response, 'user/login.twig');
    });
?>