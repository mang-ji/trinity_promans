function clickBtn(){
	let popup = document.getElementById("popup");
	
	popup.style.display = "block";
}

function getFileList(data){
	let fileList = document.getElementById("fileList");
	let list="";
	let star  = "";
	
	list += "<div>여기는 파일목록~</div>";
	
	for(i=0; i<data.length; i++){
		list+="<div name=\"star\"></div><div>"+data[i].ftitle+ " : " +data[i].userid+"</div>";
		star = document.getElementsByName("star")[i];
		
	}
	
	fileList.innerHTML=list;
}
