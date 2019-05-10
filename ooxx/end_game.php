<?php

$room_number = $_GET['room_number'];

require("connect.php");

mysqli_query($link, "delete from game_record where room_number = $room_number");



?>