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
	
	<div style="font-weight:bold; font-size:40px; margin-bottom:10px;"> 회사 등록 </div>
	<div style="font-size:15px; color:#4C4C4C;"> 회사 등록을 원한다면 아래 정보를 기입해주세요.</div>
	<div class="box">	
		<div class='textboxes'>
			<span>회사명</span>  <input type="text" class="texts" name="cpname" placeholder="company name"/>
		</div>
		<div class='textboxes'>
			<span>CEO명</span>  <input type="text" class="texts" name="ceo" placeholder="ceo name"/>
		</div>
		<div class='textboxes'>
			<span>주소</span>   <input type="text" class="texts" id="member_post" placeholder="Enter Your Address" readonly onClick="findAddr()" />
					  			<input type="text" class="texts" name="cplocate" placeholder="" readonly >
				<!-- 	<input type="text" name="detail_addr" placeholder="Detailed Address"/> -->
		</div>
		<div class='textboxes'>
			<span>아이디</span>  <input type="text" class="texts" name="userid" placeholder="id" />
		</div>
        <div class='textboxes'>
			<span>비밀번호</span>  <input type="password" class="texts" name="acode"  placeholder="password"/>
		</div>
		<div >
				<input type="hidden" name="tecode" value="R" />
				<input type="hidden" name="wcode" value="1" />
				<input type="hidden" name="utype" value="A" />
		</div>
		<div class='textboxes'>
			<span>핸드폰</span>  <input type="text" class="texts" name="uphone" placeholder="phone" />
		</div>
		<div class='textboxes'>
			<span>메일</span>  <input type="text" class="texts" name="mail" placeholder="mail" />	
		</div>			

		<div class='textboxes'>
			<input type="button" id="buttons" value="등록" onClick="insCompany()">
			<a id="main" href="/" style="text-decoration: none;  color: #5191ce;" >메인으로</a>
		</div>
	</div>
		
		
</body>
</html>