let popup = document.getElementById("popup");
let popupClose = document.getElementById("popup__close");
let popupContent = document.getElementById("popup__content");

let thumb = document.getElementsByClassName("post__thumnail");
const onPopup = () => {
	for (let i = 0; i < thumb.length; i++) {
		thumb[i].addEventListener("click", e => {
			let postId = thumb[i].getAttribute("href");
			popup.style.zIndex = 1000;
			setTimeout(() => {
				popup.style.opacity = 1;
			}, 200);
			firebase.database().ref(`/post/${postId}`).once("value", snapshot => {
				let data = snapshot.val();
				popupContent.innerHTML = `
					<h1 class="heading">${data.heading}</h1>
					${data.content}
				`;
			});
		});
	}
}
popupClose.addEventListener("click", e => {
	popup.style.opacity = 0;
	setTimeout(() => {
		popup.style.zIndex = -1000;
	}, 200);
	popupContent.innerHTML = ``;
});

// Delete
const onImageGalleryDeletelet = () => {
	imageGalleryDelete = document.getElementsByClassName("imageGalleryDelete");
	for (let i = 0; i < imageGalleryDelete.length; i++) {
		imageGalleryDelete[i].addEventListener("click", e => {
			firebase.database().ref("/post").once("value", ss => {
				let imageUrl = imageGalleryDelete[i].parentNode.previousElementSibling.children[0].children[0];
				let imageRef = imageGalleryDelete[i].nextElementSibling.innerText;
				data = ss.val();
				imageUrl = imageUrl.getAttribute("src");
				if (ss.val()) {
					let usedImage = Object.keys(data).find(ele => {
						if (data[ele].image === imageUrl || data[ele].content.includes(imageUrl)) {
							alert("Image is currently in used");
							return imageUrl;
						}
					});
					if (!usedImage) {
						firebase.database().ref(`/image-gallery/${imageRef}`).remove();
						let imageStorageRef = firebase.storage().refFromURL(`${imageUrl}`);
						imageStorageRef.delete().then(e => {
							alert("Success!");
						}).catch(err => {
							console.log("Error");
						})
					}
				} else {
					firebase.database().ref(`/image-gallery/${imageRef}`).remove();
					let imageStorageRef = firebase.storage().refFromURL(`${imageUrl}`);
					imageStorageRef.delete().then(e => {
						alert("Success! 1");
					}).catch(err => {
						console.log("Error");
					});
				}
			});
		});
	}
}
