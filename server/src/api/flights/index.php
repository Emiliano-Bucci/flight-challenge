<?php

  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");
  header("Content-Type: application/json");

  include_once '../../models/Flights.php';
  include_once '../../config/database.php';

  $params = json_decode(file_get_contents('php://input'), true);

  if(!$params['departure'] || !$params['arrival']){
    echo json_encode([
      "error" => "Missing params!"
    ]);
    return;
  }

  $database = new Database();
  $PDOConn = $database->connect();

  $arrival_code = $params['arrival'];
  $departure_code = $params['departure'];

  $flights_query = new Flights($PDOConn, $departure_code, $arrival_code);
  $flights = $flights_query->read()->fetchAll(PDO::FETCH_OBJ);
  

  echo json_encode([
    "data" => $flights,
  ]);




