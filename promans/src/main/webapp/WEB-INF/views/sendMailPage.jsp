<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

<meta charset="utf-8" />
<script src="http://code.jquery.com/jquery-latest.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="resources/css/styles.css" rel="stylesheet" type="text/css">
<link href="resources/css/sendMailPage.css" rel="stylesheet"
	type="text/css">
<script type="text/javascript"
	src="resources/javascript/sendMailPage.js"></script>
<script type="text/javascript"
	src="resources/javascript/mainTemplate.js"></script>
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
<title>메일발송</title>
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
			<a
				class="list-group-item list-group-item-action list-group-item-light p-4"
				style="font-size: 20px;" href="mainPageForm">ProMan'S</a>
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
					href="mailForm">메일 발송</a> <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					onClick="cloudCate()">파일함</a> <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					onClick="myScheduleCate()">내 업무</a> <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="memberForm" id="adminMember">멤버 관리</a> <input type="button"
					onClick="logout()" value="로그아웃">
			</div>
		</div>
		<!-- Page content wrapper-->
		<div id="page-content-wrapper">
			<!-- Top navigation-->
			<nav
				class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
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
			<div class="container-fluid">
				<div id="selectBack">
					<div id="selHeight">ProMan'S</div>
					<div id="selectStep"></div>
				</div>
				<div id="ShceduleEdit"></div>

				<form action="submitMail" method="post"
					enctype="multipart/form-data">
					<div id="mbox">
						<div id="mtitle">Mail</div>
							<input type="text" name="title" id="title" placeholder="글 제목" autocomplete="off"><br>
							<input type="email" name="to" id="to" placeholder="받는 사람" autocomplete="off"><br>
							<textarea rows="5" cols="40" name="mcontents" id="mcontents" placeholder="글 내용" autocomplete="off"></textarea>
					
						<div class="filebox"> 
							<input class="upload-name" value="파일선택" disabled="disabled"> 
							<label for="ex_filename">찾아보기</label> 
							<input type="file" id="ex_filename" name = "file"class="upload-hidden"> 
							
						</div>
						<input type="submit" value="전송" id="send">
					</div>
				</form>

			</div>
		</div>
	</div>
	<!-- Bootstrap core JS-->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
	<!-- Core theme JS-->
	<script src="resources/javascript/scripts.js"></script>
</body>
</html>