<?php
/*
mysqli_connect($_SERVER['aapoe1drvo89qb.cikflqxb7lgf.ap-southeast-1.rds.amazonaws.com'], $_SERVER['root'], $_SERVER['0911002402'], $_SERVER['aapoe1drvo89qb'], $_SERVER['3306']);//連結伺服器
*/
mysql_connect("http://3.1.110.238","root","0911002402");
mysql_select_db('shopping_site');//選擇資料庫
mysql_query("set names utf8");//讓資料可以讀取中文
?>