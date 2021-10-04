<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<script src="http://code.jquery.com/jquery-latest.js"></script>
	<link href="resources/css/adminSchedule.css"rel="stylesheet"type="text/css">
	<script type="text/javascript" src="resources/javascript/adminSchedule.js"></script>
	<script type="text/javascript" src="resources/javascript/PageCount.js"></script>
	<script type="text/javascript" src="resources/javascript/mainTemplate.js"></script>
	<script src="https://cdn.amcharts.com/lib/4/core.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
     <script src="resources/javascript/scripts.js"></script>

        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
       	<link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        <title>관리자 업무</title>
        
         <script>
     window.addEventListener('load',function(){
    	    
    	   let pscode = document.getElementsByName("pscode")[0];
 		   let sccode = document.getElementsByName("sccode")[0];
 		   let prcode = document.getElementsByName("prcode")[0];
 		   let cpcode = document.getElementsByName("cpcode")[0];
 		   let userid = document.getElementsByName("userid")[0];
 		
 		
    		let jsonData = [{cpcode:cpcode.value, prcode:prcode.value, pscode:pscode.value, sccode:sccode.value, userid:userid.value}];
    		
    		let clientData = JSON.stringify(jsonData);
    		
    		
    		postAjax("rest/GetScheDetail", clientData, "selectScheDetail", 2);
    		
    		postAjax("rest/GetNot", clientData, "getNot",2);

    		postAjax("rest/GetSDGraph", clientData, "getSDGraph",2);
    		
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
        	<input type="hidden" name="prname" value="${prname}">
        	<input type="hidden" name="psname" value="${psname}">
        	
   
        <form action='CreateProject' method='post' >
	<div id ='Form'>
	 <div id="modal_background" style='display:none;'>
	 	
	 	<div id="modal_box">
	 	<div id="requestList"></div>
	 	</div>
	 	<div id = "modal_box2" style = 'display:none;'></div>
	 </div>
	 </div>
	</form>
        	<div id ='reqMenu' ></div>
        <div  class="d-flex" id="wrapper">
            <!-- Sidebar-->
            <div style="position:fixed;" >
            <div  class="border-end " id="sidebar-wrapper">
                <div class="sidebar-heading "></div>
                <div class="list-group list-group-flush">
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="noticeForm">공지사항</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="projectForm" id="adminProject">프로젝트 관리</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="projectForm" id="project" onClick="getSchedule()">프로젝트</a>
                    
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="feedbackForm">피드백</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="mailForm">메일 발송</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" onClick="cloudCate()">파일함</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" onClick="myScheduleCate()">내 업무</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="memberForm" id="adminMember">멤버 관리</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" onClick="logout()">로그아웃</a>
                    
               		<!-- <input type="button" onClick="logout()" value="로그아웃"> -->
                </div>
                 <div id ="chartdiv"></div>
            </div>
             
            </div>
              
            
            <!-- Page content wrapper-->
            <div id="page-content-wrapper">
          
                <!-- Top navigation-->
                    <div id="logo" style="color:#4f5f86; margin-bottom:50px; font-size:50px; text-align:center; font-family : 'Nanum Gothic'; sans-serif; font-weight:bold;" onClick="promans()">ProMan'S</div>
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
             
             <div id="projectPath"></div>
                <!-- Page content-->
                <div  class="container-fluid">
                		
                	<div class="feed" style="padding-left:450px;" ></div>
                	
                    <div id="selectScheduleDetail"></div>
                    
                </div>
            </div>
            <div style="width:200px;line-height:2;"><span id="loginInfo"> ${userid }</span><span id="welcome">님 환영합니다!</span></div>
             <div id="notices">
             <div id = reqMenu></div>
              
             	<div id="child1"></div>
             	<div id="child2" ><div id = 'SCList'>WORK LIST</div></div>
             </div>
            
         
        </div>
        
        <div id="backPop"></div>
        
        <div id="mainPop"><div id="popUp"></div></div>
        
       

   </body>
</html>