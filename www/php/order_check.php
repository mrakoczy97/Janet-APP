<?php


header('Access-Control-Allow-Origin: *');
 include "database.php";

 

 $order_id=$_POST['order_id']; //to będzie potem przekazywane


$sql_check="SELECT * FROM `Orders_NEW` WHERE `Order_ID`='$order_id' AND `Confirmed`= 1"; //polecenie do sprawdzenia czy ktoś już dzisiaj zamówił

$check_query=mysqli_query($db,$sql_check); //wykonanie go

$rowcount=mysqli_num_rows($check_query); //zwrócenie liczby wierszy

if($rowcount==0)
{
	
		
	$return="brak";
}
else
{
	$return="jest";
}

echo json_encode($return);

 ?>
 