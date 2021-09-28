function findPass(){
	let emailBox = document.getElementById("emailBox");
	let userid = document.getElementById("idBox");
	
	let f = document.createElement("form");
	
	f.action = "findPass";
	f.method = "post";
	
	f.appendChild(emailBox);
	f.appendChild(userid);
	
	document.body.appendChild(f);
	
	f.submit();
	
}