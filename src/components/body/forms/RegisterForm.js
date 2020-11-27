import React, {Fragment, useState, useEffect, useRef} from "react";

const RegisterForm = () => {

	const [user,setUser] = useState({
		firstname : null,
		lastname : null,
		address : null,
		email : null,
		password : null,
		confirmPassword : null	
	})
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const addressRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmRef = useRef();

	const changeHandle = (e) =>{
		setUser({...user, [e.target.name] : e.target.value});

		if(e.target.name === "firstname"){
			firstNameRef.current.classList.remove("warning");
		}
		else if(e.target.name === "lastname"){
			lastNameRef.current.classList.remove("warning");
		}else if(e.target.name === "address"){
			addressRef.current.classList.remove("warning");
		}else if(e.target.name === "email"){
			emailRef.current.classList.remove("warning");
		}else if(e.target.name === "password"){
			passwordRef.current.classList.remove("warning");
		}else if(e.target.name === "confirmPassword"){
			confirmRef.current.classList.remove("warning");
		}else{

		}
	}

	const submitHandle = (e) =>{
		e.preventDefault();

		if(!user.firstname || !user.lastname || !user.address || !user.email || !user.password || !user.confirmPassword){
			if(!user.firstName){
				firstNameRef.current.classList.add("warning");
			}

			if(!user.lastName){
				lastNameRef.current.classList.add("warning");
			}

			if(!user.address){
				addressRef.current.classList.add("warning");
			}

			if(!user.email){
				emailRef.current.classList.add("warning");
			}

			if(!user.password){
				passwordRef.current.classList.add("warning");
			}

			if(!user.confirmPassword){
				confirmRef.current.classList.add("warning");
			}
		}else{
			fetch("http://localhost:3001/users/register", {
				method : "POST",
				body : JSON.stringify(user),
				headers : {
					"Content-Type" : "application/json"
				}
			})
			.then(data => data.json())
			.then(result => {
				console.log(result)
			})
		}
	}

	return(
		<Fragment>
			<section id="register-container" className="register-login-container">
				<div className="header-container">
					<h1>register.</h1>
				</div>
				<div className="form-container">
					<form onSubmit={submitHandle}>
						<div>
							<input type="text" name="firstname" ref={firstNameRef} placeholder="First Name" onChange={changeHandle}/>
						</div>
						<div>
							<input type="text" name="lastname"  ref={lastNameRef} placeholder="Last Name" onChange={changeHandle}/>
						</div>
						<div>
							<input type="text" name="address"  ref={addressRef} placeholder="Address" onChange={changeHandle}/>
						</div>
						<div>
							<input type="email" name="email"  ref={emailRef} placeholder="Email" onChange={changeHandle}/>
						</div>
						<div>
							<input type="password" name="password"  ref={passwordRef} placeholder="Password" onChange={changeHandle}/>
						</div>
						<div>
							<input type="password" name="confirmPassword" ref={confirmRef} placeholder="Confirm Password" onChange={changeHandle}/>
						</div>
						<div className="submit-button">
							<button>submit</button>
						</div>
					</form>
				</div>
			</section>
		</Fragment>
	)
}

export default RegisterForm;