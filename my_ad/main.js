$(document).ready(() => {




let d = $.deferred;
let shaking = true;

let timer = setInterval(function(){
		$('.box').addClass('box_move_right');
		setTimeout(function(){
			$('.box').removeClass('box_move_right');
			setTimeout(function(){
				$('.box').addClass('box_move_left')
				setTimeout(function(){
					$('.box').removeClass('box_move_left')
				}, 100)
			}, 100)
		}, 100)
}, 400);

$('img.box').on('mouseenter', function() {
	$('.text').slideUp();
	setTimeout(function(){
		clearInterval(timer);
		$('img.dog').removeClass('hide');
		setTimeout(function(){
			$('img.dog').addClass('dog_move');
		}, 100)
		
		$('img.right_hand').removeClass('hide');
		$('img.left_hand').removeClass('hide');
		setTimeout(function(){
			$('img.right_hand').addClass('hand_move');
			$('img.left_hand').addClass('hand_move');
			setTimeout(function(){
				$('img.right_hand').css('z-index', 2).removeClass('hand_move');
				$('img.left_hand').css('z-index', 2).removeClass('hand_move');

			},300)
		}, 100)
	}, 200);
	
	setTimeout(function(){
		$('.animation_block').addClass('animation_block_move');
		$('.background').addClass('background_move');

		setTimeout(function(){
			$('.points').addClass('points_move');
			$('.text_2').slideDown(500);
		}, 1000)

		setTimeout(function(){
			setInterval(function() {
				$('img.dog').addClass('dog_nod');
				setTimeout(function(){
					$('img.dog').removeClass('dog_nod');
				}, 1000)
			}, 2000)
		}, 1000)
		
	}, 2000)

})













})