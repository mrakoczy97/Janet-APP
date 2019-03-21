<?php

header('Access-Control-Allow-Origin: *'); //potrzebne na rzecz testów
include "database.php"; //łączenie z bazą danych
//zmienne z ajaxa
 $name=$_POST['name'];
 $surname=$_POST['surname'];
 $numer=$_POST['numer'];
 $klasa=$_POST['klasa'];
 $pass=$_POST['pass'];
 
 // spawdzenie czy konto już istnieje



 $q=mysqli_query($db,"INSERT INTO `Users` (`Name`,`Surname`,`Phone`,`Password`,`Class`) VALUES ('$name','$surname','$numer','$pass','$klasa')");
 if($q)
  echo ($name);
 else
  echo "Niestety rejestracja nie powiodła się, sprawdź połączenia z internetem i spróbuj jeszcze raz";
 


 ?>