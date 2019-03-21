<?php

header('Access-Control-Allow-Origin: *');
include "database.php";

 $return='';
 
  $dane=array();
 
 $sql_main="SELECT * FROM `Products`";
 
 $dane = $db->query($sql_main);
 
 while($row = $dane->fetch_assoc()) {
$return.='<div class="test-full" >
<div class="test-side">
<input type="button"  value="-"  class="guzik btn btn-default" onclick="Amount(this)"/>
</div>
<div class="test-center-a">'.$row["Name"].'<div class="test-center-b">
<p class="Amount-return" id='.$row["ID"].'>0</p>

<p class="Cena-produktu">Cena:'.$row["Price"].'</p></div></div>
<div class="test-side">
<input type="button" value="+"  class="guzik btn btn-default" onclick="Amount(this)"/>
</div>
 </div>';}


echo ($return);



 ?>