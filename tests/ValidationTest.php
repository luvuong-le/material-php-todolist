<?php

use Models\User;
use Respect\Validation\Validator as v;
use App\Validation\Validator;
use PHPUnit\Framework\TestCase;
use Respect\Validation\Exceptions\NestedValidationException;

final class ValdiationTest extends TestCase
{
    private $user;
    private $userValidator;
    private $validator;
    private $userFields;

    protected function setUp()
    {
        $this->user = new stdClass();
        $this->user->name = "Lu-Vuong";
        $this->user->email = "test@hotmail.com";
        $this->user->password = "Testing";

        $this->userValidator = v::attribute('name', v::stringType()->length(1, 50))
            ->attribute('email', v::email()->length(1, 50))
            ->attribute('password', v::stringType()->length(1, 50));

        $this->userFields = ['name', 'email', 'password'];

        $this->validator = new Validator();
    }

    public function testValidUserDetails()
    {
        $this->assertTrue($this->userValidator->validate($this->user));
    }

    public function testInvalidDetails()
    {
        $this->user->name = 3213;
        $this->assertNotTrue($this->userValidator->validate($this->user));
    }

    public function testReturnErrorMessages()
    {
        try {
            $this->user->name = 3213;
            $this->assertNotTrue($this->userValidator->validate($this->user));
            $this->userValidator->assert("name");
        } catch (NestedValidationException $exception) {
            $this->assertTrue(is_array($exception->getMessages()));
        }
    }

    public function testValidationClass()
    {
        $this->user->name = 3213;
        $this->validator->validate($this->user, $this->userValidator, $this->userFields);
        $this->assertArrayHasKey('name', $this->validator->getErrors());
    }
}

?>