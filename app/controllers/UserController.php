<?php 

namespace app\controllers;

use Helpers\Session;

class UserController extends BaseController
{
    public function index($request, $response, $args)
    {
        if (isAuthenticated()) {
            return $this->view->render($response, 'home.twig', array(
                'authenticated' => isAuthenticated(),
                'email' => Session::_user('user', 'email'),
                'id' => Session::_user('user', 'id')
            ));
        }
        return $this->view->render($response, 'user/signup.twig');
    }

    public function signup($request, $response, $args)
    {
        $userData = $request->getParsedBody();

        $newUser = $this->model['User']->create($userData['username'], $userData['email'], $userData['password']);

        $newUser->create();

        return $response->withStatus(200)->withHeader('Location', '/');
    }

    public function login($request, $response, $args)
    {
        return $this->view->render($response, 'user/login.twig');
    }

    public function logout($request, $response, $args)
    {
        Session::_unset('user');
        return $response->withStatus(200)->withHeader('Location', '/login');
    }

    public function profile($request, $response, $args)
    {
        return $this->view->render($response, 'home.twig', array(
            'authenticated' => isAuthenticated(),
            'email' => Session::_user('user', 'email'),
            'id' => Session::_user('user', 'id')
        ));
    }

    public function postLogin($request, $response, $args)
    {
        $userData = $request->getParsedBody();

        if (!$this->model['User']::emailExists($userData)) {
            return $this->view->render($response, 'user/login.twig', array(
                'errors' => 'Email does not exist'
            ));
        }

        if ($this->model['User']::verifyPassword($userData)) {
        // Set a session variable to keep track of logged in user
            Session::_set('user', array(
                'authenticated' => true,
                'id' => $this->model['User']::get('id', $userData),
                'email' => $this->model['User']::get('email', $userData)
            ));

        // Redirect
            return $response->withStatus(200)->withHeader('Location', '/profile');
        } else {
            return $this->view->render($response, 'user/login.twig', array(
                'errors' => 'Incorrect Password'
            ));
        }
    }
}

?>