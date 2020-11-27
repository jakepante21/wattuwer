import React, {Fragment, useState, useEffect, useRef} from "react";

const Messages = ({messages}) =>{

	const [message,setMessage] = useState();
	const modalRef = useRef();

	// MODAL

	const openModalHandle = () =>{
		modalRef.current.classList.add("modal-on");
	}

	const closeModalHandle = () =>{
		modalRef.current.classList.remove("modal-on");
	}

	const closeModalHandle2 = (e) =>{
		if(e.target.id){
			if(e.target.id === "out"){
				modalRef.current.classList.remove("modal-on");
			}
		}
	}

	const messageHandle = (m) =>{
		setMessage(m);
	} 

	useEffect(() => {
		setMessage(messages[0])
	},[messages])

	return(
		<Fragment>
			<section id="custom-section">
				<div className="messages-header">
					<h1>Customer Messages</h1>
				</div>
				<div className="messages-container">
					{
						messages.map(message => {
							return(
								<div key={message._id} className="message-modal-button" onClick={() => {messageHandle(message)}} onClick={openModalHandle}>
									<span>{message.userName}</span>
									<small>(click for details.)</small>
								</div>
							)
						})
					}
				</div>
				<div ref={modalRef} id="out" className="modal-container" onClick={closeModalHandle2}>
					<div id="in" className="modal-popup">
						<div className="modal-header">
							<h1>customer message.</h1>
						</div>
						{
							message ?
							<div className="modal-content">
								<div className="user-name">
									<span>Name: {message.userName}</span>
								</div>
								<div className="email">
									<span>E-Mail: {message.email}</span>
								</div>
								<div className="subject">
									<span>Subject: {message.subject}</span>
								</div>
								<div className="message">
									<span>Message:</span>
									<p>{message.message}</p>
								</div>
							</div>
							:
							""
						}
						<div className="modal-footer">
							<button onClick={closeModalHandle}>close</button>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	)
}

export default Messages;