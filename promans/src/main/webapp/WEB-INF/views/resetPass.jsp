<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
	<script src="http://code.jquery.com/jquery-latest.js"></script>
	<script type="text/javascript" src="resources/javascript/resetPass.js"></script>
	<link href="resources/css/resetPass.css"rel="stylesheet"type="text/css">
<title>새 비밀번호 설정</title>
</head>
<body>
	<input type = "hidden" name="userid" value="${userid}">
	
	<div id="main">
		<div id="bigBox">
			<div id="logo">
				PROMANS
				<div class="logo2">비밀번호 재설정</div>
			</div>

			<div id="pw1">새 비밀번호</div>
			<div>
				<input type="password" id="pwbox" class="box" name = "acode" placeholder="새 비밀번호를 입력해주세요.">
			</div>
			<div>
			<div id="pw2">새 비밀번호 확인</div>
			<input type="password" id="pwbox" class="box" name = "pw" placeholder="새 비밀번호를 입력해주세요.">
			</div><br>
			<input type="button" class="button" name="reset" value="변경하기" onClick= "resetPass()"> 
	</div>
	</div>
</body>
</html>