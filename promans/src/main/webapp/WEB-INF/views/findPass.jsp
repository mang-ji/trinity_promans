<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap" rel="stylesheet">
	<script src="http://code.jquery.com/jquery-latest.js"></script>
	<script type="text/javascript" src="resources/javascript/findPass.js"></script>
	<link href="resources/css/findPass.css"rel="stylesheet"type="text/css">
	
	<script>
	
	let message="${message}";
	
	if(message!=""){
		alert(message);
	
	}
	
	</script>
	
	
<title>비밀번호 찾기</title>
</head>
<body>

	<div id="main">
		<div id="bigBox">
			<div id="logo">
				PROMANS
				<div class="logo2">비밀번호 찾기</div>
				<!-- <div class="dayDiv"><input type="date" name="day" class="day"></div> -->
			</div>

			<div id="id">아이디</div>
			<div>
				<input type="text" id="idBox" class="box" name = "userid" placeholder="아이디를 입력해주세요.">
			</div>
			<div>
			<div id="email">이메일</div>
			<input type="text" id="emailBox" class="box" name = "mail" placeholder="이메일를 입력해주세요.">
			</div><br>
			<input type="button" class="button" name="auth" value="인증하기" onClick= "findPass()"> 
	</div>
	</div>

</body>
</html>