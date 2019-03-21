
<?php


header('Access-Control-Allow-Origin: *'); //potrzebne na rzecz testów
include "database.php"; //łączenie z bazą danych
header("Content-Type: application/json");


$numer=$_POST['number'];
$pass=$_POST['pass'];
$sql="SELECT * FROM `Users` WHERE Phone = '$numer' AND Password = '$pass'";

if ($result=mysqli_query($db,$sql))
  {
  // Return the number of rows in result set
  $rowcount=mysqli_num_rows($result);
 
 if($rowcount==1)
 {
  while($row = $result->fetch_assoc()) {
       $dane = array("status" => "success",
    "ID" => $row["ID"],
    "Name"=> $row["Name"],
    "Surname"=> $row["Surname"],
    "Phone"=> $row["Phone"],
    "Password"=> $row["Password"],
    "Admin"=> $row["Admin"],
    "Class"=> $row["Class"],
    "Banned"=> $row["Banned"]
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