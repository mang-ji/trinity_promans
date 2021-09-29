<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap" rel="stylesheet">
<script src="http://code.jquery.com/jquery-latest.js"></script>
<link href="resources/css/logInPage.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="resources/javascript/logInPage.js"></script>
<script>
	/*const message = "${param.message}";
	
	if(message != ""){
		alert(message);
	}*/
	window.addEventListener('load',function(){
			if(${msg} != ""){
				alert(" ${msg} ");
			}
		});
</script>
<title>로그인</title>


</head>

<body onLoad="getAjax('https://api.ipify.org','format=json','setPublicIP')">

	<div id="main">
		<div id="bigBox">
			<div id="logo">
				PROMANS
				<div class="logo2">로그인</div>
				<!-- <div class="dayDiv"><input type="date" name="day" class="day"></div> -->
			</div>

			<div id="id">아이디</div>
			<div>
				<input type="text" id="idBox" class="box" name="userid"
					placeholder="아이디를 입력해주세요." onKeyup="EntersendUserId()">
			</div>
			
			<div id="pass">비밀번호</div>
			<!-- onKeyup="EntersendUserInfo()" -->
			<!-- onKeyup="EntersendUserId()" -->
			<div>
				<input type="password" id="passBox" class="box" name="acode"
					placeholder="비밀번호를 입력해주세요." onKeyup="EntersendUserInfo()">
			</div>
			<div id="nonId"></div>
			<div id="idForget"><a href = "findPassForm">비밀번호를 잊으셨나요?</a></div>
			<div id="text">ICIA 일보아카데미만 로그인 가능합니다! 게스트 계정 만들 수 없고, 3조 프로젝트
				용 로그인 창 입니다.</div>

			<div>
				<div id="signUp">
					<a href="InsCompany" style="text-decoration: none; color: #5191ce;">회사등록</a>
					<input type="button" class="button" name="next" value="다음" onClick="sendUserId()"> 
						
						<input type="button" id="button2" class="button" name="subMit" value="로그인" onClick="sendUserInfo()"
						style="display: none;">
				</div>
			</div>
		</div>
	</div>
</body>
</html>
