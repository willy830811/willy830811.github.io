<?php
require("connect.php");

mysql_select_db("pas_data");

date_default_timezone_set("Asia/Taipei");
$date=date("Y-m-d H:i:s");
$name=$_POST["name"];
$email=$_POST["email"];
$comments=$_POST["comments"];

mysql_query("insert into pas_questionnaire value ('', '$date', '$name', '$email','$comments')");

header('Location: board.php');
exit;
?>