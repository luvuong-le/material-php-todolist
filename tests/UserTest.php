<?php

use Models\User;
use PHPUnit\Framework\TestCase;

final class UserTest extends TestCase
{

    private $newUser;

    protected function setUp()
    {
        $this->newUser = new User("Lu-Vuong", "test@hotmail.com", "testPassword");
    }

    public function testNewUserCreation() : void
    {
        $this->assertNotNull($this->newUser);
    }

    public function testPasswordHashing() : void
    {
        $this->assertNotEquals($this->newUser->getPassword(), "testPassword");
    }

    public function testPasswordVerify() : void
    {
        $this->assertTrue(password_verify("testPassword", $this->newUser->getPassword()));
    }
}

?>