<?php 

namespace App\Validation;

use Respect\Validation\Validator as v;
use Respect\Validation\Exceptions\NestedValidationException;

class Validator
{
    protected $errors = [];

    public function validate($request, $validationRules, $fields)
    {
        try {
            $validationRules->assert($request);
        } catch (NestedValidationException $exception) {
            $this->errors = $exception->findMessages($fields);
        }
        return true;
    }

    public function getErrors()
    {
        return $this->errors;
    }
}

?>