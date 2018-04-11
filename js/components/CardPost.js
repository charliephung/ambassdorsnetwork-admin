const CardPost = (root) => {
	let thumbnail = ``,
		thumbnailItem = ``;
	let info = [];
	let firebaseData = firebase.database().ref();
	firebaseData.once('value', function (data) {
		let dataValue = data.val();
		if (dataValue["data"]) {
			let arrData = dataValue.data;
			Object.keys(arrData).forEach((id, index) => {
				if (arrData[id].post) {
					// console.log(arrData[id]);
					Object.keys(arrData[id].post).map(ele => {
						info.push({
							email: arrData[id].email,
							name: arrData[id].name,
							post: ele,
							heading: arrData[id].post[ele].heading,
							image: arrData[id].post[ele].image ? arrData[id].post[ele].image : "",
							date: `${arrData[id].post[ele].date.day} ${arrData[id].post[ele].date.time}`
						});
					});
				}
			});

			thumbnailItem = info.map(ele => {
				return `
							<button href=${ ele.post} class="btn-block post__thumnail"> 
								<div  class="row" >
									<div  class="col-5">
										<div class="post__thumnail__left">
											<div>${ele.email}</div>
											<div>${ele.name}</div>
											<div>${ele.date}</div>
										</div>
									</div>
									<div class="col-7">
										<div class="post__thumnail__right">
											<strong><p>${ele.heading}</p></strong>
											<img  class="post__image" src="${ ele.image}" >
										</div>	
									</div>
								</div>
							</button>
							<hr>
							`;
			})
			// Replcae the comma when convert arr to string
			var rx = new RegExp("<hr[\\d\\D]*?<button href=", "g");

			thumbnailItem = String(thumbnailItem).replace(rx, "<hr><button href=");
			// Card
			thumbnail += `${thumbnailItem} `;
			root.innerHTML = thumbnail
			onPopup();
		} else {
			thumbnail += `
							<div class="post__thumnail"> 
								<div  class="row" >
									<div class="col-5">
									<span style="color: lightgray">Empty</span>
									</div>
								</div>
							</div>`;
			root.innerHTML = thumbnail
		}
	}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
	});
}
const ImageGallery = root => {
	// imageGallery
	let firebaseData = firebase.database().ref("image-gallery");
	firebaseData.once('value', function (data) {
		if (data.val()) {
			images = data.val();
			let card = ``;
			Object.keys(images).forEach(ele => {
				card += `
			<div class="row image-gallery__card" > <div class="col-2">
				<div>
					<img src=${images[ele].url}  alt=${images[ele].name}/>
				</div> </div>
				<div  class="col-10">
					<p class="image-gallery__url"></p>
						<button type="button" class="imageGalleryDelete btn btn-sm btn-danger">Delete</button>
					<p class="hidden">${ele}</p>
				</div>
			</div>
			`
			});
			imageGallery.innerHTML = card;
			imageGalleryUrl = document.getElementsByClassName("image-gallery__url");
			Object.keys(images).forEach((ele, index) => {
				imageGalleryUrl[index].innerText = `<img src=${images[ele].url}>`;
			})
			card = ``;
			onImageGalleryDeletelet();
		} else {
			imageGallery.innerHTML = ``;
		}
	})
}
