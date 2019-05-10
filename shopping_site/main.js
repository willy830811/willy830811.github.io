$(document).ready(() => {

//讀取COOKIE
let shopping_cart = new Object;
let cart_pill = 0;
readCookie();

function readCookie() {
	let obj = document.cookie.substr(14);
	if (obj == '') {
		console.log(shopping_cart);
	} else {
		shopping_cart = JSON.parse(obj);
		console.log(shopping_cart);

		for (let prop in shopping_cart) {
			cart_pill = cart_pill + shopping_cart[prop];
		}
		$('#number_in_cart').text(cart_pill);
		cart_pill = 0;
	}	
}


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


//判斷頁面
let num = $('#num').val();

if (num == '') {
	call_closet();
	$('#slider, #closet').removeClass('d-none');
} else if (num > 0 && num < 100) {
	call_product_content();
	$('#product_page').removeClass('d-none');
} else if (num == 'c') {
	call_cart();
	$('#my_cart').removeClass('d-none');
} else if (num == 's') {
	call_search_result();
	$('#search_result').removeClass('d-none');
} else if (num == 'k') {
	call_products_of_kind();
	$('#products_of_kind').removeClass('d-none');
} else {
	$('#'+num).removeClass('d-none');
}


//頁首>導覽列
let kind_names;

setTimeout(function() {
call_kinds();
}, 500);

function call_kinds() {
	$_xmlHttpRequest();
	xmlHTTP.open("GET", "call.php?num=aq_k", true);
	xmlHTTP.onreadystatechange=function() {
		if(xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
			let data = xmlHTTP.responseText;
			console.log(data);

			kind_names = data.split(';');

			kind_names.forEach(function(item, index) {

			console.log(index);
			$('.navbar #kinds-dropdown').append(
				//'<a class="dropdown-item" href="#">'+item+'</a>')
				'<a class="dropdown-item" href="index.php?num=k&kind='+index+'">'+item+'</a>')
			})
		}
	}
	xmlHTTP.send(null);
}



//主頁>產品櫥窗
let square_amount = 4;

function call_closet() {
	let data;
	let dataf;


	$_xmlHttpRequest();
	xmlHTTP.open("GET", "call.php?num="+num, true);
	xmlHTTP.onreadystatechange=function() {
		if(xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
			data = xmlHTTP.responseText;
			dataf = JSON.parse(data);
		}
	}
	xmlHTTP.send(null);

	setTimeout(function() {
		for(let i=0; i<square_amount; i++) {
		$('#hot_products .row').append(
			'<div class="col-6 col-md-3 mb-3"><div class="card">'+
			'<a href="index.php?num='+dataf[i][0]+'"><img class="card-img-top" src="'+dataf[i][5]+'" alt="Card image cap"></a>'+
			'<div class="card-body">'+
			'<a href="index.php?num='+dataf[i][0]+'"><h5 class="card-title">'+dataf[i][1]+'</h5></a>'+
			'<p class="card-text">$'+dataf[i][3]+'<br>'+dataf[i][4]+'</p>'+
			'<a href="index.php?num='+dataf[i][0]+'" class="btn btn-primary">看詳情</a>'+
			'</div>'+
			'</div>'+
			'</div>')
		}
	}, 1000);
}




//類別頁
function call_products_of_kind() {
	
	let kind = $('#kind').val();
	$_xmlHttpRequest();
	xmlHTTP.open("GET", "call.php?num=k&kind="+kind, true);
	console.log('kind='+kind);
	xmlHTTP.onreadystatechange=function() {
		if(xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
			let data = xmlHTTP.responseText;
			let dataf = JSON.parse(data);
			console.log(dataf);

			setTimeout(function(){
				$('#products_of_kind .row h1').append(kind_names[kind]);
				$('#products_of_kind li.breadcrumb-item').eq(1).text(kind_names[kind]);
			}, 1000);
			
			dataf.forEach(function(item, index) {
				$('#products_of_kind .row').append(
					'<div class="col-6 col-md-3 mb-3"><div class="card">'+
					'<a href="index.php?num='+item[0]+'"><img class="card-img-top" src="'+item[5]+'" alt="Card image cap"></a>'+
					'<div class="card-body">'+
					'<a href="index.php?num='+item[0]+'"><h5 class="card-title">'+item[1]+'</h5></a>'+
					'<p class="card-text">$'+item[3]+'<br>'+item[4]+'</p>'+
					'<a href="index.php?num='+item[0]+'" class="btn btn-primary">看詳情</a>'+
					'</div>'+
					'</div>');
			})
			
		}
	}
	xmlHTTP.send(null);
}






//商品頁
let product_content;
function call_product_content() {
	let raw;
	$_xmlHttpRequest();
	xmlHTTP.open("GET", "call.php?num="+num, true);
	xmlHTTP.onreadystatechange=function() {
		if(xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
			raw = xmlHTTP.responseText;
			product_content = JSON.parse(raw);
			console.log(product_content);
		}
	}
	xmlHTTP.send(null);

	setTimeout(function() {
		print_product_content();
	}, 1000);
}


function print_product_content() {
	$('#product_img img').attr('src', product_content[5]);
	$('#product_name').append(product_content[1]);
	$('#product_price').append(product_content[3]);
	$('#product_info').append(product_content[4]);
	$('#product_page li.breadcrumb-item a').eq(1).text(kind_names[product_content[2]]);
	$('#product_page li.breadcrumb-item a').eq(1).attr('href', 'index.php?num=k&kind='+product_content[2]);
	$('#product_page li.breadcrumb-item').eq(2).text(product_content[1]);
}


//商品頁>增減符號
let how_many_to_buy = 1;

$('#product_page .plus_minus').eq(0).on('click', function() {
	how_many_to_buy++;
	console.log('click');
	$('#how_many_to_buy').attr('placeholder', how_many_to_buy);
});

$('#product_page .plus_minus').eq(1).on('click', function() {
	if(how_many_to_buy > 1) {
		how_many_to_buy--;
		$('#how_many_to_buy').attr('placeholder', how_many_to_buy);
	}
	console.log('click');
});



//商品頁>加入購物車
$('#add_to_cart').on('click', function() {
	add_to_cart();
	alert("商品已加入購物車!");
	readCookie();
})

function add_to_cart() {
	if (shopping_cart['p'+num] == undefined) {
		shopping_cart['p'+num] = how_many_to_buy;
		console.log('a');
	} else {
		shopping_cart['p'+num] += how_many_to_buy;
		console.log('b');
	}

	document.cookie="shopping_cart="+JSON.stringify(shopping_cart)+"; expires=Thu, 18 Dec 2043 12:00:00 GMT";
	console.log(shopping_cart);
}



//購物車頁面
function call_cart() {
	let temp_arr = [];

	for (var prop in shopping_cart) {
		
		num = prop.substr(1);

		$_xmlHttpRequest();
		xmlHTTP.open("GET", "call.php?num="+num, false);
		xmlHTTP.onreadystatechange=function() {
			if(xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
				let data = xmlHTTP.responseText;
				let dataf = JSON.parse(data);
				dataf.push(shopping_cart[prop]);
				temp_arr.push(dataf);
			}
		}
		xmlHTTP.send(null);
	}

	setTimeout(function() {
		temp_arr.forEach(function(item, index) {
			$('#my_cart').append(
			'<div class="row border border-secondary mb-3 py-3 rounded">'+
				'<div class="col-3">'+
					'<a href="index.php?num='+item[0]+'"><img class="w-100" src="'+item[5]+'"></a>'+
				'</div>'+
				'<div class="col-9 need_a_fake_element">'+
					'<div class="d-inline-block align-middle">'+
						'<a href="index.php?num='+item[0]+'"><h4>'+item[1]+'</h4></a>'+
						'<h5>$'+item[3]+'</h5>'+
						'<div class="mt-3">'+
							'<botton class="plus_minus btn btn-sm btn-dark">+</botton>'+
							'<input id="how_many_to_buy" class="form-control d-inline-block align-middle" placeholder="'+item[6]+'" readonly>'+
							'<botton class="plus_minus btn btn-sm btn-dark d-inline-block align-middle">-</botton>'+
							'<botton id="remove_from_cart" class="btn btn-primary d-inline-block align-middle ml-3">從購物車刪除</botton>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>')

			document.querySelectorAll('#my_cart .plus_minus')[index*2].addEventListener('click', function() {
				item[6]++;
				document.querySelectorAll('#my_cart #how_many_to_buy')[index].setAttribute('placeholder', item[6]);
				shopping_cart['p'+item[0]]++;
				document.cookie="shopping_cart="+JSON.stringify(shopping_cart)+"; expires=Thu, 18 Dec 2043 12:00:00 GMT";
				console.log(shopping_cart);
			});

			document.querySelectorAll('#my_cart .plus_minus')[index*2+1].addEventListener('click', function() {
				if(shopping_cart['p'+item[0]] > 1) {
					item[6]--;
					document.querySelectorAll('#my_cart #how_many_to_buy')[index].setAttribute('placeholder', item[6]);
					shopping_cart['p'+item[0]]--;
					document.cookie="shopping_cart="+JSON.stringify(shopping_cart)+"; expires=Thu, 18 Dec 2043 12:00:00 GMT";
					console.log(shopping_cart);
				}
			});

			document.querySelectorAll('#my_cart #remove_from_cart')[index].addEventListener('click', function() {
				if(confirm('是否要移除商品?')){
					delete shopping_cart['p'+item[0]];
					document.cookie="shopping_cart="+JSON.stringify(shopping_cart)+"; expires=Thu, 18 Dec 2043 12:00:00 GMT";
					console.log(shopping_cart);
    				window.location.reload();  
				}
			});
		})	
	}, 1000);
}



//搜尋結果
function call_search_result() {
	let key_words = $('#key_words').val();
	$_xmlHttpRequest();
	xmlHTTP.open("GET", "call.php?num=s&key_words="+key_words, false);
	xmlHTTP.onreadystatechange=function() {
		if(xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
			let data = xmlHTTP.responseText;
			let dataf = JSON.parse(data);
			//dataf.push(shopping_cart[prop]);
			//temp_arr.push(dataf);
			console.log(dataf);

			dataf.forEach(function(item, index) {
				$('#search_result').append(
				'<div class="row border border-secondary mb-3 py-3 rounded">'+
					'<div class="col-3">'+
						'<a href="index.php?num='+item[0]+'"><img class="w-100" src="'+item[5]+'"></a>'+
					'</div>'+
					'<div class="col-9 need_a_fake_element">'+
						'<div class="d-inline-block align-middle">'+
							'<a href="index.php?num='+item[0]+'"><h4>'+item[1]+'</h4></a>'+
							'<h5>$'+item[3]+'</h5>'+
						'</div>'+
					'</div>'+
				'</div>')
			})
		}
	}
	xmlHTTP.send(null);
}









	





})