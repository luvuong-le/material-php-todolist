<?php 


namespace app\controllers;

use Respect\Validation\Validator as v;
use App\Validation\Validator;
use Helpers\Session;

class TodoController extends BaseController
{
    public function create($request, $response, $args)
    {
        $userData = $request->getParsedBody();

        if ($this->model['Todo']->exists($userData['content'])) {
            return json_encode(array(
                'exists' => true
            ));
        }

        $this->model['Todo']->create($userData['content'], Session::_user('user', 'id'));

        $this->model['Todo']->save();

        return json_encode(
            array(
                'message' => 'Todo Created',
                'data' => $userData
            )
        );
    }

    public function getAll($request, $response, $args)
    {
        $results = $this->model['Todo']->readAll(Session::_user('user', 'id'));

        return json_encode(
            array(
                'message' => 'Todos Retrieved',
                'data' => $results
            )
        );
    }

    public function delete($request, $response, $args)
    {
        $userData = $request->getParsedBody();

        $this->model['Todo']->delete($userData['content']);

        return json_encode(
            array(
                'message' => 'Todo Deleted',
                'data' => $userData
            )
        );
    }

}

?>