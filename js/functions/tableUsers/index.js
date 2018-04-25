let userForm = document.getElementById("user__form"),
	userFormName = document.getElementById("user__form__name"),
	userEmail = document.getElementById("user__email"),
	userId = document.getElementById("user__id"),
	userInterest = document.getElementById("user__interest"),
	userName = document.getElementById("user__name"),
	userAddress = document.getElementById("user__address"),
	userImage = document.getElementById("user__image"),
	userTBody = document.getElementById("user__tbody"),
	deleteImageButton = document.getElementsByClassName("deleteImage"),
	userFormBackground = document.getElementById("users__form__background");


// Edit user
let userLeft = document.getElementById("user__left"),
	userRight = document.getElementById("user__right");
addEventSubmitEditUser();
function addEventEditUser() {
	let editButton = document.getElementsByClassName("editUser");

	for (let i = 0; i < editButton.length; i++) {
		editButton[i].addEventListener("click", (e) => {
			if (userLeft.style.display === "block") {
				userLeft.style.display = "none"
				userRight.className = "col-12";
				userForm.reset();

				// show all other edit button
				for (let j = 0; j < editButton.length; j++) {
					editButton[j].style.display = "inline-block";
					editButton[i].parentNode.parentNode.style.backgroundColor = "#fff";
				}
			} else {
				userLeft.style.display = "block";
				userRight.className = "col-10";

				// Hide all other edit button
				for (let j = 0; j < editButton.length; j++) {
					if (i !== j) {
						editButton[j].style.display = "none";
					}
				}
				// Highlight editing
				editButton[i].parentNode.parentNode.style.backgroundColor = "rgba(0, 200, 81, .5)";

				// Get value from input
				userId.value = editButton[i].parentNode.parentNode.cells[0].textContent;
				userName.value = editButton[i].parentNode.parentNode.cells[3].textContent;
				userEmail.value = editButton[i].parentNode.parentNode.cells[2].textContent;
				userAddress.value = editButton[i].parentNode.parentNode.cells[4].textContent;
				userInterest.value = editButton[i].parentNode.parentNode.cells[6].textContent;
				userFormName.innerText = `${editButton[i].parentNode.parentNode.cells[3].textContent}'s Profile`;

				// Check for ambassador current image
				let firebaseData = firebase.database().ref("/data");
				firebaseData.once('value', function (data) {
					let dataValue = data.val();
					if (dataValue[userId.value].profile) {
						// IF user has image replace input by delete button
						deleteImageButton[0].style.display = "inline-block";
						userImage.style.display = "none";
						deleteImageButton[0].addEventListener("click", () => deleteImage(userId.value));

					} else {
						userImage.style.display = "inline-block";
						deleteImageButton[0].style.display = "none";
					}

				});
			}
		});
	}
}
function deleteImage(id) {
	// Find user id then delete image
	let imageRef = firebase.database().ref().child(`/data/${id}/profile`);
	imageRef.remove();
	userImage.style.display = "inline-block";
	deleteImageButton[0].style.display = "none";
}
// User submit profile
// Uploading new post to database 
let userProfileImage = null;
userImage.addEventListener("change", e => {
	userProfileImage = e.target.files[0];
});
function addEventSubmitEditUser() {
	userForm.addEventListener("submit", (e) => {
		e.preventDefault();
		let email = getValue("user__email");
		let name = getValue("user__name");
		let id = getValue("user__id");
		let address = getValue("user__address");
		let interest = getValue("user__interest");

		// Animation start
		userFormBackground.style.zIndex = 1000;
		userFormBackground.style.opacity = 1;
		spinner[2].style.opacity = 1;
		// Animation end

		// Check if have image
		if (userProfileImage) {
			let filename = email + generateId() + userProfileImage.name;
			// Store image in firebase storage
			let storageRef = firebase.storage().ref("/profile/" + filename),
				uploadTask = storageRef.put(userProfileImage);
			// Goolge stuff
			uploadTask.on('state_changed', function (snapshot) {
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload user image is ' + progress + '% done');
				switch (snapshot.state) {
					case firebase.storage.TaskState.PAUSED:
						console.log('Upload user image is paused');
						break;
					case firebase.storage.TaskState.RUNNING:
						console.log('Upload user image is running');
						break;
				}
			}, function (error) {
				// Animation start
				setTimeout(() => {
					spinner[2].style.opacity = 0;
					messageFail[2].opacity = 1;
				}, 500);
				setTimeout(() => {
					userFormBackground.style.zIndex = -1;
					userFormBackground.style.opacity = 0;
					messageFail[2].style.opacity = 0;
				}, 1000);
				// Animation end

				userProfileImage = null;

			}, function () {
				// Store post name and content and img url in data
				let imageURL = uploadTask.snapshot.downloadURL,
					image = imageURL,
					data = { email, name, image, address, interest };

				// // save data to firebase
				saveUserData(id, data);

			});
		} else {
			// If user dont input image
			let = data = { email, name, address, interest };
			// // save data to firebase
			saveUserData(id, data);
		}

	});
}

