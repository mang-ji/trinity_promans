function clickBtn(){
	let popup = document.getElementById("popup");
	
	popup.style.display = "block";
}

function backBtn(){
	let popup = document.getElementById("popup");
	
	popup.style.display = "none";
}



$(document).ready(function(){
	var files = $(".fileClass");
	
	files.on('change',function(){
		if(window.FileReader){
			var filename = $(this)[0].files[0].name;
		}
		
		$(".uploadName").val(filename);
	});
})




function getFileList(data){
	let fileList = document.getElementById("fileList");
	let style = document.createElement("style");
	let list="";
	let css  = "";
	
	list += "<div style=\"text-align:center; font-size:20px; font-weight:bold;\">file list</div>";
	
		list+= "<div style=\"width:100%; height:30px; margin:auto; border-top:1px solid #bbbbbb;\">";
		list+= "<div style=\"width:10%; height:30px; float:left; padding-right:10px; font-size:17px; font-weight:bold; text-align:right; color:#585858; border-right:1px solid #bbbbbb;\">num</div>";
		list+= "<div style=\"width:39.99%; height:30px; float:left; text-align:center; font-size:17px; font-weight:bold; letter-spacing:1.5px; border-right:1px solid #bbbbbb;\">Title</div>";
		list+= "<div style=\"width:35%; height:30px; float:left; text-align:center; font-size:17px; font-weight:bold; letter-spacing:1.5px; border-right:1px solid #bbbbbb;\">Writer</div>";
		list+= "<div style=\"width:15%; height:30px; float:left; text-align:center; font-size:17px; font-weight:bold; letter-spacing:1.5px; color:#bbbbbb;\">Date</div>";
		list+= "</div>";
	
	for(i=0; i<data.length; i++){
		list+= "<div class=\"item_list\" id=\"flRadio"+i+"\"><label for=\"flRadio"+i+"\" style=\"width:100%;height:30px; margin:auto;\">";
		list+= "<div style=\"width:10%; height:30px; float:left; padding-right:10px; text-align:right; color:#585858; border-right:1px solid #bbbbbb;\">"+(i+1)+"</div>";
		list+= "<div style=\"width:39%; height:30px; float:left; margin-left:10px; letter-spacing:1.5px; overflow:hidden; border-right:1px solid #bbbbbb;\">"+ data[i].ftitle +"</div>";
		list+= "<div style=\"width:34.1%; height:30px; float:left; margin-left:10px; border-right:1px solid #bbbbbb;\">"+ data[i].fwriter +"</div>";
		list+= "<div style=\"width:14%; height:30px; float:left; margin-left:9.4px; color:#bbbbbb;\">"+ data[i].fdate +"</div>";
		list+= "</label></div>";
		
	}

	fileList.innerHTML=list;
	
}

function insBookMark(fcode,fwriter){
	if(confirm("즐겨찾기에 추가하시겠습니까?")){
		let cpcode = document.getElementsByName("cpcode")[0].value;
		let prcode = document.getElementsByName("prcode")[0].value;
		let pscode = document.getElementsByName("pscode")[0].value;
		let sccode = document.getElementsByName("sccode")[0].value;
		let userid = document.getElementsByName("userid")[0].value;
		let data = JSON.stringify([{cpcode:cpcode,prcode:prcode,pscode:pscode,sccode:sccode,userid:userid,fcode:fcode,fwriter:fwriter}]);
	
		postAjax("rest/insBookMark",data,"afterInsBookMark",2);
	}else{
		alert("취소하였습니다.");
	}
		
}

function afterInsBookMark(data){
	if(data==true){
		location.href = "cloudForm";
		alert("즐겨찾기에 추가되었습니다.");
	}else{
		location.href = "cloudForm";
		alert("다시 시도해주세요.");
	}
}


