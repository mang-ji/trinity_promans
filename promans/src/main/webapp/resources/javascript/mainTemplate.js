 	 let publicIP;

     window.addEventListener('load',function(){
    	 getAjax('https://api.ipify.org','format=json','setPublicIP');
     });
     function setPublicIP(data){
    	 publicIP = data.ip;
     }

function cloudCate(){
	let sc = document.getElementsByName("sccode")[0];
	if(sc.value == ""){
		alert("업무를 선택하거나 다시 시도해주세요.");
		location.href = "projectForm";
	}else{
		location.href = "cloudForm";
	}
}


function projectOnLoad(){
       let adminProject = document.getElementById("adminProject");
       let project = document.getElementById("project");
       let adminMember = document.getElementById("adminMember");
       let utype = document.getElementsByName("utype")[0];

       if(utype.value == "G"){
              adminProject.style.display = "none";
              project.style.display = "block";
              adminMember.style.display = "none";
           }else{
              adminProject.style.display = "block";
              project.style.display = "none";
              adminMember.style.display = "block";
           }


	   if(utype.value == 'A'){
		adminMember.style.display = "block";
		}else{
		adminMember.style.display = "none";
			}

    }

function myScheduleCate(){
	let pscode = document.getElementsByName("pscode")[0];
	if(pscode.value == ""){
		location.href = 'projectForm';
		alert("스텝을 선택해주세요.");
	}else{
		location.href = 'myScheduleForm';		
	}
}

     function logout(){
 		 let userid1 = document.getElementsByName("userid")[0];
		 let cpcode1 = document.getElementsByName("cpcode")[0];
    	 let form = document.createElement("form");
    	 let puIp = makeInput('hidden','publicip',publicIP);
    	 let prIp = makeInput('hidden','privateip',location.host);
    	 let method = makeInput('hidden','method',-1);
    	 form.action = "logOut";
    	 form.method = "post";
    	 
    	 form.appendChild(userid1);
    	 form.appendChild(cpcode1);
    	 form.appendChild(puIp);
    	 form.appendChild(prIp);
    	 form.appendChild(method);
    	 
    	 document.body.appendChild(form);
    	 
    	 form.submit();
     }
     

function getAjax(jobCode,clientData,fn){
	let ajax = new XMLHttpRequest();
	
	ajax.onreadystatechange = function(){
	if(ajax.readyState==4 && ajax.status==200){
		
		window[fn](JSON.parse(ajax.responseText));
		
	}
}
	if(clientData != ""){
		jobCode += "?" + clientData;
	}
	ajax.open("GET", jobCode);
	ajax.send();
}


function postAjax(jobCode,clientData,fn,type){
      let ajax = new XMLHttpRequest();

      ajax.onreadystatechange = function() {
         if (ajax.readyState == 4 && ajax.status == 200) {
            const jsonData = ajax.responseText;
            window[fn](JSON.parse(jsonData));
         }
      };
      ajax.open("POST", jobCode);
	
	if(type==1){
	ajax.setRequestHeader("content-type","application/x-www-form-urlencoded");
	 }else if(type==2){
		ajax.setRequestHeader("content-type", "application/json");
	}
      ajax.send(clientData);
	
}

function makeInput(type, name, value){
	let input = document.createElement("input");
	
	input.setAttribute("type" , type);
	input.setAttribute("name" , name);
	input.setAttribute("value" , value);
	
	return input;
	
	
}
/*
function postAjax(jobCode, clientData, fn) {
      let ajax = new XMLHttpRequest();

      ajax.onreadystatechange = function() {
         if (ajax.readyState == 4 && ajax.status == 200) {
            const jsonData = ajax.responseText;

            window[fn](JSON.parse(jsonData));
         }
      };
      ajax.open("POST", jobCode);
      ajax.setRequestHeader("content-type", "application/json");
      ajax.send(clientData);

   }*/

