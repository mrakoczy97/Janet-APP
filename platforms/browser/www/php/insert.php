<?php

header('Access-Control-Allow-Origin: *');
 include "database.php";
 if(isset($_POST['insert']))
 {

 $product=$_POST['produkt'];
 $user=$_POST['user'];
 $q=mysqli_query($db,"INSERT INTO `orders` (`Product`,`Person`) VALUES ('$product','$user')");
 if($q)
  echo "successfully added";
 else
  echo "We gotta some problems";
 }
 ?>