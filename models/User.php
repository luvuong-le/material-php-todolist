<?php 

namespace Models;

use DatabaseHandler;

class User
{
    private $name;
    private $email;
    private $password;
    private static $table = "users";

    public static function hashPassword($password)
    {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        return $hashedPassword;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function create($name, $email, $password)
    {
        $this->name = $name;
        $this->email = $email;
        $this->password = self::hashPassword($password);
    }

    public function save()
    {
        $table = self::$table;

        $query = "INSERT INTO {$table} SET name = :name, email = :email, password = :password";

        $stmt = DatabaseHandler::getConnection()->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);

        if ($stmt->execute()) {
            return true;
        }

        print_f('Error: {$stmt->err} \n');

        return false;
    }

    public static function get($field, $userData)
    {
       // Check database for user with same email and verify password

        $table = self::$table;

        $query = "SELECT {$field} FROM {$table} WHERE email = :email";

        $stmt = DatabaseHandler::getConnection()->prepare($query);

        $stmt->bindParam(':email', $userData['email']);

        $stmt->execute();

        $result = $stmt->fetch();

        return $result[$field];
    }

    public static function emailExists($userData)
    {
        // Check database for user with same email and verify password

        $table = self::$table;

        $query = "SELECT name, email, password FROM {$table} WHERE email = :email";

        $stmt = DatabaseHandler::getConnection()->prepare($query);

        $stmt->bindParam(':email', $userData['email']);

        $stmt->execute();

        $result = $stmt->fetch();

        return ($result["email"]) ? true : false;
    }

    public static function verifyPassword($userData)
    {
        // Check database for user with same email and verify password

        $table = self::$table;

        $query = "SELECT name, email, password FROM {$table} WHERE email = :email";

        $stmt = DatabaseHandler::getConnection()->prepare($query);

        $stmt->bindParam(':email', $userData['email']);

        $stmt->execute();

        $result = $stmt->fetch();

        return password_verify($userData['password'], $result['password']);
    }
}

?>