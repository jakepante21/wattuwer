import React, {Fragment, useState, useEffect, useRef} from "react";

const LoginForm = () =>{

	const [user,setUser] = useState({
		email : null,
		password : null
	})	
	const emailRef = useRef();
	const passwordRef = useRef();

	const changeHandle = (e) => {
		setUser({...user,[e.target.name] : e.target.value});

		if(user.email){
			emailRef.current.classList.remove("warning");
		}
		if(user.password){
			passwordRef.current.classList.remove("warning");
		}
	}

	const submitHandle = (e) => {
		e.preventDefault();

		if(!user.email || !user.password){
			if(!user.email){
				emailRef.current.classList.add("warning");
			}

			if(!user.password){
				passwordRef.current.classList.add("warning");
			}
		}else{
			fetch("http://localhost:3001/users/login",{
				method : "POST",
				body : JSON.stringify(user),
				headers : {
					"Content-Type" : "application/json"
				}
			})
			.then(data => data.json())
			.then(user => {
				if(user.token){
					localStorage.setItem("user",JSON.stringify(user.user));
					localStorage.setItem("token","Bearer " + user.token);
					window.location.href = "/";
				}
			})
		}
	}

	return(
		<Fragment>
			<section id="register-login-container" className="register-login-container">
				<div className="header-container">
					<h1>login.</h1>
				</div>
				<div className="form-container">
					<form onSubmit={submitHandle}>
						<div>
							<input type="text" name="email" ref={emailRef} placeholder="Email" onChange={changeHandle}/>
						</div>
						<div>
							<input type="password" name="password" ref={passwordRef} placeholder="Password" onChange={changeHandle}/>
						</div>
						<div className="submit-button">
							<button>login</button>
						</div>
					</form>
				</div>
			</section>
		</Fragment>
	)
}

export default LoginForm;