function getMarkList(data){
	let list = "";
	let markList = document.getElementById("markList");
	list+= "<input type=\"checkbox\" id=\"markOn\" onClick=\"markOnOff(this)\"><label for=\"markOn\" style=\"cursor:pointer;\">BookMark</label>";
		
		list+= "<div style=\"width:100%; height:30px; margin:auto; border-top:1px solid #bbbbbb;\">";
		list+= "<div style=\"width:10%; height:30px; float:left; padding-right:10px; font-size:17px; font-weight:bold; text-align:right; color:#585858; border-right:1px solid #bbbbbb;\">Mark</div>";
		list+= "<div style=\"width:39.99%; height:30px; float:left; text-align:center; font-size:17px; font-weight:bold; letter-spacing:1.5px; border-right:1px solid #bbbbbb;\">Title</div>";
		list+= "<div style=\"width:35%; height:30px; float:left; text-align:center; font-size:17px; font-weight:bold; letter-spacing:1.5px; border-right:1px solid #bbbbbb;\">Writer</div>";
		list+= "<div style=\"width:15%; height:30px; float:left; text-align:center; font-size:17px; font-weight:bold; letter-spacing:1.5px; color:#bbbbbb;\">Date</div>";
		list+= "</div>";
		
		for(i=0; i<data.length; i++){
			list+="<div class=\"item_list\" name=\"markCss\" style=\"display:none;\">";
			list+= "<div style=\"width:10%; height:30px; float:left; padding-right:10px; text-align:right; color:#585858; border-right:1px solid #bbbbbb;\"onClick=\"alreadyMark(\'"+data[i].fcode+"\')\">★</div>";
			list+= "<div style=\"width:39%; height:30px; float:left; margin-left:10px; letter-spacing:1.5px; overflow:hidden; border-right:1px solid #bbbbbb;\">"+ data[i].ftitle +"</div>";
			list+= "<div style=\"width:34.1%; height:30px; float:left; margin-left:10px; border-right:1px solid #bbbbbb;\">"+ data[i].fwriter +"</div>";
			list+= "<div style=\"width:14%; height:30px; float:left; margin-left:9.4px; color:#bbbbbb;\">"+ data[i].fdate +"</div>";
			list+= "</label></div>";
		
		}
		markList.innerHTML=list;
}

function markOnOff(obj){
	let mark = document.getElementsByName("markCss");
	if(obj.checked){
		for(i=0; i<mark.length; i++){
			mark[i].style.display = "block";
		}
	}else{
		for(i=0; i<mark.length; i++){
			mark[i].style.display = "none";
		}
	}
}


function alreadyMark(fcode){
	let cpcode = document.getElementsByName("cpcode")[0].value;
	let prcode = document.getElementsByName("prcode")[0].value;
	let pscode = document.getElementsByName("pscode")[0].value;
	let sccode = document.getElementsByName("sccode")[0].value;
	
	let data = JSON.stringify([{cpcode:cpcode,prcode:prcode,pscode:pscode,sccode:sccode,fcode:fcode}]);
	
	postAjax("rest/deleteMark",data,"afterDeleteMark",2);
}

function afterDeleteMark(data){
	if(data==true){
		location.href = "cloudForm";
		alert("즐겨찾기에서 제외되었습니다.");
	}else{
		location.href = "cloudForm";
		alert("다시 시도해주세요.");
	}
	
}

function noneMarkList(obj){
	let cpcode = document.getElementsByName("cpcode")[0].value;
	let prcode = document.getElementsByName("prcode")[0].value;
	let pscode = document.getElementsByName("pscode")[0].value;
	let sccode = document.getElementsByName("sccode")[0].value;
	let userid = document.getElementsByName("userid")[0].value;
	let change = document.getElementById("change");
	
	let data = JSON.stringify([{cpcode:cpcode,prcode:prcode,pscode:pscode,sccode:sccode,userid:userid}]);
	
	postAjax("rest/noneMarkList",data,"afternoneMarkList",2);
	obj.remove();
	
	change.innerHTML="<a href=\"cloudForm\"><input type=\"button\" class=\"buttonStyle\" style=\"margin-top:5px; margin-left:7.4%; float:left;\" value=\"취소\"></a>";	
}


