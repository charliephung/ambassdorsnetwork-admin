// Chose mode
const showUploadPosts = () => {
	postForm.style.display = "block";
	postUploaded.style.display = "block";
	imageGallery.style.display = "inline-block";
	imageGalleryForm.style.display = "flex";
	postManage.style.display = "none";
	news.style.display = "none";
	users.style.display = "none";
}
const showManagePosts = () => {
	postForm.style.display = "none";
	postUploaded.style.display = "none";
	imageGallery.style.display = "none";
	imageGalleryForm.style.display = "none";
	postManage.style.display = "block";
	news.style.display = "none";
	users.style.display = "none";
}
const showManageNews = () => {
	postForm.style.display = "none";
	postUploaded.style.display = "none";
	imageGallery.style.display = "none";
	imageGalleryForm.style.display = "none";
	postManage.style.display = "none";
	news.style.display = "block";
	users.style.display = "none";
}
const showManageUsers = () => {
	postForm.style.display = "none";
	postUploaded.style.display = "none";
	imageGallery.style.display = "none";
	imageGalleryForm.style.display = "none";
	postManage.style.display = "none";
	news.style.display = "none";
	users.style.display = "block";
}


let mode = document.querySelectorAll(".list-group button");
for (let i = 0; i < mode.length; i++) {
	mode[i].addEventListener("click", () => {
		for (let j = 0; j < mode.length; j++) {
			mode[j].classList.remove("active");
		}
		mode[i].classList.add("active");
		if (mode[i].value === "upload") { showUploadPosts(); }
		if (mode[i].value === "post") { showManagePosts(); }
		if (mode[i].value === "news") { showManageNews(); }
		if (mode[i].value === "users") { showManageUsers(); }
	});
}

