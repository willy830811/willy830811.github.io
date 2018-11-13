<?php

$a0 = array(
'Process Monitoring and Safety',
'Combustion Control and Heating Value',
'Leak Detection and Oil-In-Water',
'Leak Detection and Arrest (LDAR)',
'Tank Farms'
);

$a1 = array(
'Continuous Emission Monitoring System (CEMS)',
'Quality Control for High Purity Gas',
'Water and Waste Water',
'Sampling Systems and Analyzer Protection'
);

$a2 = array(
'Water Removal from Oil Fuel Hydrocarbon Liquid',
'Fuel Oil Auto Sampling System',
'Pump'
);

$a3 = array(
'Pressure Control, Backpressure Control and Control Valve',
'Hands On Sampling System Training'
);



$productGroup = 'a'.$_GET['productGroup'];

$arr = '';
foreach ($$productGroup as $value) {
	$arr = $arr.$value.'/';
}
$arr = substr($arr, 0, -1);

echo $arr;

//echo $$productGroup;



?>