function afternoneMarkList(data){
	let fileList = document.getElementById("fileList");
	let style = document.createElement("style");
	let css = "";
	let list = "";
	
		list += "<div style=\"text-align:center; font-size:20px; font-weight:bold;\">file list</div>";
	
		list+= "<div style=\"width:100%; height:30px; margin:auto; border-top:1px solid #bbbbbb;\">";
		list+= "<div style=\"width:10%; height:30px; float:left; padding-right:10px; font-size:17px; font-weight:bold; text-align:right; color:#585858; border-right:1px solid #bbbbbb;\">num</div>";
		list+= "<div style=\"width:39.99%; height:30px; float:left; text-align:center; font-size:17px; font-weight:bold; letter-spacing:1.5px; border-right:1px solid #bbbbbb;\">Title</div>";
		list+= "<div style=\"width:35%; height:30px; float:left; text-align:center; font-size:17px; font-weight:bold; letter-spacing:1.5px; border-right:1px solid #bbbbbb;\">Writer</div>";
		list+= "<div style=\"width:15%; height:30px; float:left; text-align:center; font-size:17px; font-weight:bold; letter-spacing:1.5px; color:#bbbbbb;\">Date</div>";
		list+= "</div>";
	
	for(i=0; i<data.length; i++){
		list+= "<input type=\"radio\" name=\"flRadio\" id=\"flRadio"+i+"\" onClick=\"insBookMark(\'"+data[i].fcode+"\',\'"+data[i].fwriter+"\')\"><label for=\"flRadio"+i+"\" style=\"width:100%;height:30px; margin:auto;\">";
		list+= "<div style=\"width:10%; height:30px; float:left; padding-right:10px; text-align:right; border-right:1px solid #bbbbbb;\">"+(i+1)+"</div>";
		list+= "<div style=\"width:39%; height:30px; float:left; margin-left:10px; letter-spacing:1.5px; overflow:hidden; border-right:1px solid #bbbbbb;\">"+ data[i].ftitle +"</div>";
		list+= "<div style=\"width:34.1%; height:30px; float:left; margin-left:10px; border-right:1px solid #bbbbbb;\">"+ data[i].fwriter +"</div>";
		list+= "<div style=\"width:14%; height:30px; float:left; margin-left:9.4px;\" class=\"fdateColor\">"+ data[i].fdate +"</div>";
		list+= "</label></div>";
		

		css+= "input[id=\"flRadio"+i+"\"] \+ label{border-top:1px solid #bbbbbb; border-bottom:1px solid #bbbbbb; width:100%; height:30px; margin:auto;}";
		css+= "input[id=\"flRadio"+i+"\"]:checked \+ label{border-top:1px solid #0A0A2A; border-bottom:1px solid #0A0A2A; background-color:#D8D8D8; color:#ffffff;}";
		css+= "input[id=\"flRadio"+i+"\"]:checked:hover \+ label{border-top:1px solid #0A0A2A; border-bottom:1px solid #0A0A2A; background-color:#424242; color:#ffffff;}";
		css+= "input[id=\"flRadio"+i+"\"]:checked:active \+ label{border-top:1px solid #0A0A2A; border-bottom:1px solid #0A0A2A; background-color:#E6E6E6; color:#424242;}";
		css+= "input[id=\"flRadio"+i+"\"]:hover \+ label{border-top:1px solid #0A0A2A; border-bottom:1px solid #0A0A2A; background-color:#F2F2F2; color:#848484;}";
		css+= "input[id=\"flRadio"+i+"\"]:active \+ label{border-top:1px solid #0A0A2A; border-bottom:1px solid #0A0A2A; background-color:#E6E6E6; color:#424242;}";
		css+= "input[id=\"flRadio"+i+"\"]{display:none;}";
		css+= ".fdateColor{color:#848484;}";
	 	
	}
	
	/*list += "<div style=\"text-align:center; font-size:20px; font-weight:bold;\">file List</div>";
	
	for(i=0; i<data.length; i++){
		list+="<input type=\"radio\" name=\"fileRadio\" id=\"fileRadio"+i+"\" onClick=\"insBookMark(\'"+data[i].fcode+"\',\'"+data[i].fwriter+"\')\">"+
		"<label for=\"fileRadio"+i+"\">"+data[i].fname+ " : "+data[i].fwriter+"</label><br>";
		
		css+="input[id=\"fileRadio"+i+"\"] \+ label{border:1px solid #bbbbbb; cursor:pointer; width:500px;}";
		css+="input[id=\"fileRadio"+i+"\"]:hover \+ label{background-color:#bbbbbb;}";
		css+="input[id=\"fileRadio"+i+"\"]{display:none;}";

	}*/
	
	style.innerHTML = css;
	document.head.append(style);
	fileList.innerHTML=list;
}


