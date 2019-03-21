<?php

 
/*Definiowanie zmiennych z danymi niezbêdnymi do po³¹czenia z baz¹ danych*/
$serwer = 'localhost';
$uzytkownik = 'root';
$haslo = '';
$nazwa_bazy = 'orders';
  
/*Po³¹czenie z baz¹*/
$db = mysqli_connect($serwer, $uzytkownik, $haslo, $nazwa_bazy);
 
/*Komunikat o b³êdzie w przypadku problemów z po³¹czeniem*/
if (mysqli_connect_errno()) 
{
    echo 'Error with connecting to database';
    exit;   
}
else {
}
 

?>