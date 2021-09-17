<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<script src="http://code.jquery.com/jquery-latest.js"></script>
	<link href="resources/css/styles.css"rel="stylesheet"type="text/css">
	<link href="resources/css/cloudPage.css"rel="stylesheet"type="text/css">
	<script type="text/javascript" src="resources/javascript/cloudPage.js"></script>
	<script type="text/javascript" src="resources/javascript/mainTemplate.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
       	<link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        <title>로그인</title>
        <script>
	    window.addEventListener('load',function(){
			        let fwriter = document.getElementsByName("fwriter")[0].value;
			        let cpcode = document.getElementsByName("cpcode")[0].value;
			        let prcode = document.getElementsByName("prcode")[0].value;
			        let pscode = document.getElementsByName("pscode")[0].value;
			        let sccode = document.getElementsByName("sccode")[0].value;
        			let data = [{fwriter:fwriter,cpcode:cpcode,prcode:prcode,pscode:pscode,sccode:sccode}];
        			postAjax("rest/getFileList",JSON.stringify(data),"getFileList",2);
	     });
	        
        </script>
    </head>
    <body onLoad="projectOnLoad()">
        	
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
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" onClick="cloudCate()">파일함</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" onClick="myScheduleCate()">내 업무</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="memberForm" id="adminMember">멤버 관리</a>
                	<input type="button" onClick="logout()" value="로그아웃">
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
                <div id="markList"></div>
                <div id="fileList"></div>
                
                
                <form action="insFile" method="post" enctype="multipart/form-data">
                    <input type="hidden" name="utype" value="${utype}">
		        	<input type="hidden" name="fwriter" value="${userid}">
		        	<input type="hidden" name="cpcode" value="${cpcode}">
		        	<input type="hidden" name="prcode" value="${prcode}">
		        	<input type="hidden" name="pscode" value="${pscode}">
		        	<input type="hidden" name="sccode" value="${sccode}">
                	<input type="button" value="파일추가" onClick="clickBtn()">
                	<div id="popup" style="display:none;"><div id="popup1">
                	<input type="file" name="file" multiple>
					<input type="text" name="ftitle" placeholder="파일 제목">
					<select name="fopen">
					<option value="O">공개</option>
					<option value="C">비공개</option>
					</select>
					<input type="submit" value="전송">
                	</div></div>
				</form>
                </div>
            </div>
        </div>
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="resources/javascript/scripts.js"></script>
    </body>
</html>