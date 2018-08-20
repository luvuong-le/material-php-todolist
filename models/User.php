<?php 

// namespace Models;

class User
{
    private $name;
    private $email;
    private $password;
    private $table = "users";

    public function __construct($name, $email, $password)
    {
        $this->name = $name;
        $this->email = $email;
        $this->password = $this->hashPassword($password);
    }

    public function hashPassword($password)
    {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        return $hashedPassword;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function create()
    {
        global $dbConnection;

        $query = "INSERT INTO {$this->table} SET name = :name, email = :email, password = :password";

        $stmt = $dbConnection->prepare($query);

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

}

?>