<?php

  include_once '../../config/database.php';

  $database = new Database();
  $db = $database->connect();

  class InitDatabase {
    private $conn;

    public function __construct($db){
      $this->conn = $db;
    }

    public function populate_database(){
      try {
        $this->conn->query("SELECT 1 FROM airport LIMIT 1");
        $this->conn->query("SELECT 1 FROM flight LIMIT 1");
       
        echo "DATABASE EXIST!";
      } catch (\Throwable $th) {

        $flights = json_decode(file_get_contents(__DIR__ .'/flights.json'), true);
        $airports = json_decode(file_get_contents(__DIR__ .'/airports.json'), true);

        $create_flight_table = "CREATE TABLE flight (
          code_departure TEXT,
          code_arrival TEXT,
          transfers INT,
          price INT
        )";
         $create_airport_table = "CREATE TABLE airport (
          id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          name TEXT,
          code TEXT,
          lat FLOAT,
          lng FLOAT
        )";

        $this->conn->exec($create_flight_table);
        $this->conn->exec($create_airport_table);

        $flight_sql = 'INSERT INTO flight (code_departure, code_arrival, transfers, price) VALUES (:code_departure, :code_arrival, :transfers, :price)';
        $flight_sql_statement = $this->conn->prepare($flight_sql);

        $airport_sql = 'INSERT INTO airport (name, code,lat, lng) VALUES (:name, :code, :lat, :lng)';
        $airport_sql_statement = $this->conn->prepare($airport_sql);

        foreach($flights as $flight){
          $flight_sql_statement->execute($flight); 
        }
        foreach($airports as $airport){
          $airport_sql_statement->execute($airport); 
        }

        echo "DATABASE CREATED";
      }
    }
  }

  $init = new InitDatabase($db);
  $init->populate_database();
  
?>