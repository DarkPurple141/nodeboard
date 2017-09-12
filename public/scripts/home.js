window.onload = initHome();

function initHome(){
	APICall("user",getUser);
}

function getUser(user){
	let userBox = document.getElementById("user");
	if(user.success === false){
		userBox.innerHTML = "Login";
		userBox.href = "/login";
	}else{
		username = user.name;
		userBox.innerHTML = username.charAt(0).toUpperCase() + username.slice(1);
	}
}

function APICall(request,f){
	var link = "/api/"+request;
	$.get(link, f);
}



