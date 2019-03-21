<?php

header('Access-Control-Allow-Origin: *');
include "database.php";

$order_id=$_POST['order_id'];

$sql_check="select * from `Orders_NEW` where `Order_ID`='$order_id' AND `Paid`= 0 AND `Confirmed`=1";
$q_check=mysqli_query($db,$sql_check);

$rowcount=mysqli_num_rows($q_check);

if($rowcount>0)
{
 $dane = array();
 $tabela='<table class="table table-striped">
    <thead>
      <tr>
        <th>Produkt</th>
        <th>Ilość</th>
        <th>Cena</th>
      </tr>
    </thead>
    <tbody>';
 $dane=array();
 
 $sql_main="SELECT Products.`Name`,SUM(Orders_NEW.`Amount`) as 'Amount',(SUM((Products.`Price`)*(Orders_NEW.`Amount`))) as 'PRICE' FROM `Orders_NEW` inner join `Products` on Orders_NEW.`Product`=Products.`ID`  AND `Order_ID`='$order_id' AND `Paid`= 0 AND `Confirmed`= 1 group by Products.`Name`";
 
 $dane = $db->query($sql_main);

while($row = $dane->fetch_assoc()) {
    $tabela.="<tr><td>".$row['Name']."</td><td>".$row['Amount']." szt.</td><td>".$row['PRICE']." zł</td></tr>";
}
 

 
 $sql_second="SELECT SUM((Products.`Price`)*(Orders_NEW.`Amount`)) as 'SUMA' FROM `Orders_NEW` inner join `Products` on Orders_NEW.`Product`=Products.`ID`  AND `Order_ID`='$order_id' AND `Paid`= 0 AND `Confirmed`= 1";
 
 $dane_second= array();
 
 $dane_second= $db -> query($sql_second);
 
while($row = $dane_second->fetch_assoc()) {
 
 $tabela.='<thead>
      <tr>
        <th>Łącznie</th>
          <th></th>
        
        <th>'.$row["SUMA"].' zł</th>
      </tr>
    </thead>';
 }
 $tabela.='</table>';
 
 echo($tabela);
}
else
{
	echo "already";
}


 ?>