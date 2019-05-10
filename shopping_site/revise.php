<?php

require("connect.php");

$act = $_POST['act'];
if ($act == 'add_product') {
	$name = $_POST['name'];
	$kind = $_POST['kind'];
	$price = $_POST['price'];
	$introduction = $_POST['introduction'];
	$img_route = 'image/'.$_POST['img_route'];

	$sql_insert = "INSERT INTO product_info (name, kind, price, introduction, img_route) VALUES ('$name', '$kind', '$price', '$introduction', '$img_route')";
	mysqli_query($link, $sql_insert);
}

header ( 'Location: backstage.php');
exit;

?>