<?php

// use Models\User;
require __DIR__ . '../../models/User.php';
use PHPUnit\Framework\TestCase;

final class UserTest extends TestCase
{

    private $UserModel;

    protected function setUp()
    {
        $this->UserModel = new User();
        $this->UserModel->create("Lu-Vuong", "test@hotmail.com", "testPassword");
    }

    public function testNewUserCreation() : void
    {
        $this->assertNotNull($this->UserModel);
    }

    public function testPasswordHashing() : void
    {
        $this->assertNotEquals($this->UserModel->getPassword(), "fakePassword");
    }

    public function testPasswordVerify() : void
    {
        $this->assertTrue(password_verify("testPassword", $this->UserModel->getPassword()));
    }
}

?>