<?php

$sql="SELECT * FROM `Users` WHERE Phone = '$numer' AND Password = '$pass'";
$dane= new array();
$dane[0] = $row['Name'];
$dane[1] = $row['Surame'];
if ($result=mysqli_query($db,$sql))
  {
  // Return the number of rows in result set
  $rowcount=mysqli_num_rows($result);
	
	if($rowcount==1)
	{
		echo($dane);
	}

  mysqli_free_result($result);
  }

mysqli_close($db);


?>