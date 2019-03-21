<?php

header('Access-Control-Allow-Origin: *');
include "database.php";

$order_id=$_POST['order_id'];

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
 
 $sql_main="SELECT Products.`Name`,Orders_NEW.`Amount`,((Products.`Price`)*(Orders_NEW.`Amount`)) as 'PRICE' FROM `Orders_NEW` inner join `Products` on Orders_NEW.`Product`=Products.`ID`  AND `Order_ID`='$order_id'";
 
 $dane = $db->query($sql_main);

while($row = $dane->fetch_assoc()) {
    $tabela.="<tr><td>".$row['Name']."</td><td>".$row['Amount']."szt.</td><td>".$row['PRICE']."zł</td></tr>";
}
 

 
 $sql_second="SELECT SUM((Products.`Price`)*(Orders_NEW.`Amount`)) as 'SUMA' FROM `Orders_NEW` inner join `Products` on Orders_NEW.`Product`=Products.`ID`  AND `Order_ID`='$order_id'";
 
 $dane_second= array();
 
 $dane_second= $db -> query($sql_second);
 
while($row = $dane_second->fetch_assoc()) {
 
 $tabela.='<thead>
      <tr>
        <th>Łącznie</th>
          <th></th>
        
        <th>'.$row["SUMA"].'zł</th>
      </tr>
    </thead>';
 }
 $tabela.='</table>';
 echo($tabela);
 


 ?>