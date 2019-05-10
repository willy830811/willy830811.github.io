<?php

$room_number = $_GET["room_number"];

require("connect.php");

$data = mysqli_query($link, "select player_2 from game_record where room_number =".$room_number);
$dataf = mysqli_fetch_row($data);
$data_2 = mysqli_query($link, "select player_2_role from game_record where room_number =".$room_number);
$dataf_2 = mysqli_fetch_row($data_2);

$arr = [$dataf[0], $dataf_2[0]];
echo json_encode($arr);

?>