function delFileList(){
	let fwriter = document.getElementsByName("fwriter")[0].value;
	let cpcode = document.getElementsByName("cpcode")[0].value;
	let prcode = document.getElementsByName("prcode")[0].value;
	let pscode = document.getElementsByName("pscode")[0].value;
	let sccode = document.getElementsByName("sccode")[0].value;
    let data = [{fwriter:fwriter,cpcode:cpcode,prcode:prcode,pscode:pscode,sccode:sccode}];
   	
	postAjax("rest/getFileList",JSON.stringify(data),"afterDelFileList",2);	

}

function afterDelFileList(data){
	let fileList = document.getElementById("fileList");
	let delChange = document.getElementById("delChange");
	let deleteFile = document.getElementById("deleteFile");
	let style = document.createElement("style");
	let change = document.getElementById("change");
	let markBtn = document.getElementById("markBtn");
	let list="";
	let css  = "";
	
	list += "<div style=\"text-align:center; font-size:20px; font-weight:bold;\">file list</div>";
	
		list+= "<div style=\"width:100%; height:30px; margin:auto; border-top:1px solid #bbbbbb;\">";
		list+= "<div style=\"width:10%; height:30px; float:left; padding-right:10px; font-size:17px; font-weight:bold; text-align:right; color:#585858; border-right:1px solid #bbbbbb;\">num</div>";
		list+= "<div style=\"width:39.99%; height:30px; float:left; text-align:center; font-size:17px; font-weight:bold; letter-spacing:1.5px; border-right:1px solid #bbbbbb;\">Title</div>";
		list+= "<div style=\"width:35%; height:30px; float:left; text-align:center; font-size:17px; font-weight:bold; letter-spacing:1.5px; border-right:1px solid #bbbbbb;\">Writer</div>";
		list+= "<div style=\"width:15%; height:30px; float:left; text-align:center; font-size:17px; font-weight:bold; letter-spacing:1.5px; color:#bbbbbb;\">Date</div>";
		list+= "</div>";
	
	for(i=0; i<data.length; i++){
		list+= "<input type=\"checkbox\" name=\"flRadio\" id=\"flRadio"+i+"\" value=\""+data[i].fcode+"\"><label for=\"flRadio"+i+"\" style=\"width:100%;height:30px; margin:auto;\">";
		list+= "<div style=\"width:10%; height:30px; float:left; padding-right:10px; text-align:right; border-right:1px solid #bbbbbb;\">"+(i+1)+"</div>";
		list+= "<div style=\"width:39%; height:30px; float:left; margin-left:10px; letter-spacing:1.5px; overflow:hidden; border-right:1px solid #bbbbbb;\">"+ data[i].ftitle +"</div>";
		list+= "<div style=\"width:34.1%; height:30px; float:left; margin-left:10px; border-right:1px solid #bbbbbb;\">"+ data[i].fwriter +"</div>";
		list+= "<div style=\"width:14%; height:30px; float:left; margin-left:9.4px;\" class=\"fdateColor\">"+ data[i].fdate +"</div>";
		list+= "</label></div>";
		

		css+= "input[id=\"flRadio"+i+"\"] \+ label{border-top:1px solid #bbbbbb; border-bottom:1px solid #bbbbbb; width:100%; height:30px; margin:auto;}";
		css+= "input[id=\"flRadio"+i+"\"]:checked \+ label{border-top:1px solid #0A0A2A; border-bottom:1px solid #0A0A2A; background-color:#D8D8D8; color:#ffffff;}";
		css+= "input[id=\"flRadio"+i+"\"]:checked:hover \+ label{border-top:1px solid #0A0A2A; border-bottom:1px solid #0A0A2A; background-color:#424242; color:#ffffff;}";
		css+= "input[id=\"flRadio"+i+"\"]:checked:active \+ label{border-top:1px solid #0A0A2A; border-bottom:1px solid #0A0A2A; background-color:#E6E6E6; color:#424242;}";
		css+= "input[id=\"flRadio"+i+"\"]:hover \+ label{border-top:1px solid #0A0A2A; border-bottom:1px solid #0A0A2A; background-color:#F2F2F2; color:#848484;}";
		css+= "input[id=\"flRadio"+i+"\"]:active \+ label{border-top:1px solid #0A0A2A; border-bottom:1px solid #0A0A2A; background-color:#E6E6E6; color:#424242;}";
		css+= "input[id=\"flRadio"+i+"\"]{display:none;}";
		css+= ".fdateColor{color:#848484;}";
	 	
	}
	markBtn.remove();
	deleteFile.remove();
	change.innerHTML="<a href=\"cloudForm\"><input type=\"button\" class=\"buttonStyle\" style=\"margin-top:5px; margin-left:7.4%; float:left;\" value=\"취소\"></a>";	
	delChange.innerHTML+= "<input type=\"button\" class=\"buttonStyle\" style=\"float:left; margin-top:5px;\" value=\"삭제하기\" onClick=\"deleteFiles()\">";
	style.innerHTML=css;
	document.head.append(style);
	fileList.innerHTML=list;
}

