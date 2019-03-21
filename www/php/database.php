<?php
 


$serwer = '127.0.0.1';
$uzytkownik = 'root';
$haslo = '';
$nazwa_bazy = 'janeta';

/*Połączenie z bazą*/
$db = mysqli_connect($serwer, $uzytkownik, $haslo, $nazwa_bazy);
 
/*Komunikat o błędzie w przypadku problemów z połączeniem*/
if (mysqli_connect_errno()) 
{
    echo 'Error with connecting to database';
    exit;   
}
else {
}
 
?>