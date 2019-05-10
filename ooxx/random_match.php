<?php

require("connect.php");


//隨機配對後家
$data = mysqli_query($link, "select room_number from game_record where whos_turn = 'r'");
$dataf = mysqli_fetch_row($data);

if ($dataf == '') {
	header("location: new_game.php?random=true");
	/*
	$room_number = rand(1000, 9999);

	$datas = mysql_query("select * from game_record where room_number = '$room_number'");
	$datasf = mysql_fetch_row($datas);

	if ($dataf == '') {
		mysql_query("insert into game_record(room_number whos_turn) values('$room_number' 'r')");
		echo '等待其他玩家與您配對中......';
	} else {
		header("location: new_game.php");
	}
	*/			
} else {
	header("location: old_game.php?random=true&room_number=".$dataf[0]);
}

?>