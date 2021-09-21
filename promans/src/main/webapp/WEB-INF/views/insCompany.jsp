<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
	<script src="http://code.jquery.com/jquery-latest.js"></script>
	<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<script type="text/javascript" src="resources/javascript/insCompany.js"></script>
	<link href="resources/css/insCompany.css"rel="stylesheet"type="text/css">
<title>회사 등록</title>
<script>
	
</script>
</head>
<body >

	<div id="box">	
		<div>
			회사명 : <input type="text" name="cpname" />
		</div>
		<div>
			CEO 명 : <input type="text" name="ceo" />
		</div>
		<div>
			주소 입력 : <input type="text" id="member_post" placeholder="Enter Address" readonly onClick="findAddr()" />
					<input type="text" name="cplocate" placeholder="Address" readonly >
				<!-- 	<input type="text" name="detail_addr" placeholder="Detailed Address"/> -->
		</div>
		<div>
			아이디 : <input type="text" name="userid" placeholder="아이디" />
		</div>
		<div>
            이름 : <input type="text" name="uname" placeholder="이름" />
        </div>
        <div>
			비밀번호 : <input type="password" name="acode"  placeholder="비밀번호"/>
		</div>
		<div>
				<input type="hidden" name="cpcode" value="${cpcode }" />
				<input type="hidden" name="tecode" value="R" />
				<input type="hidden" name="wcode" value="1" />
				<input type="hidden" name="utype" value="A" />
		</div>
		<div>
			핸드폰 : <input type="text" name="uphone" placeholder="핸드폰" />
		</div>
		<div>
			메일 : <input type="text" name="mail" placeholder="메일" />	
		</div>			
		</div>
		
		<div><input type="button" value="등록" onClick="insCompany()"></div>
		
		
</body>
</html>