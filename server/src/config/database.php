<?php

  class Database {
    private $host = 'db';
    private $user = 'MYSQL_USER';
    private $password = 'MYSQL_PASSWORD';
    private $db_name = 'MYSQL_DATABASE';
    private $conn;


    public function connect(){
      $this->conn = null;

      try {
        $this->conn = new PDO('mysql:host=db;dbname=MYSQL_DATABASE', $this->user, $this->password);
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      } catch (\Throwable $th) {
        echo "Database connection failed" . $th->getMessage();
      }


      return $this->conn;
    }
  }
?>