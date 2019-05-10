<?php
$room_number = $_GET['room_number'];
$player_role = $_GET['player_role'];

require("connect.php");

?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

		<!--BOOTSTRAP-->
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
		
		<!--CSS-->
		<link rel="stylesheet" type="text/css" href="style.css">
		<!--FONTS-->
		<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
		<!--TITLE-->
		<link rel="shortcut icon" type="image/x-icon" href="">

		<title>INDEX</title>
	</head>

	<body>
		<input id="room_number" type="hidden" value=<?php echo $room_number?>>
		<input id="player_role" type="hidden" value=<?php echo $player_role?>>

		<div class="container">
			<div class="row full_height">

				<div class="col-md-3">
					<img src="">
				</div>


				<div class="col-md-6 put_middle text-center">
					<div class="put_middle_sub w-75">

						<h2 id="whos_turn"></h2>

						<table class="nine_squares w-100">
							<tr>
								<td><div id="block1_1" class="put_middle"></div></td>
								<td><div id="block1_2" class="put_middle"></div></td>
								<td><div id="block1_3" class="put_middle"></div></td>
							</tr>
							<tr>
								<td><div id="block2_1" class="put_middle"></div></td>
								<td><div id="block2_2" class="put_middle"></div></td>
								<td><div id="block2_3" class="put_middle"></div></td>
							</tr>
							<tr>
								<td><div id="block3_1" class="put_middle"></div></td>
								<td><div id="block3_2" class="put_middle"></div></td>
								<td><div id="block3_3" class="put_middle"></div></td>
							</tr>
						</table>

						<a href="index.html" class="btn btn-primary my-2">回遊戲首頁</a>

					</div>
				</div>

				<div class="col-md-3">
					<img src="">
				</div>

			</div>
		</div>


		<!--BOOTSTRAP REQUIRED-->
		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
		<!--JAVASCRIPT-->
		<script type="text/javascript" src="game_board.js"></script>
	</body>
</html>