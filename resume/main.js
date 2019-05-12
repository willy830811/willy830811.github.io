$(document).ready(() => {

//調整頁首
let windowHeight = $(window).height();
let windowWidth = $(window).width();
$('.full').height(windowHeight);
$('.full').width(windowWidth);

$(window).on('resize', function() {
	windowHeight = $(window).height();
	windowWidth = $(window).width();
	$('.full').height(windowHeight);
	$('.full').width(windowWidth);
})



//調整自傳區
$('#biography').width(windowWidth);
//$('#biography #hide_bar').ready(() => {
	$('#biography #hide_bar').width($('#biography #hide_bar').height())
//})

//偵測視窗頂位置
let window_top = $(window).scrollTop();
//console.log('window_top: ' + window_top);

$(window).on('resize scroll', function() {
	window_top = $(window).scrollTop();
	//console.log('window_top: ' + window_top);
})


//飄移背景
let skill_top = $('#skill').offset().top;
console.log(skill_top);

$(window).on('resize scroll', function() {
	$('.moving_background').css('top', window_top * 0.7 - skill_top +'px');
})

//頁首
let header_top = $('#header h1').offset().top;
let header_height = $('#header h1').height();

$(window).on('resize', function() {
	header_top = $('#header h1').offset().top;
	header_height = $('#header h1').height();
})

$('#header h1').css('top', header_top + header_height*0.5 - window_top*0.1 +'px');

$(window).on('resize scroll', function() {
	$('#header h1').css({'top': header_top + header_height*0.5 - window_top*0.5 +'px',
		'opacity': 0.8 - window_top/windowHeight*2});
})


//自傳
let biography_top = $('#biography').offset().top;
//console.log('biography_top: ' + biography_top);
let biography_height = $('#biography').height();
//console.log('biography_height: ' + biography_height);

$(window).on('resize', function() {
	biography_top = $('#biography').offset().top;
	//console.log('biography_top: ' + biography_top);
	biography_height = $('#biography').height();
	//console.log('biography_height: ' + biography_height);
})


$(window).on('resize scroll', function() {
	if (window_top > biography_top - (windowHeight - biography_height)/2 ) {
		$('#biography #big_head img').addClass('big_head_move');
		//$('#biography #big_head img.me').eq(1).addClass('big_head_wipe');
	}
})


$('#big_head .me').on('mouseenter', function() {
	$('#hide_bar img').addClass('hide_bar_move');

	$('#big_head .me').on('mouseleave', function() {
		$('#hide_bar img').removeClass('hide_bar_move');
	})
})

$('#biography #bio_text').css('left', $('#big_head').height());
$('#biography #bio_text').css('width', $('#big_head').width() - $('#big_head').height());




//簡歷
for (let i = 0; i < 3; i++) {
	let bar_length = $('#bar').width();
	let bar_left = $('#bar').offset().left;
	$('.dot').eq(i).css('left', bar_left + bar_length/2*i+'px');
}

let experience_now = 0;

$('.dot').on('click', function(){
	if ($('.dot').index($(this)) != experience_now) {
		experience_now = $('.dot').index($(this));
			$('.bubble').slideUp();
			$('.dot').css('border', '');
			$('.bubble').eq(experience_now).delay(600).slideDown();
	}
})



$('.dot').on('mouseenter', function() {
	if ($('.dot').index($(this)) != experience_now) {
		$(this).css('border', '3px #900 solid');
		$('.dot img').css('display', 'none');
		$(this).find('img').css('display', 'inline');

		$('.dot').on('mouseleave', function() {
			$(this).css('border', '');
			$(this).find('img').css('display', 'none');
			$('.dot img').eq(experience_now).css('display', 'inline');
		})
	


	}
})






//技能

//let skill_top = $('#skill').offset().top;
let skill_scroll;
let quit_scroll_bar;


let skill_width = $('#skill .skill_bar').width();
if (windowWidth > 768) {
$('.skill_bar').css('left', -skill_width);
}


skill_scroll = window_top + windowHeight - skill_top;

if (windowWidth > 768) {
if (skill_scroll > 0 && quit_scroll_bar != 1) {
	quit_scroll_bar = 1;
	$('.skill_bar').css('left', '0');
	$('.skill_bar_content').eq(0).slideDown();
}
}

$(window).on('scroll', function(){

	if (windowWidth > 768) {
		skill_scroll = window_top + windowHeight - skill_top;
		if (skill_scroll > 0 && quit_scroll_bar != 1) {
			$('.skill_bar').css('left', -skill_width + skill_scroll/(windowWidth*0.5)*skill_width +'px');
			if (skill_scroll > windowWidth*0.5) {
				$('.skill_bar').css('left', '0');
				$('.skill_bar_content').eq(0).slideDown();
				quit_scroll_bar = 1;
			}
		}
	}
})




$('.skill_bar').on('click', function(){
	$('.skill_bar').removeClass('skill_bar_clicked');
	$(this).addClass('skill_bar_clicked');
	$('.skill_bar_content').slideUp();
	$('.skill_bar_content').eq($(this).index()).delay(500).slideDown();

})

//作品
$('#works .carousel-inner p').css('display', 'none');

$('#works .carousel-inner').on('mouseenter', function() {
	$(this).find('p').show();
	$(this).find('h5').hide();

	$('#works .carousel-inner').on('mouseleave', function() {
		$(this).find('p').hide();
		$(this).find('h5').show();
	})

})


})