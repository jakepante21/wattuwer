import React, {Fragment, useRef, useEffect} from "react";
import {Link} from "react-router-dom";

const NavBar = () =>{

	const body = document.querySelector("body");
	const linksRef = useRef();
	const burgerRef = useRef();
	let jsonUser = localStorage.getItem("user");
    let user = JSON.parse(jsonUser);

	const burgerHandle = () =>{
		let links = document.querySelector(".links");
		let burger = document.querySelector(".burger");

		links.classList.toggle("burger-on");
		burger.classList.toggle("toggle");
	}

	useEffect(() => {
		body.addEventListener("click",(e)=>{
			if(e.target.id !== "nav"){
				linksRef.current.classList.remove("burger-on");
				burgerRef.current.classList.remove("toggle");
			}
		})
	},[])

	return(
		<Fragment>
			<nav id="nav">
				<div id="nav" className="logo">
					<Link to="/" id="nav" className="link">wattuwer.</Link>
				</div>
				<ul ref={linksRef} id="nav" className="links">
					<li id="nav">
						<Link to="/" id="nav" className="link">Home</Link>
					</li>
					<li id="nav">
						<a href="/#shop" id="nav" className="link">Shop</a>
					</li>
					<li id="nav">
						<a href="#about" id="nav" className="link">About Us</a>
					</li>
					<li id="nav">
						<Link to="/contact" id="nav" className="link">Contact Us</Link>
					</li>
					{
						user ? 
							user.role === "Admin" ?
							<Fragment>
								<li id="nav">
									<Link to="/transactions" id="nav" className="link">Transactions</Link>
								</li>
								<li id="nav">
									<Link to="/admin-panel" id="nav" className="link">Admin Panel</Link>
								</li>
								<li id="nav">
									<Link to="/admin-messages" id="nav" className="link">Customer Concerns</Link>
								</li>
							</Fragment>
							:
							""
						:
						""
					}
					{
						user ? 
						<li id="nav">
							<Link to="/user" id="nav" className="link">{user.firstname}</Link>
						</li>
						:
						<li id="nav">
							<Link to="/login" id="nav" className="link">Login</Link>
						</li>
					}
					{
						!user ? 
						<li id="nav">
							<Link to="/register" id="nav" className="link">Register</Link>
						</li>
						:
						<li id="nav">
							<Link to="/" id="nav" className="link" onClick={() => {
								localStorage.clear();
								window.location.href = "/";
							}}>Logout</Link>
						</li>
					}
				</ul>
				<div id="nav" ref={burgerRef} className="burger" onClick={burgerHandle}>
					<div id="nav" className="line1"></div>
					<div id="nav" className="line2"></div>
					<div id="nav" className="line3"></div>
				</div>
			</nav>
		</Fragment>
	)
}

export default NavBar;