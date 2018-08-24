<?php 

class Todo
{
    private $content;
    private $user_id;
    private static $table = 'todos';

    public function create($content, $user_id)
    {
        $this->content = $content;
        $this->user_id = $user_id;
    }

    public function save()
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

    public function readAll($id)
    {
        $table = self::$table;

        $query = "SELECT content FROM {$table} WHERE user_id = :user_id";

        $stmt = DatabaseHandler::getConnection()->prepare($query);

        $stmt->bindParam(':user_id', $id);

        $stmt->execute();

        $result = $stmt->fetchAll();

        return $result;
    }

    public function exists($content)
    {

        $table = self::$table;

        $query = "SELECT content FROM {$table} WHERE content = :content";

        $stmt = DatabaseHandler::getConnection()->prepare($query);

        $stmt->bindParam(':content', $content);

        $stmt->execute();

        $result = $stmt->fetch();

        return ($result["content"]) ? true : false;
    }

    public function delete($content)
    {
        try {
            $table = self::$table;

            $query = "DELETE FROM {$table} WHERE content = :content";

            $stmt = DatabaseHandler::getConnection()->prepare($query);

            $stmt->bindParam(':content', $content);

            $stmt->execute();

            return 'Deleted Successfully';

        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }

    public function edit($newContent, $oldContent)
    {
        try {
            $table = self::$table;

            $query = "UPDATE {$table} SET content = :newContent WHERE content = :oldContent";

            $stmt = DatabaseHandler::getConnection()->prepare($query);

            $stmt->bindParam(':newContent', $newContent);
            $stmt->bindParam(':oldContent', $oldContent);

            $stmt->execute();

            return 'Updated Successfully';

        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }

}

?>