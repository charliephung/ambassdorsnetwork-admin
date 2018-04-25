showUploadPosts();
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		let firebaseDatas = firebase.database().ref();
		firebaseDatas.on('value', function (data) {
			let dataValue = data.val();
			console.log("reloaded");
			
			setTimeout(() => {
				CardPost(postUploaded);
				TableUsers(userTBody);
				TablePost(postManage);
				ImageGallery(imageGallery);
			}, 200);
		});
	}
});

