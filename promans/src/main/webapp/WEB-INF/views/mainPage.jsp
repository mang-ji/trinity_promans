<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<title>메인페이지</title>
<link href="resources/css/styles.css" rel="stylesheet" type="text/css">
<link href="resources/css/mainPage.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="resources/javascript/mainPage.js"></script>
<script type="text/javascript"
	src="resources/javascript/mainTemplate.js"></script>
	<script src="https://cdn.amcharts.com/lib/4/core.js"></script>
<script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
<script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>
<title>Insert title here</title>

<script>
 
window.addEventListener('load',function(){
	
		let cpcode1 = document.getElementsByName("cpcode")[0];
		let prcode1 = document.getElementsByName("prcode")[0];
		
		let jsonData = [{cpcode:cpcode1.value, prcode:prcode1.value}];
		
		let clientData = JSON.stringify(jsonData);
		
		postAjax("rest/Get", clientData, "selectProject", 2);
		
});
     </script>
</head>
<body onLoad="getProject()">
	<!-- <div id="modal_background">
      <div id="modal_box"></div>
      <div id="modal_close"><a href="#">close</a>></div>
      <div id="modal_content"></div> -->

	 <div id="modal_background">
	 	<div id="modal_box">
	 	<div id="requestList"></div>
	 	</div>
	 </div>
	
	 <div style="color:#4f5f86; margin-bottom:50px; font-size:50px; text-align:center; font-family : 'Nanum Gothic'; sans-serif; font-weight:bold;">ProMan'S</div>
	
      <input type="hidden" name="utype" value="${utype}"> 
      <input type="hidden" name="cpcode" value="${cpcode}"> 
      <input type="hidden" name="userid" value="${userid}">
      <input type="hidden" name="prcode" value="">
      <div id="getProject"></div>
      
      
      
      <style>
#chartdiv {
  width: 100%;
  height: 500px;
}

</style>


<!-- Chart code -->
<script>

	
am4core.ready(function(jsonData) {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.PieChart);

// Add data
chart.data = [ {
  "state": "스텝 완료 요청 대기 중",
  "litres": 99,
//  "state": "이게 맞나?",
 // "litres" : 30
}, {
  "state": "스텝 완료된 업무",
  "litres": 60
}, {
  "state": "진행 중인 업무",
  "litres": 50
}, {
  "state": "기선이 밥 먹는중",
  "litres": 30
	} ];
	
 chart.data =[ {
	 "state" : "이게 맞나?".
	 "litres" : 80
 }]

// Set inner radius
chart.innerRadius = am4core.percent(50);

// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "litres";
pieSeries.dataFields.category = "state";
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 3;
pieSeries.slices.template.strokeOpacity = 1;

// This creates initial animation
pieSeries.hiddenState.properties.opacity = 1;
pieSeries.hiddenState.properties.endAngle = -90;
pieSeries.hiddenState.properties.startAngle = -90;

}); // end am4core.ready()
</script>

<!-- HTML -->
<div id="chartdiv"></div>

</body>
</html>