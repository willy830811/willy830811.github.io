<?php

$room_number = $_GET['room_number'];

require("connect.php");

$data = mysqli_query($link, "select whos_turn from game_record where room_number = $room_number");
$dataf = mysqli_fetch_array($data);

echo $dataf[0];

?>