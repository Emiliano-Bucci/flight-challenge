<?php 
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");
  header("Content-Type: application/json");

  include_once '../../config/database.php';
  include_once '../../models/Airports.php';

  $database = new Database();
  $PDOConn = $database->connect();

  $search = null;

  $request_params = json_decode(file_get_contents('php://input'), true);
  $search_request_param = $request_params['search'];

  if($search_request_param){
    $search = $search_request_param;
  }

  $airports_query = new Airports($PDOConn, $search);
  $airports = $airports_query->read()->fetchAll(PDO::FETCH_OBJ);

  echo json_encode([
    "data" => $airports
  ]);

?>