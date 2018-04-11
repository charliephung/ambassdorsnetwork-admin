// Listen for submt
let form = document.getElementById("form"),
	main = document.getElementById("main"),
	logoutButton = document.getElementById("logout"),
	loginForm = document.getElementById("loginForm"),
	username = document.getElementById("username");

// Authenticate
form.addEventListener("submit", submitForm);
logoutButton.addEventListener("click", logUserOut);
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		username.innerText = `: ${user.email}`;
		loginForm.style.display = "none";
		logoutButton.style.display = "block";
		main.style.display = "block";

		CardPost(postUploaded);
		TablePost(postManage);
		CardNews();
		TableUsers(userTBody);
	} else {
		loginForm.style.display = "block";
		logoutButton.style.display = "none";
		main.style.display = "none";
	}
});
// Submit form
function submitForm(e) {
	e.preventDefault();
	let email = getValue("email"),
		password = getValue("password");
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			form.style.display = "none";
			logoutButton.style.display = "block";
		}
	});
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
		if (errorMessage) {
			let alertMessage = document.getElementsByClassName("alert-danger");
			let i = document.getElementById("alert");
			i.innerText = `${errorMessage}`;
			alertMessage[0].style.display = "block";
		}

	});
	form.reset();
}
// logout
function logUserOut() {
	firebase.auth().signOut().then(function () {
		form.style.display = "block";
		postUploaded.innerHTML = "";
		username.innerText = "";
	}).catch(function (error) {
	});
}
// Get stuff
function getValue(id) {
	return document.getElementById(id).value;
}


