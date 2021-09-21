function clickBtn(){
	let popup = document.getElementById("popup");
	
	popup.style.display = "block";
}

function getFileList(data){
	let fileList = document.getElementById("fileList");
	let list="";
	let star  = "";
	
	list += "<div>여기는 파일목록~</div>";
	
	/*name값 줘서 for문으로 즐겨찾기 되있는 값 innerHTML 해주기*/
	for(i=0; i<data.length; i++){
		//list+= "";
		list+= "<div onClick=\"insBookMark(\'"+data[i].fcode+"\',\'"+data[i].fwriter+"\')\" name=\"insBookMark\" style=\"float:left;\"\">"+
		"</div><div name=\"checkMark\"></div>"+ data[i].ftitle + " : " + data[i].fwriter +
		"<input type=\"hidden\" name=\"confirmMark\" value=\""+data[i].fcode+"\">";
		
	}

	fileList.innerHTML=list;
	/*let confirmMark = document.getElementsByName("confirmMark");
	for(i=0; i<confirmMark.length; i++){
		console.log(confirmMark[i].value);
	}*/
}

function insBookMark(fcode,fwriter){
	let cpcode = document.getElementsByName("cpcode")[0].value;
	let prcode = document.getElementsByName("prcode")[0].value;
	let pscode = document.getElementsByName("pscode")[0].value;
	let sccode = document.getElementsByName("sccode")[0].value;
	let userid = document.getElementsByName("userid")[0].value;
	let stars = document.getElementsByName("stars");
	for(i=0; i<stars.length; i++){
		console.log(stars[i].value);
	}
	let data = JSON.stringify([{cpcode:cpcode,prcode:prcode,pscode:pscode,sccode:sccode,userid:userid,fcode:fcode,fwriter:fwriter}]);
	
	//postAjax("rest/insBookMark",data,"afterInsBookMark",2);
	
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
	if(data != ""){
	let list = "";
	let mark = "";
	let markList = document.getElementById("markList");
	let checkMark = document.getElementsByName("checkMark");
	let confirmMark = document.getElementsByName("confirmMark");
	list+= "<div>여기는 즐겨찾기~</div>";
		for(i=0; i<data.length; i++){
			list+="<div name=\"alreadyStar\"></div><div>"+data[i].ftitle+ " : " +data[i].userid+"</div>";
		
		}
		let insBookMark = document.getElementsByName("insBookMark");
		for(i=0; i<data.length; i++){
			for(r=0; r<insBookMark.length; r++){
				if(i<=r){
					if(confirmMark[r].value == data[i].fcode){
						mark+="<div>★</div>";
						mark+="<input type=\"hidden\" name=\"stars\" value=\"C\">";
						insBookMark[i].innerHTML = mark;
					}else{
						mark+="<div name=\"stars\">☆</div>";
						mark+="<input type=\"hidden\" name=\"stars\" value=\"U\">";
						insBookMark[i].innerHTML = mark;
					}
					
				}
			}
		}
	markList.innerHTML = list;
	}else{
		let insBookMark = document.getElementsByName("insBookMark");
		
		for(i=0; i<insBookMark.length; i++){
			insBookMark[i].innerHTML = "☆";
			
		}
	}
}
