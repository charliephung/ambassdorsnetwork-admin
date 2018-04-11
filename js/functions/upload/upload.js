// postForm 
let postForm = document.getElementById("post__form");

// news form
let newsForm = document.getElementById("news__form");

// Animation control
let postFormBackground = document.getElementById("post__form__background"),
	newsFormBackground = document.getElementById("news__form__background"),
	spinner = document.getElementsByClassName("spinner"),
	messageSuccess = document.getElementsByClassName("message__success"),
	messageFail = document.getElementsByClassName("message__fail");


// Uploading new post to database 
postForm.addEventListener("submit", e => {
	e.preventDefault();
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// Animation start
			postFormBackground.style.zIndex = 1000;
			postFormBackground.style.opacity = 1;
			spinner[0].style.opacity = 1;
			// Animation end

			// Getting value from Input
			let postHeading = getValue("post__heading"),
				postContent = getValue("post__content"),
				postAuthor = getValue("post__author"),
				postEmail = getValue("post__email"),
				postDate = getValue("post__date"),
				postTime = getValue("post__time"),
				postImage = getValue("post__image"),
				postStatus = { newsAndEvents: false, blogs: false };

			postImage = postImage.replace("<img src=", "");
			postImage = postImage.replace(/.$/, "");

			// Check if input is empty
			if (postEmail && postAuthor && postContent && postHeading && postDate && postTime) {
				let = data = { postAuthor, postImage, postHeading, postContent, postEmail, postDate, postTime, postStatus };
				saveData(data);

				// Animation start
				spinner[0].style.opacity = 0;
				messageSuccess[0].style.opacity = 1;
				setTimeout(() => {
					messageSuccess[0].style.opacity = 0;
					postFormBackground.style.zIndex = -1;
					postFormBackground.style.opacity = 0;
				}, 1000);
				// Animation end
				postForm.reset();
			}
		}
	}, function (err) {
		console.log(err);
	});
});

// Save data to firebase
function saveData(sentData) {
	// Check for user 
	// if user then update post
	// if !user create new
	// Check for image
	let fireData = firebase.database().ref();
	fireData.once('value', function (e) {
		// get snapshot in database
		let database = e.val();
		// If database exsited
		if (database) {
			if (database.data) {
				let arrData = database.data;
				let arrKey = Object.keys(arrData);
				// If have user 
				let dataId = arrKey.find(ele => { return arrData[ele].email === sentData.postEmail });
				if (dataId) {
					writePost(dataId, sentData);
				}
				// Create new user then add post
				else {
					console.log("not empty first");
					writeData(sentData);
				}
			} else {
				console.log("Empty first");
				writeData(sentData);
			}
		} else {
			console.log("writeData");
			writeData(sentData);
		}
	});
}

function writeData(sentData) {
	// Generate new data id
	let dataId = firebase.database().ref().child("/data").push().key;
	// Create new data
	firebase.database().ref(`/data/${dataId}`).set({
		email: sentData.postEmail,
		name: sentData.postAuthor,
		ambassador: false
	});

	writePost(dataId, sentData);
}
function writePost(dataId, sentData) {
	// Generate new post id
	let postId = firebase.database().ref().child("/post").push().key;
	// Create new post => add to exsited data
	firebase.database().ref(`/data/${dataId}/post/${postId}`).set({
		heading: sentData.postHeading,
		image: sentData.postImage,
		status: { newsAndEvents: false, blogs: false },
		date: { time: sentData.postTime, day: sentData.postDate }
	});
	firebase.database().ref(`/post/${postId}`).set({
		image: sentData.postImage,
		heading: sentData.postHeading,
		content: sentData.postContent,
	});
	postForm.reset();
}

// Image upload
imageGallery = document.getElementById("image-gallery__image");
let selectedImageGallery = null;
imageGallery.addEventListener("change", e => {
	selectedImageGallery = e.target.files[0];
});

let imageGalleryForm = document.getElementById("image-gallery__form");
let imageGalleryFormBackground = document.getElementById("image-gallery__form__background");
imageGalleryForm.addEventListener("submit", e => {
	e.preventDefault();
	if (selectedImageGallery) {
		imageGalleryFormBackground.style.zIndex = 100;
		let filename = selectedImageGallery.name;
		// Store image in firebase storage
		let storageRef = firebase.storage().ref("/image-gallery/" + generateId() + filename),
			uploadTask = storageRef.put(selectedImageGallery);
		// Goolge stuff
		uploadTask.on('state_changed', function (snapshot) {
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			// console.log('Upload is ' + progress + '% done');
			switch (snapshot.state) {
				case firebase.storage.TaskState.PAUSED:
					// console.log('Upload is paused');
					break;
				case firebase.storage.TaskState.RUNNING:
					// console.log('Upload is running');
					break;
			}
		}, function (error) {
			imageGalleryForm.reset();
			imageGalleryFormBackground.style.zIndex = -100;
		}, function () {
			// Store post name and content and img url in data
			let imageURL = uploadTask.snapshot.downloadURL,
				image = { name: selectedImageGallery.name, url: imageURL };
			// save data to firebase
			let imageId = firebase.database().ref(`/image-gallery/`).push().key;
			firebase.database().ref(`/image-gallery/${imageId}`).set(image);
			imageGalleryForm.reset();
			selectedImageGallery = null;
			imageGalleryFormBackground.style.zIndex = -100;
		});
	}
})
