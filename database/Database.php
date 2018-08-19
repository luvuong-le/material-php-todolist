<?php

    class DatabaseHandler {
        private $connection;

        public function __construct() {
            $this->connect();
        }

        protected function connect() {
            $host = env('DB_HOST');
            $port = env('DB_PORT');
            $database = env('DB_DATABASE');
            $username = env('DB_USERNAME');
            $password = env('DB_PASSWORD');

            $conn = new mysqli($host, $username, $password, $database, $port);

            if ($conn->connect_error) {
                http_response_code(500);
                die("Could not connect to database!");
            }

            return $this->connection = $conn;
        }

        public function getConnection() {
            return $this->connection;
        }
    }

?>