<h1 class="php_words" style="color: #333">
<?php

$random = $_GET['random'];

require("connect.php");


$room_number = rand(1000, 9999);

$data = mysqli_query($link, "select * from game_record where room_number = '$room_number'");
$dataf = mysqli_fetch_row($data);

if ($random == true) {
	if ($dataf == '') {
		mysqli_query($link, "insert into game_record(room_number, whos_turn) values('$room_number', 'r')");
		echo '等待其他玩家與您配對中......';
	} else {
		header("location: new_game.php?random=true");
	}
} else {
	if ($dataf == '') {
		mysqli_query($link, "insert into game_record(room_number) values('$room_number')");
		echo '請您的對手在遊戲首頁點選「加入遊戲」並輸入房間號碼：'.$room_number;
	} else {
		header("location: new_game.php");
	}
}

?>
</h1>

<input id="room_number" type="hidden" value=<?php echo $room_number ?>>

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script type="text/javascript" src="new_game.js"></script>