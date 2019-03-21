<?php


header('Access-Control-Allow-Origin: *');
 include "database.php";

 
 $who=$_POST['name'];
 $who_id=$_POST['user_id'];
 $cena=$_POST['suma'];  //należność całkowita za całe zamówienie
 $order_id=$_POST['order_id']; //to będzie potem przekazywane, jak się da tworzenie tego xd

$data = $_POST['tablica'];   //odebranie tablicy za pomocą json

// data[i][0] === ID produktu
// data[i][1] === ilość produktów
// data[i][2] === należonść za produkt
  


$sql_check="SELECT * FROM `Orders_NEW` WHERE `Order_ID`='$order_id'"; //polecenie do sprawdzenia czy ktoś już dzisiaj zamówił

$check_query=mysqli_query($db,$sql_check); //wykonanie go

$rowcount=mysqli_num_rows($check_query); //zwrócenie liczby wierszy

if($rowcount==0)
{
	
	$dl=sizeof($data); //długość tablicy pod wzgłedem indexu pierwszego

	for($i=0;$i<$dl;$i++)
	
	{
		$product=$data[$i][0];
		$amount=$data[$i][1];
		$price=$data[$i][2];
		$sql="INSERT INTO `Orders_NEW` (`Who`,`Who_ID`,`Product`,`Amount`,`Price`,`Order_ID`) VALUES ('$who','$who_id','$product','$amount','$price','$order_id')";
		mysqli_query($db,$sql);
	}
	
	$return="success";
}
else
{
	$return="failed";
}

echo json_encode($return);

 ?>
 