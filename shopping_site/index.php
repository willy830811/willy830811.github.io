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
		<!--
		<script>
			(function(d) {
				var config = {
					kitId: 'adl2erw',
					scriptTimeout: 3000,
					async: true
				},
				h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
			})(document);
		</script>
		-->
		<!--TITLE-->
		<link rel="shortcut icon" type="image/x-icon" href="">

		<title>INDEX</title>
	</head>



	<body>
		<!--頁首-->
		<!--頁首>導覽列-->
		<nav class="navbar navbar-expand-md navbar-light bg-light">
			<a class="navbar-brand">屁柴日貨</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<a class="nav-link" href="index.php">首頁</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="index.php?num=about">關於我們</a>
					</li>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true">商品類別</a>
						<div id="kinds-dropdown" class="dropdown-menu">
							<a class="dropdown-item" href="#">特價專區</a>
							<div class="dropdown-divider"></div>
						</div>
					</li>
				</ul>
			</div>
		</nav>



		<!--頁首>Banner-->
		<div class="container border-bottom py-3 mb-3">
			<div class="row">
				<div class="col-12 col-md-5 mb-2">
					<a href="index.php"><img class="logo d-inline-block" src="image/shiba_2.png"></a>
				</div>

				<div class="col-9 col-md-5 mb-2 need_a_fake_element">
					<div id="ddd" class="d-inline-block align-middle">
						<form class="form-inline" method="get" action="index.php">
							<input type="hidden" name="num" value="s">
							<input class="form-control w-50 mr-1" type="search" name="key_words" placeholder="輸入關鍵字">
							<button class="btn btn-outline-success btn-sm w-25" type="submit">搜尋</button>
						</form>
						<!--<h6 class="m-0">熱門關鍵字: 水波爐 杯緣子</h6>-->
					</div>
				</div>

				<div class="col-3 col-md-2 mb-2 text-right need_a_fake_element">
					<div class="d-inline-block align-middle">
					<a href="index.php?num=c">
						<img id="icon_shopping_cart" class="" src="image/shopping-cart.svg">
						<span id="number_in_cart" class="badge badge-pill badge-danger align-bottom">0</span>
					</a>
					</div>
				</div>
			</div>
		</div>



		<!--#取頁面參數-->
		<?php
			$num = $_GET['num'];
			if ($num == 's') {
				$key_words = $_GET['key_words'];
			} else if ($num == 'k') {
				$kind = $_GET['kind'];
			}
		?>
		<input id="num" type="hidden" value=<?php echo $num?>>
		<input id="key_words" type="hidden" value=<?php echo $key_words?>>
		<input id="kind" type="hidden" value=<?php echo $kind?>>



		<!--主頁-->

		<!--主頁>Slider-->
		<div id="slider" class="d-none">
			<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
				<ol class="carousel-indicators">
					<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
				</ol>
				<div class="carousel-inner">
					<div class="carousel-item active">
						<img class="d-block w-100" src="image/a.png" alt="First slide">
					</div>
					<div class="carousel-item">
						<img class="d-block w-100" src="image/b.png" alt="Second slide">
					</div>
					<div class="carousel-item">
						<img class="d-block w-100" src="image/c.png" alt="Third slide">
					</div>
				</div>
				<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="sr-only">Previous</span>
				</a>
				<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="sr-only">Next</span>
				</a>
			</div>
		</div>


		<!--主頁>商品櫥窗-->
		<div id="closet" class="container d-none">
			<div class="row">
				<div class="col-md-12">
					<h1 class="my-3">熱門商品</h1>
				</div>
			</div>

			<div id="hot_products">
				<div class="row"></div>
			</div>
		</div>


		<!--關於我們-->
		<div id="about" class="container d-none">
			<div class="row">
				<div class="col-md-6">
					<img src="image/hug_dog.png">
				</div>
				<div class="col-md-6">
					<p>我們是屁柴日貨，最專業的日本代購服務，網羅所有你想要的日本最夯商品！</p>
				</div>
			</div>
		</div>


		<!--運送規則-->
		<div id="transit" class="container d-none">
			<div class="row">
				<div class="col-md-6">
					<img src="image/racer_woman.png">
				</div>
				<div class="col-md-6">
					<p>一律免運！</p>
				</div>
			</div>
		</div>


		<!--類別頁-->
		<div id="products_of_kind" class="container d-none">

			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="index.php">首頁</a></li>
				<li class="breadcrumb-item active"></li>
			</ol>

			<div class="row">
				<div class="col-md-12">
					<h1 class="mb-3"></h1>
				</div>
			</div>


		</div>


		<!--商品頁-->
		<div id="product_page" class="container d-none">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="index.php">首頁</a></li>
				<li class="breadcrumb-item"><a href="#"></a></li>
				<li class="breadcrumb-item active"></li>
			</ol>

			<div class="row mb-3">
				<div class="col-md-6">
					<div id="product_img">
						<img src="" class="w-100">
					</div>
					<div id="product_thumbnail"></div>
				</div>

				<div class="col-md-6">
					<div class="my-3">
						<h2 id="product_name"></h2>
						<h3 id="product_price" class="text-primary">$</h3>
						<div id="product_info"></div>
						<div class="mt-3">
							<botton class="plus_minus btn btn-sm btn-dark d-inline-block align-middle">+</botton>
							<input id="how_many_to_buy" class="form-control d-inline-block align-middle" placeholder="1" readonly>
							<botton class="plus_minus btn btn-sm btn-dark d-inline-block align-middle">-</botton>
							<botton id="add_to_cart" class="btn btn-primary d-inline-block align-middle ml-3">加入購物車</botton>
						</div>
					</div>
				</div>
			</div>
		</div>



		<!--購物車-->
		<div id="my_cart" class="container d-none">
			<h1 class="mb-3">購物車</h1>
		</div>
		

		<!--搜尋結果-->
		<div id="search_result" class="container d-none">
			<h1 class="mb-3">搜尋結果</h1>
		</div>



		<!--頁尾-->

		<div class="container-fluid bg-dark">
			<div class="row p-5">
				<div class="col-8">
					<div class="row">
						<div class="col-md-6">
							<a href="index.php?num=about">關於我們</a><br>
							<a href="index.php?num=transit">運送規則</a>
						</div>
						<div class="col-md-6 mt-3 my-md-0">
							<h6 class="text-white">聯絡我們</h6>
							<ul>
								<li class="text-white">服務專線<br>(02)2266-9487</li>
								<li class="text-white">Email<br>iamsocute@qmail.com</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="col-4">
					<a href="https://www.facebook.com"><img id="icon_fb" class="" src='image/flogo-HexRBG-Wht-100.svg'></a>
				</div>
			</div>
		</div>



		



		<!--BOOTSTRAP REQUIRED-->
		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
		<!--JAVASCRIPT-->
		<script type="text/javascript" src="main.js"></script>
	</body>
</html>