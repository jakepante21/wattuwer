import React, {Fragment, useState, useEffect, useRef} from "react";

const UserDetails = () => {

	let jsonUser = localStorage.getItem("user");
	let parseUser = JSON.parse(jsonUser);

	return(
		<Fragment>
			<div className="details-header">
				<h1>user details.</h1>
			</div>
			<div className="details-container">
				<div>
					<span>Name: </span><span>{parseUser.firstname + " " + parseUser.lastname}</span>
				</div>
				<div>
					<span>Address: </span><span>{parseUser.address}</span>
				</div>
				<div>
					<span>Contact Number: </span><span></span>
				</div>
			</div>
		</Fragment>
	)
}

export default UserDetails;