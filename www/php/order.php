<?php

header('Access-Control-Allow-Origin: *');
 include "database.php";

 $who=$_POST['name'];
 $who_id=$_POST['user_id'];
 $schab=$_POST['schab'];
 $kurczak=$_POST['kurczak'];
 $dewo=$_POST['dewo'];
 $cena=$_POST['cena'];
 
 $sql="INSERT INTO `Orders` (`Who`,`Who_ID`,`Schab_AMOUNT`,`Kurczak_AMOUNT`,`Dewo_AMOUNT`,`Price`) VALUES ('$who','$who_id','$schab','$kurczak','$dewo','$cena')";
 
 
 $sql_check="SELECT * FROM `Orders` WHERE Who = '$who' AND Who_ID = '$who_id'";
 
 $check_query=mysqli_query($db,$sql_check);
 
 $rowcount=mysqli_num_rows($check_query);
 
 if($rowcount==0)
 {
 $q=mysqli_query($db,$sql);
 echo "success";
 }
 else
 {
	 echo "fail";
 }

 
 ?>