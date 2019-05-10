$(document).ready(() => {

let room_number = $('#room_number').val();
let player_role = $('#player_role').val();
let whos_turn;
let whos_turn_old;
let gameover;


//棋盤尺寸
let windowHeight = $(window).height();
$('.full_height').height(windowHeight);
$('.nine_squares').height($('.nine_squares').width());
$('.nine_squares tr').height($('.nine_squares').height()*0.3);
$('.nine_squares tr td').width($('.nine_squares').width()*0.3);
//$('.nine_squares tr td div').css('line-height', $('.nine_squares tr td div').height()+'px');


$(window).on('resize', function() {
	windowHeight = $(window).height();
	$('.full_height').height(windowHeight);
	$('.nine_squares').height($('.nine_squares').width());
	$('.nine_squares tr').height($('.nine_squares').height()*0.3);
	$('.nine_squares tr td').width($('.nine_squares').width()*0.3);
	//$('.nine_squares tr td div').css('line-height', $('.nine_squares tr td div').height()+'px');
})



//ajax前置
var xmlHTTP;
function $_xmlHttpRequest() {   
	if(window.ActiveXObject) {
		xmlHTTP=new ActiveXObject("Microsoft.XMLHTTP");
	}
	else if(window.XMLHttpRequest) {
		xmlHTTP=new XMLHttpRequest();
	}
}


//開局or重新整理
$(function(){
	$_xmlHttpRequest();
	xmlHTTP.open("GET","echo_whos_turn.php?room_number="+room_number, true);
	xmlHTTP.onreadystatechange=function() {
		if(xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
			whos_turn_old = xmlHTTP.responseText;
			if (whos_turn_old == player_role) {
				renew_squares();
				console.log('me first!');
				$('#whos_turn').text("輪到你了！");
			} else if (whos_turn_old == 'o' || whos_turn_old == 'x') {
				$('#whos_turn').text("對手思考中...");
			} else {
				//document.location.href = "index.html";
			}
		}
	}
	xmlHTTP.send(null); 
})




let timer = setInterval(renew_whos_turn, 1000);






function renew_whos_turn(){
		console.log('1 sec. passed');
		$_xmlHttpRequest();
		xmlHTTP.open("GET","echo_whos_turn.php?room_number="+room_number, true);
		xmlHTTP.onreadystatechange=function() {
			if(xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
				whos_turn = xmlHTTP.responseText;
				if(whos_turn != whos_turn_old) {
					renew_squares();
				}
			}
		}
		xmlHTTP.send(null);
}


let arr = ['1_1', '1_2', '1_3', '2_1', '2_2', '2_3', '3_1', '3_2', '3_3'];

function renew_squares(){

	let arr_temp = [];

	arr.forEach(function(e){
		$_xmlHttpRequest();
		xmlHTTP.open("GET","ajax_fill_in.php?squares_id="+e+"&room_number="+room_number, false);
		xmlHTTP.onreadystatechange=function() {
			if(xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
				let str=xmlHTTP.responseText;
				document.getElementById('block'+e).innerHTML=str;
				if (str == '') {
					arr_temp.push(e);
				}
			}
		}
		xmlHTTP.send(null);
	})

	if (whos_turn == player_role) {
		renew_listener(arr_temp);
		console.log('my turn!');
		$('#whos_turn').text("輪到你了！");
	} else if (whos_turn == 's') {
		if (whos_turn_old == player_role) {
			$('#whos_turn').text("You win!");
			mark_line('w');
			clearInterval(timer);
		} else {
			$('#whos_turn').text("You lose!");
			mark_line('l');
			clearInterval(timer);
			setTimeout(function() {
				end_game();
			}, 3000);
		}
	}
	whos_turn_old = whos_turn;
}

function renew_listener(arr_temp) {
	arr_temp.forEach(function(e) {
		document.getElementById('block'+e).addEventListener('click', choose_it);
		document.getElementById('block'+e).append(player_role);
		$('#block'+e).addClass('pink');
	})
}





function choose_it(event) {
	let which_square = $(event.currentTarget).attr('id').substr(5);
	
	if(whos_turn == player_role) {
		console.log(which_square + 'clicked');
		$_xmlHttpRequest();
		xmlHTTP.open("GET","choose_it.php?which_square="+which_square+"&player_role="+player_role+"&room_number="+room_number, false);
		xmlHTTP.onreadystatechange=function() {
			if(xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
			
				let str = xmlHTTP.responseText;
				if (str == 'c') {
					console.log('continue');
					$('#whos_turn').text("對手思考中...");
					$('.pink').text('');
					$('.nine_squares div').removeClass('pink');
					arr.forEach(function(e){
						document.getElementById('block'+e).removeEventListener('click', choose_it);
					})
				} else if(str == 's') {
					console.log('stop');
					$('.pink').text('');
					$('.nine_squares div').removeClass('pink');
					arr.forEach(function(e){
						document.getElementById('block'+e).removeEventListener('click', choose_it);
					})
				}
			}
		}
		xmlHTTP.send(null);
	}
}


function mark_line(w_l) {

	let str = '';
	for (let i=1; i<4; i++) {
		for (let j=1; j<4; j++) {
			let x = $('#block'+i+'_'+j).text();
			if (x == '') {
				str = str + 'n';
			} else {
				str = str + x;
			}
		}
	}

	let winner;
	if (w_l == 'w') {
		winner = player_role;
	} else if (w_l == 'l' && player_role == 'o' ) {
		winner = 'x';
	} else if (w_l == 'l' && player_role == 'x' ) {
		winner = 'o';
	}

	let arr_mark = [];
	if (str[0] == winner && str[1] == winner && str[2] == winner) {arr_mark.push('1_1', '1_2', '1_3');}
	if (str[3] == winner && str[4] == winner && str[5] == winner) {arr_mark.push('2_1', '2_2', '2_3');}
	if (str[6] == winner && str[7] == winner && str[8] == winner) {arr_mark.push('3_1', '3_2', '3_3');}
	if (str[0] == winner && str[3] == winner && str[6] == winner) {arr_mark.push('1_1', '2_1', '3_1');}
	if (str[1] == winner && str[4] == winner && str[7] == winner) {arr_mark.push('1_2', '2_2', '3_2');}
	if (str[2] == winner && str[5] == winner && str[8] == winner) {arr_mark.push('1_3', '2_3', '3_3');}
	if (str[0] == winner && str[4] == winner && str[8] == winner) {arr_mark.push('1_1', '2_2', '3_3');}
	if (str[2] == winner && str[4] == winner && str[6] == winner) {arr_mark.push('1_3', '2_2', '3_1');}

	console.log(arr_mark);
	arr_mark.forEach(function(e) {
		$(document.getElementById('block'+e)).addClass('mark');
	})
}

function end_game() {
	$_xmlHttpRequest();
	xmlHTTP.open("GET","end_game.php?room_number="+room_number, true);
	xmlHTTP.onreadystatechange=function() {
		if(xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
			console.log('record deleted');
		}
	}
	xmlHTTP.send(null);
}

	
})