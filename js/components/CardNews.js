let newsHeader = document.getElementById("news__header"),
	newsBody = document.getElementById("news__body"),
	newsFooter = document.getElementById("news__footer"),
	newsPreviewHeader = document.getElementById("news__preview__header"),
	newsPreviewBody = document.getElementById("news__preview__body"),
	newsPreviewFooter = document.getElementById("news__preview__footer");

const CardNews = () => {
	// Preview news 
	let firebasePost = firebase.database().ref();
	firebasePost.once('value', function (data) {
		let dataValue = data.val();
		if (dataValue["news"]) {
			newsHeader.innerHTML = dataValue["news"].newsHeader;
			newsPreviewHeader.innerHTML = dataValue["news"].newsHeader;
			newsBody.innerHTML = dataValue["news"].newsBody;
			newsPreviewBody.innerHTML = dataValue["news"].newsBody;
			newsFooter.innerHTML = dataValue["news"].newsFooter;
			newsPreviewFooter.innerHTML = dataValue["news"].newsFooter;
		}
	});
	newsHeader.addEventListener("input", (e) => {
		newsPreviewHeader.innerHTML = e.target.value;
	});
	newsBody.addEventListener("input", (e) => {
		newsPreviewBody.innerHTML = e.target.value;
	});
	newsFooter.addEventListener("input", (e) => {
		newsPreviewFooter.innerHTML = e.target.value;
	});
}

