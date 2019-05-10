<?php

$room_number = $_GET["room_number"];
$random = $_GET['random'];

require("connect.php");

$data = mysqli_query($link, "select * from game_record where room_number = '$room_number'");
$dataf = mysqli_fetch_array($data);

if ($dataf == '') {
	echo 'invalid!';
} else {
	mysqli_query($link, "update game_record set player_2=true where room_number='$room_number'");
	mysqli_query($link, "update game_record set whos_turn='x' where room_number='$room_number'");
	$player_2_role = rand(0,1);
	if ($player_2_role == 0){
		mysqli_query($link, "update game_record set player_2_role = 'o' where room_number='$room_number'");
		mysqli_query($link, "update game_record set player_2=true where room_number='$room_number'");
		header('Location: game_board.php?room_number='.$room_number.'&player_role=o');
	} else {
		mysqli_query($link, "update game_record set player_2_role = 'x' where room_number='$room_number'");
		mysqli_query($link, "update game_record set player_2=true where room_number='$room_number'");
		header('Location: game_board.php?room_number='.$room_number.'&player_role=x');
	}
}

?>