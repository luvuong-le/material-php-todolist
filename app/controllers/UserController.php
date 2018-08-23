<?php 

namespace app\controllers;

use Respect\Validation\Validator as v;
use App\Validation\Validator;
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

        $errors = array(
            'messages' => []
        );

        if ($this->model['User']::emailExists($userData)) {
            $errors['messages']['email'] = "This email already exists!";
            return $this->view->render($response, 'user/signup.twig', $errors);
        }

        $validator = new Validator();

        $this->model['User']->create($userData['username'], $userData['email'], $userData['password']);

        $userValidator = v::attribute('name', v::stringType()->length(10, 50))
            ->attribute('email', v::stringType()->length(10, 50))
            ->attribute('password', v::stringType()->length(10, 75));

        $validator->validate($this->model['User'], $userValidator, ['username', 'email', 'password']);

        if ($validator->getErrors()) {
            $errors['messages'] = $validator->getErrors();
            return $this->view->render($response, 'user/signup.twig', $errors);
        }

        $this->model['User']->save();

        Session::_set('user', array(
            'authenticated' => true,
            'id' => $this->model['User']::get('id', $userData),
            'email' => $this->model['User']::get('email', $userData)
        ));

        return $response->withStatus(200)->withHeader('Location', '/profile');
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

        $errors = array(
            'messages' => []
        );

        if (!$this->model['User']::emailExists($userData)) {
            $errors['messages']['email'] = "This email does not exist!";
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
            $errors['messages']['password'] = "This password is incorrect!";
            return $this->view->render($response, 'user/login.twig', $errors);
        }
    }
}

?>