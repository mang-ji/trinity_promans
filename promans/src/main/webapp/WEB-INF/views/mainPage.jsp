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
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"></script>

<script>

window.addEventListener('load',function(){
    let cpcode1 = document.getElementsByName("cpcode")[0];
    let userid1 = document.getElementsByName("userid")[0];
    let ReqBtn = document.getElementById("acceptProjectReq");
    let ReqBtn2 = document.getElementById("acceptProjectMakeReq");
    let addCpMemBtn = document.getElementById("addCpMember");
    let utype = document.getElementsByName("utype")[0];
    let jsonData =[{cpcode:cpcode1.value, userid:userid1.value}];
    let clientData = JSON.stringify(jsonData);
	
    if(utype.value == 'A'){
    	ReqBtn.style.display = "block";
    	ReqBtn2.style.display = "block";
    	addCpMemBtn.style.display = "block";
    } 
    
    postAjax('rest/GetProject', clientData, 'getProject1', 2);
         
});

        var check = $("input[type='checkbox']");
        check.click(function(){
        	$("p").toggle();
        });

        </script>
</head>
<body>
      <input type="hidden" name="cpcode" value="${cpcode}"> 
      <input type="hidden" name="userid" value="${userid}">
<!--  <div class="loader"></div>-->
	<!-- <div id="modal_background">
      <div id="modal_box"></div>
      <div id="modal_close"><a href="#">close</a>></div>
      <div id="modal_content"></div> -->

	<form action='CreateProject' method='post' >
	<div id ='Form'>
		
	 	<div id="modal_background">
	 		<div id="modal_box">
	 			<div id="requestList"></div>
	 		</div>
	 	</div>
		
	 </div>	 <input type="hidden" name="utype" value="${utype}"> 
	</form>
	
	 <div id="titleParent">
		 <div  id="logo" style="color:#4f5f86; margin-bottom:50px; font-size:50px; text-align:center; font-family : 'Nanum Gothic'; sans-serif; font-weight:bold;">ProMan'S <img src="resources/images/logo.png"/>
		 </div>
	 	 <div> <input type="button" id="logoutBtn" onClick="logout()" value="로그아웃"> </div>
	 </div>
	 <div id="ReqBtn">
	 	<input type="button" id="acceptProjectReq" onClick="acceptProjectReq()" style="display:none;" value="프로젝트 완료요청"/>
	 	<input type="button" id="acceptProjectMakeReq" onClick="acceptProjectMakeReq()" style="display:none; " value="프로젝트 생성요청"/>
	 	<input type="button" id="addCpMember" onClick="addCpMember()" style="display:none; " value="사원 추가"/>
	 </div>
      <input type="hidden" name="prcode" value=" "> <!-- prcode 아마 여기 없을거다 넘겨받는 것 일거다 -->
      <div id="getProject"></div>

<div id="backPop"></div>

	<!-- HTML -->
	<div id="chartdiv"></div>
</body>
</html>



<!-- <div id ='imgToggle'>
	<img src='resources/images/lock.jpg' id = 'lock' style = 'width:35px; height:35px; '/>OPEN / CLOSE : 
		<label class='switch'><input type='checkbox' name='propen' onClick='toggle(this)' value='O'>
			<span class='slider round'>
			</span>
		</label>
</div> -->