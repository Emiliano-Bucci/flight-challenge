<?php

  class Flights {

    private $conn;
    private $code_departure;
    private $code_arrival;

    public function __construct($db, $departure, $arrival){
      $this->conn = $db;
      $this->code_departure = $departure;
      $this->code_arrival = $arrival;
    }

    public function read(){
      $query = "SELECT * FROM `flight` WHERE code_departure = '$this->code_departure' AND code_arrival = '$this->code_arrival' AND transfers <= 1 ORDER BY price ASC";
      $stmt = $this->conn->prepare($query);
      $stmt->execute();
      return $stmt;
    }
  }
