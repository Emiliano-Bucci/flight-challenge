<?php 
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");
  header("Content-Type: application/json");

  include_once '../../config/database.php';
  include_once '../../models/Airports.php';

  $database = new Database();
  $PDOConn = $database->connect();

  $airports_query = new Airports($PDOConn);
  $airports = $airports_query->read()->fetchAll(PDO::FETCH_OBJ);

  echo json_encode([
    "data" => $airports
  ]);

?>