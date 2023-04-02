<?php

  class Airports {
    private $conn;

    public function __construct($db){
      $this->conn = $db;
    }

    public function read(){
      $query = 'SELECT * FROM airport';
      $stmt = $this->conn->prepare($query);
      $stmt->execute();
      return $stmt;
    }
  }