const TableUsers = (root) => {
	// Table Components
	let tableTd = ``;
	tableRow = ``;

	let firebaseData = firebase.database().ref();
	firebaseData.once('value', function (data) {
		let dataValue = data.val();
		if (dataValue["data"]) {
			let arrData = dataValue.data;
			var tableTd = Object.keys(arrData).map(id => {
				if (arrData[id].post) {
					let size = Object.keys(arrData[id].post);
					return { id: id, 
					address: arrData[id].address, 
					profile: arrData[id].profile, 
					email: arrData[id].email, 
					ambassador: arrData[id].ambassador, 
					name: arrData[id].name, 
					interest: arrData[id].interest, 
					post: size.length };
				} else { return { id: id, address: arrData[id].address, profile: arrData[id].profile, email: arrData[id].email, ambassador: arrData[id].ambassador, name: arrData[id].name, post: 0 }; }
			});

			let tableRow = tableTd.map(td => {
				return `<tr>
										<td scope="row" class="hidden"><p>${ td.id}</p></td>
										<td>${ td.profile ? `<img class="post__image" src=${td.profile}>` : `<i class="fa fa-camera" aria-hidden="true"></i>`}</td>
										<td><p>${ td.email}</p></td>
										<td><p>${ td.name}</p></td>
										<td class="hidden"><p>${ td.address ? td.address : ""}</p></td>
										<td><p>${ td.post}</p></td>
										<td class="hidden"><p>${ td.interest ? td.interest : ""}</p></td>
										<td>${ td.ambassador
												? `<button type=\"button\" class=\"activePostButtonAmbassador btn btn-sm btn-success\">active</button> 
												<button type=\"button\" class=\"hiddenPostButtonAmbassdor btn btn-sm btn-warning hidden\">hidden</button>`
												: `<button type=\"button\" class=\"hiddenPostButtonAmbassdor btn btn-sm btn-warning\">hidden</button> 
												<button type=\"button\" class=\"activePostButtonAmbassador btn btn-sm btn-success hidden\">hidden</button>`}
										</td>
										<td>
											<button type="button" class="editUser btn btn-sm btn-warning">Edit</button>
											<button type="button" class="deleteUser btn btn-sm btn-danger">Delete</button>
										</td>
									</tr>`;
			});
			var rx = new RegExp("<\/tr[\\d\\D]*?tr>", "g");
			tableRow = String(tableRow).replace(rx, "</tr><tr>");
			root.innerHTML = tableRow;

			// Add table function
			addEventDeleteUser();
			addEventToggleAmbassador();
			addEventEditUser();
		} else {
			root.innerHTML = ``;
		}
	}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
	});
}