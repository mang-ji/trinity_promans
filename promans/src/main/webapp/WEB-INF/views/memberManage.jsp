<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

<meta charset="utf-8" />
<script src="http://code.jquery.com/jquery-latest.js"></script>
<link href="resources/css/styles.css" rel="stylesheet" type="text/css">
<link href="resources/css/memberManage.css" rel="stylesheet"
	type="text/css">
<script type="text/javascript"
	src="resources/javascript/memberManage.js"></script>
<script type="text/javascript"
	src="resources/javascript/mainTemplate.js"></script>
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
<title>멤버 관리</title>
</head>


<body onLoad="projectOnLoad()">
	<input type="hidden" name="utype" value="${utype}">
	<div class="d-flex" id="wrapper">
		<!-- Sidebar-->
		<div class="border-end bg-white" id="sidebar-wrapper">
			<div class="sidebar-heading border-bottom bg-light">ProMan'S</div>
			<div class="list-group list-group-flush">
				<a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="noticeForm">공지사항</a> <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="projectForm" id="adminProject">프로젝트 관리</a> <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="projectForm" id="project">프로젝트</a> <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="calendarForm">캘린더</a> <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="mailForm">메일 발송</a> <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="cloudForm">파일함</a> <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="myScheduleForm">내 업무</a> <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="memberForm" id="adminMember">멤버 관리</a>
			</div>
		</div>
		<!-- Page content wrapper-->
		<div id="page-content-wrapper">
			<!-- Top navigation-->
			<nav>
				<div class ="navbar navbar-expand-lg navbar-light bg-lightborder-bottom">
				<div class="container-fluid">
					<div>::: TEAM LIST :::</div>
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
                    </div>
                </nav>           
                <!-- Page content-->
                <div class="container-fluid">
			<form action="SignUp" method="post">
                     <input type="text" name="userid" placeholder="아이디" />
                     <input type="text" name="uname" placeholder="이름" />
               <input type="password" name="acode"  placeholder="비밀번호"/>
               <input type="hidden" name="cpcode" value="${cpcode }" />
               <input type="text" name="uphone" placeholder="핸드폰" />
               <input type="text" name="mail" placeholder="메일" />
               <select name="tecode">
               <option value="I">인사팀</option>
               <option value="G">개발팀</option>
               <option value="D">디자인팀</option>
               <option value="M">마케팅팀</option>
               <option value="Y">영업팀</option>
               </select>
               <input type="hidden" name="wcode" value="1" />
               <input type="hidden" name="utype" value="G" />
               <input type="submit" value="등록">
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