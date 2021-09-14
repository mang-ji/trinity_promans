<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<script src="http://code.jquery.com/jquery-latest.js"></script>
<link href="resources/css/styles.css" rel="stylesheet" type="text/css">
<link href="resources/css/calendar.css" rel="stylesheet" type="text/css">
<script type="text/javascript"
	src="resources/javascript/mainTemplate.js"></script>

<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
<title>캘린더</title>
<link
	href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i"
	rel="stylesheet">
	
	<script>
		window.addEventListener('load',function(){
			let utypes = document.getElementsByName("userid")[0];
			let cpcodes = document.getElementsByName("cpcode")[0];
			let prcodes = document.getElementsByName("prcode")[0];
			let data = [{writer:utypes.value,cpcode:cpcodes.value,prcode:prcodes.value}];
			postAjax("rest/getCalendar", JSON.stringify(data), 'afterGetCalendar', 2);

		});
		
		function afterGetCalendar(data){
			var sdate = new Array();
			var ldate = new Array();
			var getDate = new Array();
			
			
			for(i=0; i<data.length; i++){
				sdate[i] = data[i].sdate.substring(data[i].sdate,6)>10?data[i].sdate.substring(data[i].sdate,6):data[i].sdate.substring(data[i].sdate,7);
				ldate[i] = data[i].ldate.substring(data[i].ldate,6)>10?data[i].ldate.substring(data[i].ldate,6):data[i].ldate.substring(data[i].ldate,7);
				//console.log(sdate[i] + " : " + ldate[i] + " : 1");
				for(r=0; r<document.getElementsByClassName("this").length; r++){
					getDate[r] = document.getElementsByClassName("this")[r].innerText;
					if(i<=r){
						console.log(sdate[i] +" : "+ ldate[i] +" : "+ getDate[r]);
					}
				}
			}			
		}
		
		
		
		
		
	</script>

</head>
<body onLoad="projectOnLoad()">

	<input type="hidden" name="utype" value="${utype}">
	<input type="hidden" name="userid" value="${userid}">
	<input type="hidden" name="cpcode" value="${cpcode}">
	<input type="hidden" name="prcode" value="${prcode}">

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
					href="cloudForm">파일함</a>
				<a class="list-group-item list-group-item-action list-group-item-light p-3" href="myScheduleForm">내 업무</a>
					 <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="memberForm" id="adminMember">멤버 관리</a>
			<input type="button" onClick="logout()" value="로그아웃">
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
			<div id="calZone">
				<div class="wideZone">

					<div class="sideForm">
						<div style="width: 100%; height: 50px;" class="infoBlank">

							<!-- <input type="button" class="sideAddBtn" value="add Event+"
								onclick="modalOpen()" />  -->
						</div>
						<div id="sideInfo" class="infoBlank">
							<!-- style="width:100%; height:620px;"  -->
						</div>
					</div>
					<div class="MngForm">
						<div class="calendar">
							<div class="header">
								<div class="year-month"></div>
								<div class="nav">
									<button class="nav-btn go-prev" onclick="prevMonth()">&lt;</button>
									<button class="nav-btn go-today" onclick="goToday()">Today</button>
									<button class="nav-btn go-next" onclick="nextMonth()">&gt;</button>
								</div>
							</div>
							<div class="main">
								<div class="days">
									<div class="day">일</div>
									<div class="day">월</div>
									<div class="day">화</div>
									<div class="day">수</div>
									<div class="day">목</div>
									<div class="day">금</div>
									<div class="day">토</div>
								</div>
								<div class="dates"></div>
							</div>
						</div>
					</div>
					</div>
				</div>
				<script type="text/javascript" src="resources/javascript/calendar.js"></script>
			</div>
		</div>
	</div>
	<!-- Bootstrap core JS-->
	<!-- Core theme JS-->

	<script src="resources/javascript/scripts.js"></script>
</body>
</html>