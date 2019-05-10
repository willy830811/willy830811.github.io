<?php

require("connect.php");

?>



商品列表
<table>
<th>商品名</th><th>種類</th><th>價格</th><th>介紹</th><th>圖片路徑</th>
<?php
	$result = mysqli_query($link, "select * from product_info");

	while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
		echo '<tr>';
	    print_r('<td>'.$row[name].'</td>'.'<td>'.$row[kind].'</td>'.'<td>'.$row[price].'</td>'.'<td>'.$row[introduction].'</td>'.'<td>'.$row[img_route].'</td>');
	    echo '</tr>';
	}
?>
</table>
<br>


新增商品
<form method="post" action="revise.php">
	<table>
		<input type="hidden" name="act" value="add_product">
		<tr><th>商品名</th><th>種類</th><th>價格</th><th>介紹</th><th>圖片名稱</th></tr>
		<tr>
			<td><input type="text" name="name"></td><br>
			<td><input type="text" name="kind"></td><br>
			<td><input type="text" name="price"></td><br>
			<td><input type="text" name="introduction"></td><br>
			<td><input type="text" name="img_route"></td><br>
		</tr>
	</table>
	<input type="submit" name="送出">
</form>


