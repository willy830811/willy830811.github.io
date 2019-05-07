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
	$('nav ul li, .a p, .b img, .c .branch-btn, .d .group h3, .detail-btn, .close-btn, .enlargement .x'
		).addClass('no-hover');
	$('.video-container').addClass('no-video');
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

let productsNames = [
	['Process Monitoring and Safety', 'Combustion Control and Heating Value', 'Leak Detection and Oil-In-Water', 'Leak Detection and Arrest (LDAR)', 'Tank Farms'],
	['Continuous Emission Monitoring System (CEMS)', 'Quality Control for High Purity Gas', 'Water and Waste Water', 'Sampling Systems and Analyzer Protection'],
	['Water Removal from Oil Fuel Hydrocarbon Liquid', 'Fuel Oil Auto Sampling System', 'Pump'],
	['Pressure Control, Backpressure Control and Control Valve', 'Hands On Sampling System Training']
];//加入新元件後可自行改參數

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
		document.getElementsByClassName("for-product")[i].addEventListener('touchend', callEnlargement);
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
	
	for (let j = 0; j < groupImgNumber[productGroup]; j++) {
		$('.d .thumbnail p').eq(j).html(productsNames[productGroup][j]);
	}
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
		'<img src="' + imgSrc + '" class="enlarge-pic">' 
		+ '<h2>' + $(event.currentTarget).siblings('p').text() +'</h2>' 
//		+ '<h3>Click Anywhere to Go Back</h3>' 
		+ '<img src="image/x.png" class="x">'
		);

	$('.enlargement').css({
		height: $(window).height(),
		width: $(window).width()
	})

	enlargementRatio = $('.enlargement .enlarge-pic').height()/$('.enlargement .enlarge-pic').width();

	if (enlargementRatio > $(window).height()/$(window).width()) {
		$('.enlargement .enlarge-pic').css({
			height: '80%'
		})
		$('.enlargement .enlarge-pic').on('load', function() {
			$('.enlargement .x').css({
				position: 'fixed',
				top: '10%',
				right: ($(window).width()-$('.enlargement .enlarge-pic').width())/2,
				width: '3rem'
			})
			$('.enlargement .enlarge-pic').css({
				top: ($(window).height()/2 - $('.enlargement .enlarge-pic').height()/2) + 'px'
			})
		})
	} else {
		$('.enlargement .enlarge-pic').css({
			width: '80%'
		})
		$('.enlargement .enlarge-pic').on('load', function() {
			$('.enlargement .x').css({
				position: 'fixed',
				top: ($(window).height()-$('.enlargement .enlarge-pic').height())/2,
				right: '10%',
				width: '3rem'
			})
			$('.enlargement .enlarge-pic').css({
				top: ($(window).height()/2 - $('.enlargement .enlarge-pic').height()/2) + 'px'
			})
		})
	}

/*
	$('.enlargement .x').css({
		position: 'fixed',
		top: '10%',
		right: ($(window).width()-$('.enlargement .enlarge-pic').width())/2,
		width: '3rem'
	})
*/
	$('.enlargement h2').css({
		top: ($(window).height()/2 - $('.enlargement .enlarge-pic').height()/2) + 'px'
	})

	$('.enlargement .x').on('click', function() {
		$(this).parent().addClass('hide');
	})

	//$('.enlargement .x').on('touchstart', function() {
		$('.enlargement .x').on('touchend', function() {
			$(this).parent().addClass('hide');
		})
	//})
