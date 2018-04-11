// Uploading news to database 
newsForm.addEventListener("submit", e => {
	e.preventDefault();
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// Get value
			let newsHeader = getValue("news__header"),
				newsBody = getValue("news__body"),
				newsFooter = getValue("news__footer");
			if (newsHeader && newsBody && newsFooter) {
				// Animation start
				newsFormBackground.style.zIndex = 1000;
				newsFormBackground.style.opacity = 1;
				spinner[1].style.opacity = 1;
				// Animation end

				// Save news to database
				let news = { newsHeader, newsBody, newsFooter };
				saveNews(news);

				// Animation start
				setTimeout(() => {
					spinner[1].style.opacity = 0;
					messageSuccess[1].style.opacity = 1;
				}, 1000);
				setTimeout(() => {
					newsFormBackground.style.zIndex = -1;
					newsFormBackground.style.opacity = 0;
					messageSuccess[1].style.opacity = 0;
				}, 1500);
				// Animation end
			}
		}
	});
});
// Ref data SenderId
let newsRef = firebase.database().ref("news");
function saveNews(news) {
	let uploadNews = firebase.database().ref().child(`/news/`)
	uploadNews.set(news);
}