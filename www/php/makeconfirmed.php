<?php
 include "database.php";
header('Access-Control-Allow-Origin: *');


 $order_id=$_POST['order_id'];
 $zapytanie="UPDATE `Orders_NEW` SET `Confirmed` = 1 WHERE `Order_ID` = '$order_id'";
 $q=mysqli_query($db,$zapytanie);
 if($q)
  echo "successfully added";
 else
  echo "We gotta some problems";
 
 ?>
 