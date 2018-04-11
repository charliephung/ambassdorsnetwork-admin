function addEventFilter() {
	let filterDate = document.getElementById("filter__date"),
		filterAuthor = document.getElementById("filter__author"),
		filterPost = document.getElementById("filter__heading"),
		filterNewsAndEvents = document.getElementById("filter__newsAndEvents"),
		filterBlogs = document.getElementById("filter__blogs");

	addFilterValue(filterDate, "filterDate");
	addFilterValue(filterNewsAndEvents, "filterNewsAndEvents");
	addFilterValue(filterBlogs, "filterBlogs");
	addFilterValue(filterAuthor, "filterAuthor");
	addFilterValue(filterPost, "filterPost");

}
// Change filer mode
function addFilterValue(input, val) {
	input.addEventListener("change", (e) => {
		if (val === "filterNewsAndEvents") filterNewsAndEventsVal = Number(e.target.value), filterBlogsVal = 0;
		if (val === "filterBlogs") filterBlogsVal = Number(e.target.value), filterNewsAndEventsVal = 0;
		if (val === "filterDate") filterDateVal = Number(e.target.value);
		if (val === "filterAuthor") filterAuthorVal = e.target.value;
		if (val === "filterPost") filterPostVal = e.target.value;

		TablePost(postManage);
	});
}

function addEvent() {
	let activePostButtonNewsAndEvents = document.getElementsByClassName("activePostButtonNewsAndEvents"),
		hiddenPostButtonNewsAndEvents  = document.getElementsByClassName("hiddenPostButtonNewsAndEvents "),
		activePostButtonBlogs = document.getElementsByClassName("activePostButtonBlogs"),
		hiddenPostButtonBlogs = document.getElementsByClassName("hiddenPostButtonBlogs"),
		deletePostButton = document.getElementsByClassName("deletePostButton");

	toggleStatus(activePostButtonNewsAndEvents, "newsAndEvents", false);
	toggleStatus(hiddenPostButtonNewsAndEvents, "newsAndEvents", true);
	toggleStatus(activePostButtonBlogs, "blogs", false);
	toggleStatus(hiddenPostButtonBlogs, "blogs", true);

	for (let i = 0; i < deletePostButton.length; i++) {
		deletePostButton[i].addEventListener("click", () => {
			let authorId = deletePostButton[i].parentNode.parentNode.cells[1].textContent,
				postId = deletePostButton[i].parentNode.parentNode.cells[2].textContent,
				imageUrl = deletePostButton[i].parentNode.parentNode.cells[3].textContent;
			
			let deletePostRef = firebase.database().ref().child(`/data/${authorId}/post/${postId}`),
				deletePost = firebase.database().ref().child(`/post/${postId}`);
			// Update postStatus
			deletePostRef.remove();
			deletePost.remove();
		});
	}


}
//button event 
function toggleStatus(button, key, value) {
	for (let i = 0; i < button.length; i++) {
		button[i].addEventListener("click", () => {
			let authorId = button[i].parentNode.parentNode.cells[1].textContent,
				postId = button[i].parentNode.parentNode.cells[2].textContent;
			togglePost = firebase.database().ref().child(`/data/${authorId}/post/${postId}/status`);
			// Update postStatus on newsAndEvents
			togglePost.update({
				[key]: value
			});
		});
	}
}

