<?php

require("connect.php");

$num = $_GET['num'];
$arr = array();

if ($num == '') {
	$result = mysqli_query($link, "select * from product_info");
	while ($row = mysqli_fetch_row($result)) {
		array_push($arr, $row);
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
}


if ($num > 0 && $num < 100) {
	$result = mysqli_query($link, "select * from product_info where num = $num");
	$row = mysqli_fetch_row($result);
	echo json_encode($row, JSON_UNESCAPED_UNICODE);
}


if ($num == 's') {
	$key_words = $_GET['key_words'];
	$result = mysqli_query($link, "select * from product_info where name like '%".$key_words."%'");
	while ($row = mysqli_fetch_row($result)) {
		array_push($arr, $row);
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
}


if ($num == 'k') {
	$kind = $_GET['kind'];
	$result = mysqli_query($link, "select * from product_info where kind = $kind");
	while ($row = mysqli_fetch_row($result)) {
		array_push($arr, $row);
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
}


if ($num == 'aq_k') {
	$result = mysqli_query($link, "select value from site_info where item = 'kinds'");
	$row = mysqli_fetch_row($result);

	echo $row[0];
}


?>