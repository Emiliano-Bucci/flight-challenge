<?php

  class Airports {
    private $conn;
    private $search;

    public function __construct($db, $search){
      $this->conn = $db;
      $this->search = $search;
    }

    public function read(){
      $query = 'SELECT * FROM airport';

      if($this->search){
        $query =  "SELECT * FROM airport WHERE LOWER(name) LIKE '%$this->search%'";
      }

      $stmt = $this->conn->prepare($query);
      $stmt->execute();
      return $stmt;
    }
  }