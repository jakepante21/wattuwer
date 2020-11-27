import React, {Fragment, useState, useEffect, useRef} from "react";
import Transactions from "./subBody/Transactions";
import UserDetails from "./subBody/UserDetails";

const UserProfile = ({transactions}) =>{

	const transactionRef = useRef();
	const userRef = useRef();

	const selectTransacHandle = () =>{
		userRef.current.classList.add("offDetails");
		transactionRef.current.classList.remove("offTransac");
		transactionRef.current.classList.add("onTransac");

		userRef.current.addEventListener("transitionend",function(){

		},{once : true})
	}

	const selectDetailsHandle = () =>{
		transactionRef.current.classList.add("offTransac");
		userRef.current.classList.remove("offDetails");
		userRef.current.classList.add("onDetails");

		transactionRef.current.addEventListener("transitionend",function(){
			// transactionRef.current.style.position = "absolute";
		},{once : true})
	}

	return(
		<Fragment>
			<section id="custom-section">
				<div className="header-title">
					<h1>Profile.</h1>
				</div>
				<div className="profile-selector">
					<div className="transac" onClick={() => {selectTransacHandle()}}>
						<h2>Transactions</h2>	
					</div>
					<div className="info" onClick={() => {selectDetailsHandle()}}>
						<h2>User Info</h2>	
					</div>
				</div>
				<div className="profile-selected">
					<div ref={transactionRef} className="transactions">
						<Transactions transactions={transactions} />
					</div>
					<div ref={userRef} className="details">
						<UserDetails />
					</div>
				</div>
			</section>
		</Fragment>
	)
}

export default UserProfile;