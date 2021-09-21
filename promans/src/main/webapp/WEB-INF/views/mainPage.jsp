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
<script src="https://cdn.amcharts.com/lib/4/core.js"></script>
<script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
<script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>
<script type="text/javascript"
	src="resources/javascript/mainTemplate.js"></script>

<title>Insert title here</title>

<script>
 
function getProject(){
    let cpcode1 = document.getElementsByName("cpcode")[0];
    let userid1 = document.getElementsByName("userid")[0];
    let jsonData =[{cpcode:cpcode1.value, userid:userid1.value}];
    let clientData = JSON.stringify(jsonData);

    postAjax('rest/GetProject', clientData, 'getProject1', 2);
         

 }
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
	
	 <div style="color:#4f5f86; margin-bottom:50px; font-size:50px; text-align:center; font-family : 'Nanum Gothic'; sans-serif; font-weight:bold;">ProMan'S <img src="resources/images/logo.png"/></div>
	
	
      <input type="hidden" name="utype" value="${utype}"> 
      <input type="hidden" name="cpcode" value="${cpcode}"> 
      <input type="hidden" name="userid" value="${userid}">
      <input type="hidden" name="prcode" value=" "> <!-- prcode 아마 여기 없을거다 넘겨받는 것 일거다 -->
      <div id="getProject"></div>
      
      
<!-- HTML -->


<!-- 
<div id="chartdiv" style="width:100%; height:500px;">

</div>
 -->
 
<div id="test1">

</div>






</body>
</html>