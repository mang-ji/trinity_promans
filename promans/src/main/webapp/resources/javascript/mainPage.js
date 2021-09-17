function getProject1 (jsonData){
	let list = "";
	let getProject = document.getElementById("getProject"); // &emsp; 띄워쓰기 
		alert(jsonData.length);
	for(i=0; i<jsonData.length; i++){

			list += "<div id='projectBox'><div class='lists' onClick = \"goAdminProject(\'"+jsonData[i].prcode+"\')\"><div id='steptitle'><div id='circle'>"+ (i+1) +"</div>&emsp;&emsp;&emsp;" +jsonData[i].prname +"</div><div id='dates'>"+ jsonData[i].prdate +"&emsp;비공개</div></div></div>";	
/*

list += "<div id='buttons'><input type='button' class='buttonStyle'  value='편집' onClick=\"sendProjectInfo(\'"+ jsonData[i].prcode +"\')\"/>";
list += "<input type='button' class='buttonStyle' value='멤버 추가' onClick=\"getProjectMember(\'"+ jsonData[i].prcode +"\')\"><div id='createBtn'></div></div></div>"; */
	}
	
	
	getProject.innerHTML = list;
}






function getWaitingProStep(jsonData){
	/*let modal_background = document.getElementById("modal_background");
	let modal_box = document.getElementById("modal_box");
	let requestList = document.getElementById("requestList");
	
	let list = "";
		list += "<div>프로젝트 스텝 완료 요청</div>";
		list += "<div> "+ jsonData[0].psname +" "+jsonData[0].username+"  "+jsonData[0].stname +"</div>";
	
		modal_background.style.display = "block";
		modal_box.style.display = "block";
		requestList.innerHTML = list;
		
		

	*/
		
	let box = document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");
  		 box.innerHTML += "<div class='modal' tabindex='-1' role='dialog' style='border:1px solid black;'>완료 요청 대기 리스트";
  		 box.innerHTML += "<div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'>";
   		 box.innerHTML += "<h5 class='modal-title'></h5></div>";
   	
    for(i=0; i<jsonData.length; i++){
   		box.innerHTML += "<div class='modal-body'><p>"+jsonData[i].psname+jsonData[i].username+jsonData[i].stname+"</p></div>";  
   }
  		 box.innerHTML += "<div class='modal-footer'>";
  		 box.innerHTML += "<button type='button' class='btn btn-primary'>Save changes</button>";
  		 box.innerHTML += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>";
  		 box.innerHTML += "</div></div></div></div>";

		modal_background.style.display = "block";
		box.style.display = "block";
		
} 


function goAdminProject(prcode){
     let f = document.createElement("form");
     let input = document.createElement("input");

          input.type = "hidden";
          input.value = prcode;
          input.name = "prcode";

       alert(input.value);

     f.appendChild(input);

     document.body.appendChild(f);

     f.action= "goAdminProjectForm";
     f.method= "POST";
	
	f.submit();
	
}

function close1(){
	let modal_box = document.getElementById("modal_box");
	let modal_background = document.getElementById("modal_background");
	//let close = document.getElementById("modal_close");
	
	/*
	modal_box.style.display= "none";
	modal_background.style.display= "none";*/
	modal_box.remove();
	modal_background.remove();
	//close.style.display ="none";
}

function close2(){
	let modal_box = document.getElementById("modal_box2");
	let modal_background = document.getElementById("modal_background2");
	//let close = document.getElementById("modal_close");
	
	modal_box.style.display= "none";
	modal_background.style.display= "none";
	
	//close.style.display ="none";
	
}




function test(){
	//.addEventListener('click',function(){
		//써봐야지 
//	} )	
}