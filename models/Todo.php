<?php 

class Todo
{
    private $content;
    private $user_id;
    private static $table = 'todos';

    public function __construct($content, $user_id)
    {
        $this->content = $content;
        $this->user_id = $user_id;
    }

    public function create()
    {
        $table = self::$table;

        $query = "INSERT INTO {$table} SET content = :content, user_id = :userId";

        $stmt = DatabaseHandler::getConnection()->prepare($query);

        $this->content = htmlspecialchars(strip_tags($this->content));
        $this->userId = htmlspecialchars(strip_tags($this->user_id));

        $stmt->bindParam(':content', $this->content);
        $stmt->bindParam(':userId', $this->user_id);

        if ($stmt->execute()) {
            return true;
        }

        print_f('Error: {$stmt->err} \n');

        return false;
    }

}

?>