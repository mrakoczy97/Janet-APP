<?php

header('Access-Control-Allow-Origin: *'); //potrzebne na rzecz testów
include "database.php"; //łączenie z bazą danych

$check=mysqli_query($db,"SELECT COUNT(*) FROM `Users` WHERE Name='test' AND Surname='test' AND Phone='111111111' AND Class='1' AND Password='testowo'");

if(empty($check))
{
	echo 'bangla';
}
else
{
	echo 'no niezbyt';
}

?>