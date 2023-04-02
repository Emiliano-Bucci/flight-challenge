<?php 

  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json");

  include_once '../config/database.php';
  include_once '../config/init_database.php';
  include_once '../models/Airports.php';

  $database = new Database();
  $db = $database->connect();

  // $airports = new Airports($db);
  // $result = $airports->read();
  // $total = $result->rowCount();


  // echo json_encode([
  //   "data" => $result->fetchAll()
  // ]);