/*
	$('.enlargement').on('click touchstart', () => {
		$('.enlargement').addClass('hide');
	})
*/
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
		$('.enlargement .enlarge-pic').css({
			height: $(window).height()*0.8,
			width: ''
		})
		$('.enlargement .x').css({
			position: 'fixed',
			top: '10%',
			right: ($(window).width()-$('.enlargement .enlarge-pic').width())/2,
			width: '3rem'
		})
	} else {
		$('.enlargement .enlarge-pic').css({
			width: $(window).width()*0.8,
			height: ''
		})
		$('.enlargement .x').css({
			position: 'fixed',
			top: ($(window).height()-$('.enlargement .enlarge-pic').height())/2,
			right: '10%',
			width: '3rem'
		})
	}

	$(document).ready(
		$('.enlargement .enlarge-pic').css({
			top: ($(window).height()/2 - $('.enlargement .enlarge-pic').height()/2) + 'px'
		})
	);

	$('.enlargement h2').css({
		top: ($(window).height()/2 - $('.enlargement .enlarge-pic').height()/2) + 'px'
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
	$('.load_aarl .put-list').html('<table><tr><th>Year</th><th>Application</th><th>Location</th></tr><tr><td>2018</td><td>Lab Sampler for Sour Water Service</td><td>Singapore</td></tr><tr><td>2018</td><td>Steam Condensate pH system</td><td>Singapore</td></tr><tr><td>2018</td><td>H2 Analyzer Sampling System</td><td>Middle east</td></tr><tr><td>2018</td><td>Sample Recovery Pump for Fuel</td><td>Singapore</td></tr><tr><td>2018</td><td>Zirconia O2 Furnace Sampling System</td><td>Singapore</td></tr><tr><td>2018</td><td>Mini-Galaxy System for Water Removal from Fuel</td><td>Singapore</td></tr><tr><td>2018</td><td>Injection Quill for Offshore FPSO</td><td>Singapore</td></tr><tr><td>2018</td><td>pH and Conductivity Sampling System for Hypochloride Service</td><td>Singapore</td></tr><tr><td>2018</td><td>CO and O2 Analyzer System for Cement Kiln and Cyclone Separator</td><td>Indonesia</td></tr><tr><td>2018</td><td>TDL O2 Analyzer System for Waste Gas to Furnace</td><td>Singapore</td></tr><tr><td>2018</td><td>Mercury Analyzer System for Natural Gas</td><td>Singapore</td></tr><tr><td>2018</td><td>Merlin Cyclone for Gas Analyzer Protection</td><td>France</td></tr><tr><td>2018</td><td>Wobbe Index Analyzer for Natural gas and Waste Gas to Furnace</td><td>Singapore</td></tr><tr><td>2018</td><td>Pygas Sampler and Pneumatic Unplugger for Ethylene Cracker</td><td>Malaysia</td></tr><tr><td>2018</td><td>pH and Conductivity Sampling System for HCl Service</td><td>Singapore</td></tr><tr><td>2018</td><td>Retractable pH Sample System for Incinerator Waste Water</td><td>Singapore</td></tr><tr><td>2018</td><td>Singa Galaxy for Water Removal from Emulsified Fuel</td><td>France</td></tr><tr><td>2018</td><td>Sample Probe for Ethylene Oxide Reactor Outlet Service</td><td>Singapore</td></tr><tr><td>2018</td><td>Ethylene Furnace GC Sampling System</td><td>Singapore</td></tr><tr><td>2018</td><td>Dew Point Analyzer System</td><td>Singapore</td></tr><tr><td>2018</td><td>Trace O2 Analyzer System for N2 Tank Blanketing Service</td><td>Singapore</td></tr><tr><td>2018</td><td>pH, Conductivity, Acid Conductivity Sampling System for Boiler Steam Condensate</td><td>Singapore</td></tr><tr><td>2018</td><td>Crude Oil Isokinetic Sampling</td><td>Singapore</td></tr><tr><td>2018</td><td>Sampling System for Ammonia Analyzer</td><td>Middle east</td></tr><tr><td>2018</td><td>GC Analyzer System for Acidic Acid Plant</td><td>Singapore</td></tr><tr><td>2017</td><td>Steam Sample Probe</td><td>Singapore</td></tr><tr><td>2017</td><td>Process Sample Probe</td><td>Malaysia</td></tr><tr><td>2017</td><td>Process Sample Probe</td><td>Middle east</td></tr><tr><td>2017</td><td>Control Valve for Pharmaceutical Plant</td><td>Singapore</td></tr><tr><td>2017</td><td>Process Monel Steam Cooler</td><td>Singapore</td></tr><tr><td>2017</td><td>Process SS316 Steam Cooler</td><td>Singapore</td></tr><tr><td>2017</td><td>Portable Catalytic Regeneration O2/CO Analyzer</td><td>Singapore</td></tr><tr><td>2017</td><td>Infrared Gas Imaging Camera for Natural Gas</td><td>Singapore</td></tr><tr><td>2017</td><td>Pressure or Flow Control Valve for Pharmaceutical Plant</td><td>Singapore</td></tr><tr><td>2017</td><td>pH, Acid and Conductivity Sampling System for Steam Quality</td><td>Singapore</td></tr><tr><td>2017</td><td>Insitu Trace O2 Analyzer System for Tank Farm</td><td>Singapore</td></tr><tr><td>2017</td><td>Sample Quill for FPSO</td><td>Singapore</td></tr><tr><td>2017</td><td>Pump for THF Service in Pharmaceutical Plant</td><td>Singapore</td></tr><tr><td>2017</td><td>Lab Sampler for Sour Water Service</td><td>Singapore</td></tr><tr><td>2017</td><td>Fixed Sample probe for FSO Crude Oil Service</td><td>Singapore</td></tr><tr><td>2017</td><td>TDL O2 Analyzer System for Waste Gas to Furnace</td><td>Singapore</td></tr><tr><td>2017</td><td>Sample Recovery Pump for Fuel</td><td>Singapore</td></tr><tr><td>2017</td><td>Merlin Cyclone for Gas Analyzer Protection</td><td>France</td></tr><tr><td>2017</td><td>Customized PVDF Merlin Liquid Cyclone Separator for Sea Water Service</td><td>France</td></tr><tr><td>2017</td><td>Customized PVDF Merlin Liquid Cyclone Separator for Sea Water Service</td><td>Singapore</td></tr><tr><td>2017</td><td>Reverse Osmosis Membrane R&D Skid</td><td>Singapore</td></tr><tr><td>2017</td><td>Merlin Cyclone for Instrument Air Moisture Protection</td><td>Singapore</td></tr><tr><td>2017</td><td>Wastewater 4 in 1 Analyzer Discharge to Sea</td><td>Singapore</td></tr><tr><td>2017</td><td>Singa Galaxy for Water Removal from Emulsified Fuel</td><td>Singapore</td></tr><tr><td>2017</td><td>TDL O2 Analyzer Sampling System for Furnace</td><td>Singapore</td></tr><tr><td>2017</td><td>Hydrocarbon Leakage in Heat Exchanger Analyzer System</td><td>Singapore</td></tr><tr><td>2017</td><td>Metallurgy Coating R&D Skid</td><td>Singapore</td></tr><tr><td>2017</td><td>Hydrocarbon Leak Detection in Refinery</td><td>Singapore</td></tr><tr><td>2017</td><td>Sample Recovery Pump for Fuel</td><td>Singapore</td></tr><tr><td>2017</td><td>Lime Kiln Auto Rodding Sample Probe</td><td>Indonesia</td></tr><tr><td>2017</td><td>PTFE R&D Electrochemical Cell Block</td><td>Singapore</td></tr><tr><td>2017</td><td>Trace H2S for Waste Water Analyzer System</td><td>Singapore</td></tr><tr><td>2017</td><td>Pour Point Sampling System for Refinery</td><td>Singapore</td></tr><tr><td>2017</td><td>GC Analyzer System for Refinery x3</td><td>Singapore</td></tr><tr><td>2017</td><td>Moisture Analyzer System for Butane Service</td><td>Singapore</td></tr><tr><td>2017</td><td>Moisture Analyzer System for H2 Quality Monitoring</td><td>Singapore</td></tr><tr><td>2017</td><td>Sampling System for Polyethylene Plant</td><td>Singapore</td></tr><tr><td>2017</td><td>Dewpoint Analyzer System for Butadiene Plant</td><td>Singapore</td></tr><tr><td>2017</td><td>Sample Recovery Pump for Fuel</td><td>Middle east</td></tr><tr><td>2017</td><td>TDL O2 Analyzer System for Waste Gas to Furnace</td><td>Singapore</td></tr><tr><td>2017</td><td>Sampling System for Styrene Monomer Plant</td><td>Singapore</td></tr><tr><td>2017</td><td>Mercury Analyzer System for Natural Gas</td><td>Singapore</td></tr><tr><td>2016</td><td>Manual Sampling System for FPSO x 2</td><td>Singapore</td></tr><tr><td>2016</td><td>Trace O2 Analyzer System for 1-3 Butadiene Service</td><td>Singapore</td></tr><tr><td>2016</td><td>Singa Galaxy for Water Removal from Emulsified Fuel</td><td>Singapore</td></tr><tr><td>2016</td><td>Analyzer System for Biogas Application</td><td>Singapore</td></tr><tr><td>2016</td><td>Bluesens CO2 Analyzer System for Refinery Catalytic Regeneration</td><td>Singapore</td></tr><tr><td>2016</td><td>Merlin Cyclone for Crack Kerosene Service</td><td>Singapore</td></tr><tr><td>2016</td><td>Opgal Camera for LDAR in Gas Station</td><td>Singapore</td></tr><tr><td>2016</td><td>O2/COe Analyzer System for refinery furnace x 6</td><td>Singapore</td></tr><tr><td>2016</td><td>Dual Inconel Coil Cooler for steam application x3</td><td>Singapore</td></tr><tr><td>2016</td><td>Diaphgram pump for high pressure</td><td>Singapore</td></tr><tr><td>2016</td><td>Gas Recovery System for Natural Gas</td><td>Singapore</td></tr><tr><td>2016</td><td>H2S Analyzer System for water reclamation plant</td><td>Singapore</td></tr><tr><td>2016</td><td>Merlin Cyclone for Gas Analyzer Protection</td><td>France</td></tr><tr><td>2016</td><td>Waste Water Analyzer System x 2</td><td>Singapore</td></tr><tr><td>2016</td><td>Cooler for Analyzer System x 31</td><td>Middle east</td></tr><tr><td>2016</td><td>Trace O2 Analyzer System for Refinery Catalytic Regeneration</td><td>Singapore</td></tr><tr><td>2016</td><td>Liquid Recovery Pump for Refinery Project</td><td>Middle east</td></tr><tr><td>2016</td><td>Ethylene Cracker Moisture Sampling System</td><td>Malaysia</td></tr><tr><td>2016</td><td>AT-4305 H2 Analyzer with Sampling System</td><td>Singapore</td></tr><tr><td>2016</td><td>AT-4802 H2 Analyzer with Sampling System</td><td>Singapore</td></tr><tr><td>2016</td><td>FID Analyzer System for Instrument Air</td><td>Singapore</td></tr><tr><td>2016</td><td>FID Analyzer System for Cooling Tower</td><td>Singapore</td></tr><tr><td>2016</td><td>Trace O2 Analyzer System for 1-3 Butadiene Service</td><td>Malaysia</td></tr><tr><td>2016</td><td>O2 Analyzer System for Natural Gas Boiler x3</td><td>Singapore</td></tr><tr><td>2016</td><td>Control Valve for Pharmaceutical Plant x11</td><td>Singapore</td></tr><tr><td>2016</td><td>pH Sampling System for Sea Water Application</td><td>Singapore</td></tr><tr><td>2016</td><td>Mercury Analyzer System for Natural Gas Main Station</td><td>Singapore</td></tr><tr><td>2016</td><td>AT-4315 CO Analyser System</td><td>Singapore</td></tr><tr><td>2015</td><td>Sample Injection Quill for FPSO</td><td>Singapore</td></tr><tr><td>2015</td><td>Extractive TDL Oxygen Analyzer System for Waste Gas</td><td>Singapore</td></tr><tr><td>2015</td><td>Oxygen Analyzer System for NaOH plant</td><td>Indonesia</td></tr><tr><td>2015</td><td>Sampling System for Polyethylene Plant</td><td>Singapore</td></tr><tr><td>2015</td><td>Lab Sampling System for Super Heated Steam Condensate</td><td>Singapore</td></tr><tr><td>2015</td><td>AT-78002A/BGC GC Analyzer Sampling System for Refinery</td><td>Singapore</td></tr><tr><td>2014</td><td>Singa Galaxy for Water Removal from Emulsified Fuel</td><td>Singapore</td></tr><tr><td>2014</td><td>Singa Galaxy for Water Removal from Emulsified Fuel</td><td>Singapore</td></tr><tr><td>2014</td><td>Pygas Sampler and Pneumatic Unplugger for Ethylene Cracker</td><td>Singapore</td></tr><tr><td>2014</td><td>X-ray Sulphur Analyzer System for Asphalt/Bitumen</td><td>Singapore</td></tr><tr><td>2014</td><td>Merlin Cyclone for Gas Analyzer Protection</td><td>Singapore</td></tr><tr><td>2014</td><td>Cyclone Sampling System for Refinery</td><td>Singapore</td></tr><tr><td>2014</td><td>Cyclone Sampling System for Ethylene Cracker</td><td>Singapore</td></tr><tr><td>2014</td><td>Cyclone Sampling System for Flare Gas Oxygen Analyzer</td><td>Singapore</td></tr><tr><td>2014</td><td>CO and CO2 Analyzer System for Propylene Plant</td><td>Singapore</td></tr><tr><td>2014</td><td>Opgal Camera for LDAR in Gas Station</td><td>Singapore</td></tr><tr><td>2014</td><td>CO Analyzer System for CEMS</td><td>Singapore</td></tr><tr><td>2013</td><td>Cyclone Sampling System for Zinc Oxide Reactor</td><td>Singapore</td></tr><tr><td>2013</td><td>Cyclone Sampling System for 1-3-Butadiene Plant</td><td>Malaysia</td></tr><tr><td>2013</td><td>CEMS Analyzer System</td><td>Indonesia</td></tr><tr><td>2013</td><td>GC Analyzer Sampling System</td><td>Indonesia</td></tr><tr><td>2013</td><td>Singa Galaxy for Water Removal from Emulsified Fuel</td><td>Singapore</td></tr><tr><td>2013</td><td>Manual Sampling System for FPSO</td><td>Singapore</td></tr><tr><td>2013</td><td>pH Sampling System</td><td>Singapore</td></tr><tr><td>2013</td><td>Singa Galaxy for Water Removal from Emulsified Fuel</td><td>Singapore</td></tr><tr><td>2013</td><td>Sample Injection Quil</td><td>Singapore</td></tr><tr><td>2013</td><td>H2 Analyzer Sampling System</td><td>Middle east</td></tr><tr><td>2013</td><td>CEMS Sampling probe</td><td>Singapore</td></tr><tr><td>2013</td><td>Extractive TDL CO Analyzer Sampling System</td><td>Indonesia</td></tr><tr><td>2013</td><td>CEMS Sampling System</td><td>Indonesia</td></tr><tr><td>2013</td><td>Insitu TDL Oxygen Analyzer System for Stack</td><td>Singapore</td></tr><tr><td>2013</td><td>TOC Sampling System for Sea Water TOC</td><td>Singapore</td></tr><tr><td>2013</td><td>Manual Sampling System for FPSO</td><td>Singapore</td></tr><tr><td>2013</td><td>Liquid GC Analyzer Sampling System</td><td>Singapore</td></tr><tr><td>2013</td><td>GC Analyzer Sampling System</td><td>Singapore</td></tr><tr><td>2013</td><td>Extractive TDL CO Analyzer System for Furnace</td><td>Singapore</td></tr><tr><td>2013</td><td>GC Analyzer System for Natural Gas</td><td>India</td></tr><tr><td>2013</td><td>Conductivity Analyzer System</td><td>Middle east</td></tr><tr><td>2013</td><td>Opacity & Dust meter for Stack</td><td>Middle east</td></tr><tr><td>2013</td><td>Pre-Conditioning and Analyzer Sampling System</td><td>Singapore</td></tr><tr><td>2012</td><td>ORP Analyzer System</td><td>Middle east</td></tr><tr><td>2012</td><td>Manual Sampling System for FPSO x 2</td><td>Singapore</td></tr><tr><td>2012</td><td>CEMS Analyzer System x 2</td><td>Indonesia</td></tr><tr><td>2012</td><td>GC Sampling System</td><td>Middle east</td></tr></table>'
		);
	$('.load_aarl').ready(() => {
		$('.load_aarl').slideToggle(500);
	})
});












})