function saveUserData(id, sentData) {
	firebase.database().ref(`data/${id}`).update({
		email: sentData.email,
		name: sentData.name,
		address: sentData.address,
		interest: sentData.interest
	});
	if (sentData.image) {
		firebase.database().ref(`data/${id}`).update({ profile: sentData.image });
	}
	// Animation start
	setTimeout(() => {
		spinner[2].style.opacity = 0;
		messageSuccess[2].style.opacity = 1;
	}, 700);
	setTimeout(() => {
		userFormBackground.style.zIndex = -1;
		userFormBackground.style.opacity = 0;
		messageSuccess[2].style.opacity = 0;
	}, 1000);
	// Animation end
	setTimeout(() => {
		userLeft.style.display = "none"
		userRight.className = "col-12";
	}, 1300);
	userForm.reset();
	userProfileImage = null;
}
// Toggle ambassador
function addEventToggleAmbassador() {
	let activePostButtonAmbassador = document.getElementsByClassName("activePostButtonAmbassador"),
		hiddenPostButtonAmbassdor = document.getElementsByClassName("hiddenPostButtonAmbassdor");
	for (let i = 0; i < activePostButtonAmbassador.length; i++) {
		activePostButtonAmbassador[i].addEventListener("click", e => {
			let authorId = activePostButtonAmbassador[i].parentNode.parentNode.cells[0].textContent;
			togglePost = firebase.database().ref().child(`/data/${authorId}`);
			togglePost.update({
				ambassador: false
			});
		})
	}
	for (let i = 0; i < hiddenPostButtonAmbassdor.length; i++) {
		hiddenPostButtonAmbassdor[i].addEventListener("click", e => {
			let authorId = hiddenPostButtonAmbassdor[i].parentNode.parentNode.cells[0].textContent;
			togglePost = firebase.database().ref().child(`/data/${authorId}`);
			togglePost.update({
				ambassador: true
			});
		})
	}

}
// Delete  user
function addEventDeleteUser() {
	let deleteButton = document.getElementsByClassName("deleteUser");
	for (let i = 0; i < deleteButton.length; i++) {
		deleteButton[i].addEventListener("click", (e) => {
			let authorId = deleteButton[i].parentNode.parentNode.cells[0].textContent;
			// authorId = authorId.replace(/\s+/g, '');
			let firebaseData = firebase.database().ref().child(`/data/${authorId}/post`);
			firebaseData.once('value', function (data) {
				let dataValue = data.val();
				if (dataValue) {
					Object.keys(dataValue).forEach(postId => {
						let deletePostRef = firebase.database().ref().child(`/data/${authorId}/post/${postId}`);

						// Delete in data/id/post
						let deletePost = firebase.database().ref().child(`post/${postId}`);

						// Update postStatus
						deletePostRef.remove();
						deletePost.remove();

						// Delete user
						let userRef = firebase.database().ref().child(`/data/${authorId}`);
						userRef.remove();
					});
				} else {
					let userRef = firebase.database().ref().child(`/data/${authorId}`);
					userRef.remove();
				}
			});
		});
	}
}
