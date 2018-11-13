$(document).ready(() => {









//偵測觸控螢幕 & 放大字體 & 忽略hover

function isMobile() {
	try{
		document.createEvent("TouchEvent"); return true;
	}
	catch(e){
		return false;
	}
}

function bigFontOnPhone() {
	if (isMobile() && $(window).height() > $(window).width()) {
		$('html').css({fontSize: '24px'});
		$('nav ul li').css({lineHeight: '1.5rem', paddingBottom: '1rem'});
	} else {
		$('html').css({fontSize: ''});
		$('nav ul li').css({lineHeight: '', paddingBottom: ''});
	}
}

bigFontOnPhone();

$(window).on('resize', function() {
	bigFontOnPhone();
})

if (isMobile()) {
	$('nav ul li, .a p, .b img, .c .branch-btn, .d .group h3, .detail-btn, .close-btn'
		).addClass('no-hover');
}






//cover語法 需放在導覽列語法前
scaleVideoContainer();
scaleBannerVideoSize('.video-container .poster img');
scaleBannerVideoSize('.video-container video');

$(window).on('resize', function() {
	scaleVideoContainer();
	scaleBannerVideoSize('.video-container .poster img');
	scaleBannerVideoSize('.video-container video');
})

function scaleVideoContainer() {
	let height = $(window).height() + 20;
	let unitHeight = parseInt(height) + 'px';
	let width = $(window).width();
	let unitWidth = parseInt(width) + 'px';
	$('.video-container').css({
		'height': unitHeight,
		'width': unitWidth
	})
}

function scaleBannerVideoSize(element) {
	let windowWidth = $(window).width();
	let windowHeight = $(window).height() + 20;

	if ((windowWidth/windowHeight) > 1920/1080) {
		$(element).each(function(){
			$(this).width(windowWidth).height(windowWidth*(1080/1920));
			$(this).css({'left': 0});
		})
	} else {
		$(element).each(function(){
			$(this).height(windowHeight).width(windowHeight*(1920/1080));
			$(this).css({'left': -(windowHeight*(1920/1080)-windowWidth)*0.5});
		})
	}
}










//導覽列自動隱藏語法
let windowUpperSide = '';
let windowUpperSideOld;
let endOfCover;
let navBarHeight;

function scaleWindowUpperSide() {
	windowUpperSideOld = windowUpperSide;
	windowUpperSide = window.pageYOffset;
}

function scaleEndOfCover() {
	endOfCover = $('#section_bnc').offset().top;
}

function scaleNavBarHeigh() {
	navBarHeight = $('nav').height();
}


scaleWindowUpperSide();
scaleEndOfCover();
scaleNavBarHeigh();

$(window).on('scroll', () => {
	scaleWindowUpperSide();
})

$(window).on('resize', () => {
	scaleWindowUpperSide();
	scaleEndOfCover();
	scaleNavBarHeigh();
})


function navJudgeMobile() {
	if (windowUpperSide >= endOfCover-2 && windowUpperSideOld < endOfCover-2) {
		$('nav').css({
			backgroundColor: 'rgba(160, 82, 45, 0.9)'
		});
	} else if (windowUpperSide < endOfCover-2) {
		$('nav').css({
			backgroundColor: 'rgba(160, 82, 45, ' + (windowUpperSide/endOfCover)*0.9 + ')'
		});
	}
}

function navJudgePC() {
	if (windowUpperSide >= endOfCover-2 && windowUpperSideOld < endOfCover-2) {
		$('nav').animate({
			top: -navBarHeight + 'px'
		}, 200);
		setTimeout("$('nav').css({backgroundColor: 'rgba(160, 82, 45, 0.9)'})", 200);
		$('.arrow').slideDown(200);
	} else if (windowUpperSide < endOfCover-2 && windowUpperSideOld >= endOfCover-2) {
		$('nav').css({
			backgroundColor: 'transparent'
		}).animate({
			top: 0
		}, 200);
		$('.arrow').slideUp(200);
	}	
}

if (isMobile()) {
	navJudgeMobile()
} else {
	navJudgePC()
}

$(window).on('scroll resize', () => {
	if (isMobile()) {
		navJudgeMobile()
	} else {
		navJudgePC()
	}
})

$('.calling-navbar').on('mouseenter', () => {
	if (!isMobile() && windowUpperSide >= endOfCover-2) {
		$('nav').animate({
			top: 0
		}, 200);
		$('.arrow').slideUp(200);
	}
})

$('nav').on('mouseleave', () => {
	if (!isMobile() && windowUpperSide > endOfCover-2) {
		$('nav').animate({
			top: -navBarHeight + 'px'
		}, 200);
		$('.arrow').slideDown(200);
	}
})
















//滾動語法
$('nav ul a').on('click', function(event) {

	let tag = '#' + $(event.currentTarget).attr('id').substr(7);

	if (isMobile()) {
		$('body, html').animate({
			scrollTop: $(tag).position().top - $('nav').height()
		}, 800);
	} else {
		$('body, html').animate({
			scrollTop: $(tag).position().top
		}, 800);
	}
})


	








//項目飛出
setTimeout(() => {
	$('.a h1, h2').slideDown(500)
}, 800);
setTimeout(() => {
	$('.a p').slideDown(500)
}, 1500);










//banner a 置中&寬度
setBannerA();

$(window).on('resize', function() {
	setBannerA();
})

function setBannerA() {
	$('.a').offset({top: $(window).height()*0.2});
}













//banner c--3 columns
let branchNow = $('.branch-btn p:first').text();
$('.branch-btn:first').css({
	backgroundColor: '#FFDEAD',
	height: '3rem'
});

$('.branch-btn').on('click', event => {
	if ($(event.currentTarget).text() != branchNow) {
		
		$('.branch-btn').css({
			backgroundColor: '',
			height: ''
		});
		$(event.currentTarget).css({
			backgroundColor: '#FFDEAD',
			height: '3rem'
		});

		branchNow = $(event.currentTarget).children().text();

		$('.branch-content').slideUp();

		let x;

		for (let i=0; i<3; i++) {
			x = $('.branch-content h2').eq(i);
			if (x.text() == branchNow) {
				x.parent().delay(400).slideDown();
			}
		}
	}
});














//banner d--product區語法

let groupName = ['group1', 'group2', 'group3', 'group4', 'group5']; //加入新元件後可自行改參數
let groupImgNumber = [5, 4, 3, 2, 0]; //加入新元件後可自行改參數
let thumbnailWidth;

let productGroup = 0;

for (let i = 0; i < groupName.length; i++) {
	let newEl = document.createElement('h3');
	let newText = document.createTextNode(groupName[i]);
	newEl.appendChild(newText);
	$('.d .group').append(newEl);
}

//網頁開啟
divProducer();
eventListener();
imgProducer();
magnifierProducer();
nameProducer();
groupBtnUp();

$('.group h3').on('click', event => {
	productGroup = $(event.currentTarget).index();
	divProducer();
	eventListener();
	imgProducer();
	magnifierProducer();
	nameProducer();
	groupBtnUp();
})

function divProducer() {
	let divString = '';
	for (let i = 0; i < groupImgNumber[productGroup]; i++) {
		divString += '<div><div class="for-product"></div><br><p></p></div>';
	}
	$('.d .thumbnail').html(divString);

	$('.d .thumbnail .for-product').css({
		height: $('.d .thumbnail .for-product').width()
	})
}

function eventListener() {
	for (let i = 0; i < groupImgNumber[productGroup]; i++) {
		document.getElementsByClassName("for-product")[i].addEventListener('click', callEnlargement);
	}
}

let thumbnailRatio = [];

function imgProducer() {
	for (let i = 0; i < groupImgNumber[productGroup]; i++) {
		$('.d .thumbnail .for-product').eq(i).html(
			'<img src="image/products/group' + (productGroup + 1) + '_' + (i+1) + '.jpg" class="product-img">'
			);

		$('.d .thumbnail .for-product .product-img').eq(i).on('load', function() {

			thumbnailRatio[i] = $('.d .thumbnail div .product-img').eq(i).height()/$('.d .thumbnail div .product-img').eq(i).width();
			if (thumbnailRatio[i]>1) {
				$('.d .thumbnail div .product-img').eq(i).css({height: $('.d .thumbnail .for-product').width()-10});
			} else {
				$('.d .thumbnail div .product-img').eq(i).css({width: $('.d .thumbnail .for-product').width()-10});
			}
			setTimeout("$('.d .thumbnail>div').css({visibility: 'visible'})", 300);
		})
	}
}

function magnifierProducer() {
	$('.d .thumbnail .for-product').append('<img src="image/magnifier.png" class="magnifier"><img src="image/cross.png" class="cross">');

	for (let i = 0; i < groupImgNumber[productGroup]; i++) {
		document.getElementsByClassName("magnifier")[i].addEventListener('mouseenter', function() {
			$(this).siblings('.cross').hide(200);
		});
		document.getElementsByClassName("magnifier")[i].addEventListener('mouseleave', function() {
			$(this).siblings('.cross').show(200);
		});
	}

	$('.d .thumbnail .for-product .magnifier').width($('.d .thumbnail .for-product').width());
	$('.d .thumbnail .for-product .cross').width($('.d .thumbnail .for-product').width());
	if (isMobile()) {
		$('.d .thumbnail .for-product .magnifier, .d .thumbnail .for-product .cross').addClass('no-hover');
	}
}

function nameProducer() {
	var xhr = new XMLHttpRequest();

	xhr.onload = function() {
		if (xhr.status === 200) {
			console.log(xhr.responseText);
			let productsNames = xhr.responseText.split('/');
			console.log(productsNames);
			for (let j = 0; j < groupImgNumber[productGroup]; j++) {
				$('.d .thumbnail p').eq(j).html(productsNames[j]);
			}
		}
	};
	
	xhr.open("GET", "load_products.php?productGroup=" + productGroup, true);
	xhr.send();
}

function groupBtnUp() {
	$('.group h3').css({
		width: '',
		backgroundColor: ''
	})

	$('.group h3').eq(productGroup).css({
		width: '120%',
		backgroundColor: '#FFC0CB'
	})
}


/* 因為已附加listener所以不需要了
$('.thumbnail .for-product').on('click', function() {
	callEnlargement(event);
})
*/

let enlargementRatio;

function callEnlargement(event) {
	let imgSrc = $(event.currentTarget).children().attr('src');
	$('.enlargement').removeClass('hide');
	$('.enlargement').html(
		'<img src="' + imgSrc + '">' 
		+ '<h2>' + $(event.currentTarget).siblings('p').text() +'</h2>' 
		+ '<h3>Click Anywhere to Go Back</h3>' 
		);
	
	$('.enlargement').css({
		height: $(window).height(),
		width: $(window).width()
	})

	enlargementRatio = $('.enlargement img').height()/$('.enlargement img').width();

	if (enlargementRatio > $(window).height()/$(window).width()) {
		$('.enlargement img').css({
			height: '80%'
		})
	} else {
		$('.enlargement img').css({
			width: '80%'
		})
	}

	$(document).ready(
		$('.enlargement img').css({
			top: ($(window).height()/2 - $('.enlargement img').height()/2) + 'px'
		})
	);

	$('.enlargement h2').css({
		top: ($(window).height()/2 - $('.enlargement img').height()/2) + 'px'
	})

	$('.enlargement').on('click', () => {
		$('.enlargement').addClass('hide');
	})
}



$(window).on('resize', function() {
	$('.d .thumbnail .for-product').css({
		height: $('.d .thumbnail .for-product').width()
	})

	$('.d .thumbnail .for-product .product-img').each(function(i) {
		if (thumbnailRatio[i] > 1) {
			$('.d .thumbnail div .product-img').eq(i).css({height: $('.d .thumbnail .for-product').width()-10});
		} else {
			$('.d .thumbnail div .product-img').eq(i).css({width: $('.d .thumbnail .for-product').width()-10});
		}
	})

	$('.d .thumbnail .for-product .magnifier').width($('.d .thumbnail .for-product').width());
	$('.d .thumbnail .for-product .cross').width($('.d .thumbnail .for-product').width());

	$('.enlargement').css({
		height: $(window).height(),
		width: $(window).width()
	})

	if (enlargementRatio > $(window).height()/$(window).width()) {
		$('.enlargement img').css({
			height: $(window).height()*0.8,
			width: ''
		})
	} else {
		$('.enlargement img').css({
			width: $(window).width()*0.8,
			height: ''
		})
	}

	$(document).ready(
		$('.enlargement img').css({
			top: ($(window).height()/2 - $('.enlargement img').height()/2) + 'px'
		})
	);

	$('.enlargement h2').css({
		top: ($(window).height()/2 - $('.enlargement img').height()/2) + 'px'
	})
});
/*
$('.d .thumbnail .for-product .magnifier').on('mouseenter', function() {
	$(this).siblings('.cross').hide(200);
})
$('.d .thumbnail .for-product .magnifier').on('mouseleave', function() {
	$(this).siblings('.cross').show(200);
})
*/










//banner e--list detail-info
$('.detail-btn').on('click', () => {
	$('.load_aarl').slideToggle(500);
});










})