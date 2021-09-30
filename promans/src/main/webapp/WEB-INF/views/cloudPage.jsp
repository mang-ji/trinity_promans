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
	    
	    window.addEventListener('load',function(){
	        let userid = document.getElementsByName("userid")[0].value;
	        let cpcode = document.getElementsByName("cpcode")[0].value;
	        let prcode = document.getElementsByName("prcode")[0].value;
	        let pscode = document.getElementsByName("pscode")[0].value;
	        let sccode = document.getElementsByName("sccode")[0].value;	    	
	        let data = [{userid:userid,cpcode:cpcode,prcode:prcode,pscode:pscode,sccode:sccode}];
	        postAjax("rest/getMarkList",JSON.stringify(data),"getMarkList",2);
	    });
	        
        </script>
    </head>
    <body onLoad="projectOnLoad()">
    <iframe id="iframe1" style="display:none;"></iframe>
        	<input type="hidden" name="userid" value="${userid}">
        <div class="d-flex" id="wrapper">
            <!-- Sidebar-->
            <div class="border-end bg-white" id="sidebar-wrapper">
                <a class="list-group-item list-group-item-action list-group-item-light p-4" style="font-size:20px;" href="mainPageForm">ProMan'S</a>
                <div class="list-group list-group-flush">
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="noticeForm">공지사항</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="projectForm" id="adminProject">프로젝트 관리</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="projectForm" id="project">프로젝트</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="feedbackForm">피드백</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="mailForm">메일 발송</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" onClick="cloudCate()">파일함</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" onClick="myScheduleCate()">내 업무</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="memberForm" id="adminMember">멤버 관리</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" onClick="logout()">로그아웃</a>
                </div>
            </div>
            <!-- Page content wrapper-->
            <div id="page-content-wrapper">
                <!-- Top navigation-->
                <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <div class="container-fluid">
                    <!--  @@@@@@@@@@@@@ 경로 써주는 곳 @@@@@@@@@@@@@@@@@@@@@ -->

                    </div>
                </nav>
                <!-- Page content-->
                <div class="container-fluid">
                <div class="list" style="margin-top:5%;" id="markList"></div>
                
                <div class="list" style="margin-top:5px;" id="fileList"></div>
                
                <div id="change"><input type="button" id="markBtn" style="margin-left:5%; margin-top:5px; float:left;" class="buttonStyle" value="즐겨찾기 추가" onClick="noneMarkList(this)"></div>
                <div id="delChange"><input type="button" id="deleteFile" style=" margin-top:5px; float:left;" class="buttonStyle" value="파일 삭제" onClick="delFileList()"></div>
                
                <!-- <button type="button" class="btn btn-primary">Primary</button> -->
                
                <form action="insFile" method="post" enctype="multipart/form-data">
                    <input type="hidden" name="utype" value="${utype}">
		        	<input type="hidden" name="fwriter" value="${userid}">
		        	<input type="hidden" name="cpcode" value="${cpcode}">
		        	<input type="hidden" name="prcode" value="${prcode}">
		        	<input type="hidden" name="pscode" value="${pscode}">
		        	<input type="hidden" name="sccode" value="${sccode}">
                	<input type="button" style="margin-top:5px; margin-right: 5%; float:right;" class="buttonStyle" value="파일추가" onClick="clickBtn()">
                	<div id="popup" style="display:none;"><div id="popup1">
                	<div style="width:90%; margin:auto;">
                	<div style="width:100%; font-size:40px; margin-top:30px; margin-bottom:30px;">UPLOAD</div>
                	<div>
                	<input type="text" name="ftitle" style="width:50%; height:35px; padding-left:15px; font-size:17px;" placeholder="파일 제목"></div>
                	
                	<ul class="uploadDiv">
                	
                	<li><input class="uploadName" placeholder="파일 선택" readOnly></li>
                	<li><label for="files" class="labelBtnUpload">
                	<input type="button" value="업로드" class="buttonStyle btnUpload" onClick="uploadBtn()">
                	<input type="file" id="files" class="fileClass" name="file" style="display:none;" multiple>
                	</label></li>
					
                	</ul>
                	
                	<div onClick="imgChange()" name="img"><img src="resources/images/openLogo.png" style="margin-left:4%; width: 85px;"></div>
                	<div onClick="imgChange()" name="img" style="display:none;"><img src="resources/images/closeLogo.png" style="width:60px;"></div>
                	<input type="hidden" name="fopen" value="O">
					<!-- <select name="fopen">
					<option value="O">공개</option>
					<option value="C">비공개</option>
					</select> -->
					<input type="submit" class="buttonStyle submitBtn" value="전송">
					<div style="font-size:17px;color:#bbbbbb;margin-top:20px;margin-bottom:20px;" onClick="backBtn()">뒤로가기</div>
                	
                	</div>
                	
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