function deleteFiles(){
	let flRadio = document.getElementsByName("flRadio");
	let cpcode = document.getElementsByName("cpcode")[0].value;
	let prcode = document.getElementsByName("prcode")[0].value;
	let pscode = document.getElementsByName("pscode")[0].value;
	let sccode = document.getElementsByName("sccode")[0].value;
	let result = "";
	let data = [];
	for(i=0; i<flRadio.length; i++){
		if(flRadio[i].checked){
			result = flRadio[i].value;			
			data.push({cpcode:cpcode,prcode:prcode,pscode:pscode,sccode:sccode,fcode:result});
		}
	}
	
	if(result==""){
		alert("파일을 선택해주세요.");
		return;
	}
	
	postAjax("rest/deleteFiles",JSON.stringify(data),"afterDeleteFiles",2);
	
}

function afterDeleteFiles(data){
	if(data==true){
		alert("파일이 삭제되었습니다.");
		location.href = "cloudForm";
	}else{
		alert("다시 시도해주세요.");
		location.href = "cloudForm";
	}
	
	
}

function uploadBtn(){
	let files = document.getElementById("files");
	files.click();
	
}

function imgChange(){
	let fopen = document.getElementsByName("fopen")[0];
	let img = document.getElementsByName("img");
	if(fopen.value == "C"){
		img[0].style.display = "block";
		img[1].style.display = "none";
		fopen.value = "O";
	}else{
		img[1].style.display = "block";
		img[0].style.display = "none";
		fopen.value = "C";
	}
	
}

