<?php

 
/*Definiowanie zmiennych z danymi niezb�dnymi do po��czenia z baz� danych*/
$serwer = 'localhost';
$uzytkownik = 'root';
$haslo = '';
$nazwa_bazy = 'orders';
  
/*Po��czenie z baz�*/
$db = mysqli_connect($serwer, $uzytkownik, $haslo, $nazwa_bazy);
 
/*Komunikat o b��dzie w przypadku problem�w z po��czeniem*/
if (mysqli_connect_errno()) 
{
    echo 'Error with connecting to database';
    exit;   
}
else {
}
 

?>