<?php

$which_square = $_GET['which_square'];
$room_number = $_GET['room_number'];
$player_role = $_GET['player_role'];

require("connect.php");

mysqli_query($link, "update game_record set $which_square = '$player_role' where room_number = $room_number");


$str = '';


for ($i=1; $i<4; $i++) {
	for ($j=1; $j<4; $j++) {
		$datas = mysqli_query($link, "select $i"."_"."$j from game_record where room_number = $room_number");
		$datasf = mysqli_fetch_row($datas);

		if ($datasf[0] == '') {
			$str = $str.'n';
		} else {
			$str = $str.$datasf[0];
		}
	}
}


if ($str[0] == $player_role && $str[1] == $player_role && $str[2] == $player_role
	|| $str[3] == $player_role && $str[4] == $player_role && $str[5] == $player_role
	|| $str[6] == $player_role && $str[7] == $player_role && $str[8] == $player_role
	|| $str[0] == $player_role && $str[3] == $player_role && $str[6] == $player_role
	|| $str[1] == $player_role && $str[4] == $player_role && $str[7] == $player_role
	|| $str[2] == $player_role && $str[5] == $player_role && $str[8] == $player_role
	|| $str[0] == $player_role && $str[4] == $player_role && $str[8] == $player_role
	|| $str[2] == $player_role && $str[4] == $player_role && $str[6] == $player_role) {
	mysqli_query($link, "update game_record set who_wins = '$player_role' where room_number = $room_number");
	mysqli_query($link, "update game_record set whos_turn = 's' where room_number = $room_number");
	echo 's';
} else {
	if($player_role == 'o') {
		mysqli_query($link, "update game_record set whos_turn = 'x' where room_number = $room_number");
	} elseif($player_role == 'x') {
		mysqli_query($link, "update game_record set whos_turn = 'o' where room_number = $room_number");
	}
	echo 'c';
}

?>