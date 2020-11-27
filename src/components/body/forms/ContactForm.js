import React, {Fragment, useState, useEffect, useRef} from "react";
import cover from "./../../../assets/images/cover.jpg";

const ContactForm = () => {

	const [contactForm,setContactForm] = useState({
		name : null,
		email : null,
		subject : null,
		message : null
	});

	const nameRef = useRef();
	const emailRef = useRef();
	const subjectRef = useRef();
	const messageRef = useRef();

	const changeHandle = (e) => {
		setContactForm({...contactForm,[e.target.name] : e.target.value});
	}

	const submitHandle = (e) =>{
		e.preventDefault();
		let completeForm = true;

		if(!contactForm.name){
			completeForm = false;
		}

		if(!contactForm.email){
			completeForm = false;
		}

		if(!contactForm.subject){
			completeForm = false;
		}

		if(!contactForm.message){
			completeForm = false;
		}

		if(completeForm){
			fetch("http://localhost:3001/messages/create",{
				method : "POST",
				body : JSON.stringify(contactForm),
				headers : {
					"Content-Type" : "application/json"
				}
			})
			.then(data => data.json())
			.then(result => {
				console.log(result);
				nameRef.current.value = "";
				emailRef.current.value = "";
				subjectRef.current.value = "";
				messageRef.current.value = "";
			})
		}else{
			console.log(false);
		}
	}

	return(
		<Fragment>
			<section id="contact-section">
				<div className="cover-container">
					<div className="cover-caption">
						<h1>Contact Us.</h1>
						<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
						<path fillRule="evenodd" d="M4.646 7.646a.5.5 0 0 1 .708 0L8 10.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/>
						<path fillRule="evenodd" d="M8 4.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5z"/>
						</svg>
					</div>
					<div className="cover-overlay"></div>
					<img src={cover} alt="clothes"/>
				</div>
				<div className="contact-form">
					<form onSubmit={submitHandle}>
						<div>
							<input ref={nameRef} type="text" name="name" placeholder="Name" onChange={changeHandle}/>
						</div>
						<div>
							<input ref={emailRef} type="email" name="email" placeholder="Email" onChange={changeHandle}/>
						</div>
						<div>
							<input ref={subjectRef} type="text" name="subject" placeholder="Subject" onChange={changeHandle}/>
						</div>
						<div>
							<textarea ref={messageRef} name="message" placeholder="your message here..." rows="10" onChange={changeHandle}></textarea>
						</div>
						<div>
							<button>submit</button>
						</div>
					</form>
				</div>
			</section>
		</Fragment>
	)
}

export default ContactForm;