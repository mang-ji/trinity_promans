<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<script src="http://code.jquery.com/jquery-latest.js"></script>
<link href="resources/css/styles.css" rel="stylesheet" type="text/css">
<link href="resources/css/noticePage.css" rel="stylesheet"
	type="text/css">
<script type="text/javascript" src="resources/javascript/noticePage.js"></script>
<script type="text/javascript"
	src="resources/javascript/mainTemplate.js"></script>
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<link rel="icon" type="image/x-icon" href="assets/favicon.ico" />

<script>
	window.addEventListener('load', function() {
		let cpcodes = document.getElementsByName("cpcode")[0];
		let userids = document.getElementsByName("writer")[0];
		let data = [ {cpcode : cpcodes.value, writer : userids.value} ];
		postAjax("rest/getNotice", JSON.stringify(data), 'afterNotice', 2);
	});

	function afterNotice(data) {
		let tablebody = document.getElementById("table_body");
		let html = "";
		
		for (i = 0; i < data.length; i++) {
			html += "<tr onClick = \"NoticeClick(\'"+data[i].title+"\', \'"+data[i].sdate+"\', \'" +data[i].contents+ "\')\">";
			html += "<td>1</td>";
			html += "<td>" + data[i].title + "</td>";
			html += "<td>" + data[i].sdate + "</td></tr>";
			
		}

		tablebody.innerHTML = html;
	}
	
	function NoticeClick(title, sdate, contents){
		let Notice = document.getElementById("Notice");
		let table_notice = document.getElementById("table_notice");
		let html = "";
		
		table_notice.remove();
		//"<input type='text' name='NoticeDetail' onClick='NoticeDetail()'/>
		html += "<div id =\"box\">";
		html += "<div id = \"title\">"+"제목 : "+title+"</div>";
		html += "<div id = \"date\">"+"작성날짜 : "+sdate+"</div>";
		html += "<div id = \"contents\">"+contents+"</div>";
		html += "<a href=\"noticeForm\"><input type =\"button\" id = \"btn\" value =\"목록\" ></a>";
		html += "</div>";
		Notice.innerHTML = html;
	}
	
	
	
	
	
	
</script>


<title>공지사항</title>

<style>
table {
	width: 100%;
	border: 1px solid #444444;
}
</style>

</head>
<body onLoad="projectOnLoad()">
	<input type="hidden" name="utype" value="${utype}">
	<input type="hidden" name="cpcode" value="${cpcode}">
	<input type="hidden" name="writer" value="${userid}">

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
					href="memberForm" id="adminMember">멤버 관리</a>
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
				<table id = "table_notice">
						<tr >
							<th></th>
							<th>제목</th>
							<th>작성날짜</th>
						</tr>
					<tbody id = "table_body">
						
					</tbody>
					
				</table>
			<div id = "Notice">
				
			</div>
			
			</div>
		</div>
	</div>

	<!-- 공지사항 틀 -->




	<!-- Bootstrap core JS-->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
	<!-- Core theme JS-->
	<script src="resources/javascript/scripts.js"></script>
</body>
</html>