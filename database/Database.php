<?php


class DatabaseHandler
{
    private $connection;
    private static $instance;
    private $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, //turn on errors in the form of exceptions
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, //make the default fetch be an associative array
    ];

    public function __construct()
    {
        $this->connect();
    }

    public static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    protected function connect()
    {
        $host = env('DB_HOST');
        $port = env('DB_PORT');
        $database = env('DB_DATABASE');
        $username = env('DB_USERNAME');
        $password = env('DB_PASSWORD');

        /* Mysqli Connection */
        /*
        $conn = new PDO($host, $username, $password, $database, $port);
        if ($conn->connect_error) {
            http_response_code(500);
            die("Could not connect to database!");
        }
         */

        try {
            $conn = new PDO('mysql:host=' . $host . ';dbname=' . $database, $username, $password, $this->options);
        } catch (PDOException $e) {
            die("Could not connect to database!" . $e->getMessage());
        }

        return $this->connection = $conn;
    }

    public static function getConnection()
    {
        return self::$instance->connection;
    }
}

?>