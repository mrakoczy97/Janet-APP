<?php


header('Access-Control-Allow-Origin: *'); //potrzebne na rzecz testów
include "database.php"; //łączenie z bazą danych
header("Content-Type: application/json");


$who=$_POST['name'];
$who_id=$_POST['user_id'];
$sql="SELECT * FROM `Orders` WHERE Who = '$who' AND Who_ID = '$who_id'";

if ($result=mysqli_query($db,$sql))
  {
  // Return the number of rows in result set
  $rowcount=mysqli_num_rows($result);
 
 if($rowcount==1)
 {
  while($row = $result->fetch_assoc()) {
       $dane = array("status" => "success",
    "Schab"=> $row["Schab_AMOUNT"],
    "Kurczak"=> $row["Kurczak_AMOUNT"],
    "Dewo"=> $row["Dewo_AMOUNT"],
    "Cena"=> $row["Price"]
    );
 
 }
  echo json_encode($dane);
 }
 else
 {
  $dane = array("status"=>"failed");
  echo json_encode($dane);
 }
 
 
  mysqli_free_result($result);
  }

mysqli_close($db);


?>