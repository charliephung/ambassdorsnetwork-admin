let filterDateVal = 0,
	filterNewsAndEventsVal = 0,
	filterBlogsVal = 0,
	filterAuthorVal = "",
	filterPostVal = "";

const TablePost = (root) => {
	// Table Head
	let table = ``;
	let = tableHead = `<thead class="thead-dark"> <tr>
								<th scope="col">#</th>
								<th scope="col">Date</th>
								<th scope="col">Author</th>
								<th scope="col">Heading</th>
								<th scope="col-6">Image</th>
								<th scope="col">News and events</th>
								<th scope="col">Blogs</th>
								<th scope="col">Edit</th>
							</tr> </thead>
							<tr>
								<td></td>
								<td>
									 <select class="form-control" name="" id="filter__date">
										<option value="0" ${ filterDateVal === 0 ? "selected" : ""}>Default</option>
										<option value="1" ${ filterDateVal === 1 ? "selected" : ""}>Newest</option>
										<option value="2" ${ filterDateVal === 2 ? "selected" : ""}>Oldest</option>
									</select>
								</td>
								<td>
									<input type="text" id="filter__author" class="form-control" value="${ filterAuthorVal}" placeholder="Author search...">
								</td>
								<td>
									<input type="text" id="filter__heading" class="form-control" value="${ filterPostVal}" placeholder="Post search...">
								</td>
								<td></td>
								<td class="selectOptionsTd">
									 <select class="form-control" name="" id="filter__newsAndEvents">
										<option value="0" ${ filterNewsAndEventsVal === 0 ? "selected" : ""}>All</option>
										<option value="1" ${ filterNewsAndEventsVal === 1 ? "selected" : ""}>Active</option>
										<option value="2" ${ filterNewsAndEventsVal === 2 ? "selected" : ""}>Hidden</option>
									</select>
								</td>
								<td class="selectOptionsTd">
									 <select class="form-control" name="" id="filter__blogs">
										<option value="0"${ filterBlogsVal === 0 ? "selected" : ""}>All</option>
										<option value="1"${ filterBlogsVal === 1 ? "selected" : ""}>Active</option>
										<option value="2"${ filterBlogsVal === 2 ? "selected" : ""}>Hidden</option>
									</select>
								</td>
								<td class="selectOptionsTd"></td>
							</tr>
							`;

	let tableTd = [];
	let tableRow = ``;
	let firebaseData = firebase.database().ref();
	firebaseData.once('value', function (data) {
		let dataValue = data.val();
		let tableRow = ``;
		if (dataValue["data"]) {
			let arrData = dataValue.data;
			Object.keys(arrData).forEach((id, index) => {
				// Get
				if (arrData[id].post) {
					Object.keys(arrData[id].post).map(ele => {
						
						tableTd.push({
							postId: id,
							id: ele,
							date: arrData[id].post[ele].date.day ? arrData[id].post[ele].date.day : " " + arrData[id].post[ele].date.time ? arrData[id].post[ele].date.time : "",
							authorEmail: arrData[id].email,
							authorName: arrData[id].name,
							author: `${arrData[id].email} ${arrData[id].name}`,
							heading: arrData[id].post[ele].heading,
							image: arrData[id].post[ele].image ? arrData[id].post[ele].image : "",
							newsAndEvents: arrData[id].post[ele].status.newsAndEvents,
							blogs: arrData[id].post[ele].status.blogs
						})
					});
					
					// filter
					if (filterNewsAndEventsVal === 1)
						tableTd = tableTd.filter(e => { return e.newsAndEvents === true; });
					if (filterNewsAndEventsVal === 2)
						tableTd = tableTd.filter(e => { return e.newsAndEvents === false; });
					if (filterBlogsVal === 1)
						tableTd = tableTd.filter(e => { return e.blogs === true; });
					if (filterBlogsVal === 2)
						tableTd = tableTd.filter(e => { return e.blogs === false; });


					if (filterDateVal === 1) {
						tableTd = tableTd.sort((a, b) => {
							if (a.date > b.date) { return -1; }
							if (a.date < b.date) { return 1; }
							else return 0;
						});
					}

					if (filterDateVal === 2) {
						tableTd = tableTd.sort((a, b) => {
							if (a.date > b.date) { return 1; }
							if (a.date < b.date) { return -1; }
							else return 0;
						});
					}
					if (filterAuthorVal) {
						tableTd = tableTd.filter(ele => {
							return ele.author.toLowerCase().indexOf(filterAuthorVal.toLocaleLowerCase()) !== -1;
						});
					}
					if (filterPostVal) {
						tableTd = tableTd.filter(ele => {
							return ele.heading.toLowerCase().indexOf(filterPostVal.toLocaleLowerCase()) !== -1;
						});
					}



					// Get row content
					tableRow = tableTd.map(ele => {
						return ` 
										<tr>
											<th scope="row" >${ index + 1}</th>
											<td class="authorKey hidden" >${ ele.postId}</td>
											<td class="postKey hidden" >${ ele.id}</td>
											<td class="imageUrl hidden" >${ ele.image}</td>
											<td><p>${ele.date}</p></td>
											<td>
												<p>${ele.authorEmail}</p>
												<p>${ele.authorName}</p>
											</td>
											<td><p>${ele.heading}</p></td>
											<td><img class="table-image" src=${ele.image}></td>
											<td >${ ele.newsAndEvents
								? `<button type=\"button\" class=\"activePostButtonNewsAndEvents btn btn-sm btn-success\">active</button> 
												<button type=\"button\" class=\"hiddenPostButtonNewsAndEvents btn btn-sm btn-warning hidden\">hidden</button>`
								: `<button type=\"button\" class=\"hiddenPostButtonNewsAndEvents btn btn-sm btn-warning\">hidden</button> 
												<button type=\"button\" class=\"activePostButtonNewsAndEvents btn btn-sm btn-success hidden\">hidden</button>`}
											</td>
											<td>${ ele.blogs
								? `<button type=\"button\" class=\"activePostButtonBlogs btn btn-sm btn-success\">active</button> 
												<button type=\"button\" class=\"hiddenPostButtonBlogs btn btn-sm btn-warning hidden\">hidden</button>`
								: `<button type=\"button\" class=\"hiddenPostButtonBlogs btn btn-sm btn-warning\">hidden</button> 
												<button type=\"button\" class=\"activePostButtonBlogs btn btn-sm btn-success hidden\">hidden</button>`}
											</td>
											<td>
												<button type=\"button\" class=\"deletePostButton btn btn-sm btn-danger\">delete</button> 
											</td>
										</tr>
										`;
					})
					// Replcae the comma when convert arr to string
					var rx = new RegExp("<\/tr[\\d\\D]*?tr>", "g");
					tableRow = String(tableRow).replace(rx, "</tr><tr>");
					table = `${tableRow}`;
				}
			});
			table = `<table class="table table-hover"> ${tableHead} <tbody>` + table + `</tbody> </table>`;
			root.innerHTML = table;

			// Add talbe function 
			addEvent();
			addEventFilter();
		} else {
			table = `<table class="table"> ${tableHead} <tbody>` + table + `</tbody> </table>`;
			root.innerHTML = table;
		}
	}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
	});
}