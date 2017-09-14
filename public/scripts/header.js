// Ugly but works for now
window.onload = initHome();

let initHome = () => {
	APICall("user",getUser);
}

let getUser = (user) => {
	let userBox = $("user");
	userBox.innerHTML = user.name;
}

let APICall = (request,callback) => {
	let link = "/api/"+request;
	$.get(link, f);
}
