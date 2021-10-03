<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<script src="http://code.jquery.com/jquery-latest.js"></script>
<link href="resources/css/styles.css" rel="stylesheet" type="text/css">
<link href="resources/css/feedback.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="resources/javascript/mainTemplate.js"></script>
<script type="text/javascript" src="resources/javascript/feedback.js"></script>

<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
<title>피드백</title>
<link
	href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i"
	rel="stylesheet">
	
	<script>
		window.addEventListener('load',function(){
			let cpcode = document.getElementsByName("cpcode")[0];
			let prcode = document.getElementsByName("prcode")[0];
			let userid = document.getElementsByName("userid")[0];
			let jsonData = [{cpcode:cpcode.value, prcode:prcode.value, userid:userid.value}];
			postAjax("rest/GetPrftList", JSON.stringify(jsonData),"getPrftList",2);
			postAjax("rest/GetPsftList", JSON.stringify(jsonData),"getPsftList",2);
			postAjax("rest/GetScftList", JSON.stringify(jsonData),"getScftList",2);
			postAjax("rest/GetSdftList", JSON.stringify(jsonData),"getSdftList",2); 
		});
	
		
	</script>

</head>
<body onLoad="projectOnLoad()">

	<input type="hidden" name="utype" value="${utype}">
        <input type="hidden" name="cpcode" value="${cpcode}">
        <input type="hidden" name="prcode" value="${prcode}">
        <input type="hidden" name="pscode" value="${pscode}">
        <input type="hidden" name="sccode" value="${sccode}">
        <input type="hidden" name="userid" value="${userid}">

	<div class="d-flex" id="wrapper">
		<!-- Sidebar-->
		<div class="border-end bg-white" id="sidebar-wrapper">
			<a class="list-group-item list-group-item-action list-group-item-light p-4" style="font-size:20px;" href="mainPageForm">ProMan'S</a>
			<div class="list-group list-group-flush">
				<a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="noticeForm">공지사항</a> <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="projectForm" id="adminProject">프로젝트 관리</a> <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="projectForm" id="project">프로젝트</a> <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="feedbackForm">피드백</a> <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="mailForm">메일 발송</a> 
					<a class="list-group-item list-group-item-action list-group-item-light p-3" onClick="cloudCate()">파일함</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" onClick="myScheduleCate()">내 업무</a>
					 <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="memberForm" id="adminMember">멤버 관리</a>
			    <a class="list-group-item list-group-item-action list-group-item-light p-3" onClick="logout()">로그아웃</a>
                </div>
		</div>
		<!-- Page content wrapper-->
		<div id="page-content-wrapper">
			<!-- Top navigation-->
			<nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
				<div class="container-fluid">
					<!--  @@@@@@@@@@@@@ 경로 써주는 곳 @@@@@@@@@@@@@@@@@@@@@ -->
					<!--  <button class="btn btn-primary" id="sidebarToggle">Toggle Menu</button> 
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                         <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
                                <li class="nav-item active"><a class="nav-link" href="#!">Home</a></li>
                                <li class="nav-item"><a class="nav-link" href="#!">Link</a></li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="#!">Action</a>
                                        <a class="dropdown-item" href="#!">Another action</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#!">Something else here</a>
                                    </div>
                                </li>
                            </ul>
                        </div>-->
				</div>
			</nav>
			<!-- Page content-->
			<div id="modal_background">
				<div id="modal_box"></div>
			</div>
			<div id="selectBack">
					<div id="selHeight">ProMan'S</div>
					<input type="button" id="feedbackbtn" onClick="getMyFeedback()" value="피드백 모아보기"/>
					<div id="selectStep"></div>
					
					<div id="big">
						<div id="prftplace"></div>
					</div>
					<div id="big">
						<div id="psftplace"></div>
					</div>
					<div id="big">
						<div id="scftplace"></div>
					</div>
					<div id="big">
						<div id="sdftplace"></div>
					</div>
					<div id="big">
						<div id="myftplace"></div>
					</div>
			</div>
			
		</div>
	</div>
	<!-- Bootstrap core JS-->
	<!-- Core theme JS-->

	<script src="resources/javascript/scripts.js"></script>
</body>
</html>