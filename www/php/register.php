<?php

header('Access-Control-Allow-Origin: *'); //potrzebne na rzecz testów
include "database.php"; //łączenie z bazą danych

 $name=$_POST['name'];
 $surname=$_POST['surname'];
 $numer=$_POST['numer'];
 $klasa=$_POST['klasa'];
 $pass=$_POST['pass'];
 
   $name = stripslashes($name);
   $surname = stripslashes($surname);
   $pass = stripslashes($pass);
   $name = mysqli_real_escape_string($db, $name);
   $surname = mysqli_real_escape_string($db, $surname);
   $pass = mysqli_real_escape_string($db, $pass);
 
 $salt='73c9cd';
 $pass=sha1($pass);
 $pass=($pass.$salt);

 // spawdzenie czy konto już istnieje

 $sql_check="SELECT * FROM `Users` where `Phone`='$numer'";
 $q_check=mysqli_query($db,$sql_check);
 
  $rowcount=mysqli_num_rows($q_check);
  
  if($rowcount==0)
  {
 $q=mysqli_query($db,"INSERT INTO `Users` (`Name`,`Surname`,`Phone`,`Password`,`Class`) VALUES ('$name','$surname','$numer','$pass','$klasa')");
 echo $q;
 if($q)
  echo ($name);
 else
  echo "Niestety rejestracja nie powiodła się, sprawdź połączenia z internetem i spróbuj jeszcze raz";
  }
  else
  {
	  echo "already";
  }
 


 ?>