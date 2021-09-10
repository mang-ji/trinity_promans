<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<script src="http://code.jquery.com/jquery-latest.js"></script>
	<link href="resources/css/styles.css"rel="stylesheet"type="text/css">
	<link href="resources/css/mySchedule.css"rel="stylesheet"type="text/css">
	<script type="text/javascript" src="resources/javascript/mySchedule.js"></script>
	<script type="text/javascript" src="resources/javascript/mainTemplate.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
       	<link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
	<script>
		window.addEventListener('load',function() {
			let prcode1 = document.getElementsByName("prcode")[0].value;
			let pscode1 = document.getElementsByName("pscode")[0].value;
			let cpcode1 = document.getElementsByName("cpcode")[0].value;
			let userid1 = document.getElementsByName("userid")[0].value;
			let data = [{prcode:prcode1,pscode:"PS01",cpcode:cpcode1,userid:userid1}];
			let clientData = JSON.stringify(data);
			postAjax("rest/GetMySchedule", clientData, 'mySchedulelist', 2);
		});

		function mySchedulelist(data) {
			let tablebody = document.getElementById("table_body");
			let html = "";
			
			for (i = 0; i < data.length; i++) {
				html += "<tr onClick = \"mySchedule(\'"+data[i].sdcontent+"\',\'"+data[i].sdname+"\', \'"+data[i].sddate+"\')\">";
				html += "<td>" + data[i].sdcontent + "</td>";
				html += "<td>" + data[i].sdname + "</td>";
				html += "<td>" + data[i].sddate + "</td></tr>";
			}
			tablebody.innerHTML = html;
		}

		function mySchedule(sdcontent,sddate,sdname) {
			let mySchedule = document.getElementById("mySchedule");
			let html = "";
			html += "<div id = \"sdcontent\">"+"제목 :"+sdcontent+"</div>";
			html += "<div id = \"sdname\">"+"내용 :"+sdname+"</div>";
			html += "<div id = \"sddate\">"+"날짜 :"+sddate+"</div>";
			mSchedule.innerHTML = html;
		}
	</script>
    <title>내 업무</title>
	<style>
	table{
		width: 95%;
		border: 1px #ddddddd;
	}	
	</style>    
    </head>
    <body onLoad="projectOnLoad()">
        	<input type="hidden" name="utype" value="${utype}">
        	<input type="hidden" name="cpcode" value="${cpcode}">
        	<input type="hidden" name="prcode" value="${prcode}">
        	<input type="hidden" name="pscode" value="${pscode}">
        	<input type="hidden" name="userid" value="${userid}">
        <div class="d-flex" id="wrapper">
            <!-- Sidebar-->
            <div class="border-end bg-white" id="sidebar-wrapper">
                <div class="sidebar-heading border-bottom bg-light">ProMan'S</div>
                <div class="list-group list-group-flush">
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="noticeForm">공지사항</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="projectForm" id="adminProject">프로젝트 관리</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="projectForm" id="project">프로젝트</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="calendarForm">캘린더</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="mailForm">메일 발송</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="cloudForm">파일함</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="memberForm" id="adminMember">멤버 관리</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="myDiaryForm">업무 일지</a>
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
			<div class="container-fluid">
				<table border = 1 id = "mySchedule">
						<tr >
							<th style="width: 10%">제목</th>
							<th style="width: 10%">내용</th>
							<th style="width: 10%">날짜</th>
						</tr>
					<tbody id = "table_body">
							<tr>
		
							</tr>
					</tbody>
				</table>
			<div id = "mSchedule">
				<input type="submit" name="wSchedule" value="작성" onClick="writeSchedule()">
				<input type="text" name="sdcontent" placeholder="제목" value="">
				<input type="text" name="sdname" placeholder="내용" value="">
				<button type="submit" name="sub">작성하기</button>  
			</div>
			
			</div>
			</div>
		</div>
        </div>
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="resources/javascript/scripts.js"></script>
    </body>
</html>