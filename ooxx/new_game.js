$(document).ready(() => {

let referrer = document.referrer;
console.log(referrer);
if (referrer.indexOf('index.html'))

window.setInterval(detect_player_2,1000);

let room_number = $('#room_number').val();

var xmlHTTP;

function $_xmlHttpRequest() {
	if(window.ActiveXObject) {
		xmlHTTP=new ActiveXObject("Microsoft.XMLHTTP");
	}
	else if(window.XMLHttpRequest) {
		xmlHTTP=new XMLHttpRequest();
	}
}

//每隔一段時間檢查player2是否加入
function detect_player_2() {
	$_xmlHttpRequest();
	xmlHTTP.open("GET", "get_player_2.php?room_number=" + room_number, true);
	xmlHTTP.onreadystatechange = function() {
		if(xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
			let arr = JSON.parse(xmlHTTP.responseText);
			console.log(arr);
			
			if(arr[0] == 1) {
				if(arr[1] == 'o') {
					//document.location.href='game_board.php?room_number='+ room_number +'&player_role=x';
					document.location.replace('game_board.php?room_number='+ room_number +'&player_role=x');
				} else if(arr[1] == 'x') {
					//document.location.href='game_board.php?room_number='+ room_number +'&player_role=o';
					document.location.replace('game_board.php?room_number='+ room_number +'&player_role=o');
				}
			}
		}
	}
	xmlHTTP.send(null);
	}
})