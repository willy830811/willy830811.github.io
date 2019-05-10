<?php

$squares_id = $_GET['squares_id'];
$room_number = $_GET['room_number'];

require("connect.php");

$data = mysqli_query($link, "select $squares_id from game_record where room_number = $room_number");
$dataf = mysqli_fetch_array($data);

echo $dataf[0];

?>