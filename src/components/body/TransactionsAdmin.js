import React, {Fragment, useState, useEffect, useRef} from "react";

const TransactionsAdmin = ({transactions}) => {

	const [transaction,setTransaction] = useState();
	const [status,setStatus] = useState();
	const modalRef = useRef();
	let user = JSON.parse(localStorage.getItem("user"));

	const changeTransacHandle = (transac) => {
		setTransaction(transac);
		setStatus(transac.status);
	}

	const openModalHandle = () => {
		modalRef.current.classList.add("modal-on");
	}

	const closeModalHandle = () => {
		modalRef.current.classList.remove("modal-on");
	}

	const closeModalHandle2 = (e) => {
		if(e.target.id === "out"){
			modalRef.current.classList.remove("modal-on");
		}else{

		}
	}

	const updateTransactionHandle = (e) => {
		if(user){
			if(user.role === "Admin"){
				if(transaction){
					fetch("http://localhost:3001/transactions/" + transaction._id,{
						method : "PUT",
						body : JSON.stringify({status : e.target.id}),
						headers : {
							"Content-Type" : "application/json",
							"Authorization" : localStorage.getItem("token")
						}
					})
					.then(data => data.json())
					.then(result => {
						console.log(result);
						setStatus(result.status);

						if(result.status === "Completed"){
							result.products.forEach(product => {
								product.items.forEach(item => {
									fetch("http://localhost:3001/sold-stocks/create",{
										method : "POST",
										body : JSON.stringify({
											_id : item._id,
											productId : product.productId,
											codeNumber : item.codeNumber
										}),
										headers : {
											"Content-Type" : "application/json",
											"Authorization" : localStorage.getItem("token")
										}
									})
									.then(data => data.json())
									.then(stockDetails => {
										console.log(stockDetails._id)
										fetch("http://localhost:3001/order-stocks/admin-only/api/wattuwer/stock/" + stockDetails._id, {
											method : "DELETE",
											headers : {
												"Authorization" : localStorage.getItem("token")
											}
										})
										.then(data => data.json())
										.then(result => {
											console.log(result);
										})
									})
								})
							})

							// window.location.href = "/transactions";
						}else{
							// window.location.href = "/transactions";
						}
					})
				}
			}
		}
		// transaction.products.forEach(t => {
		// 	t.items.forEach(a => {
		// 		console.log(a)
		// 	})
		// })
	}

	return(
		<Fragment>
			<section id="custom-section">
				<div className="header-title transac-header">
					<h1>transactions.</h1>
				</div>
				<div className="transaction-list-container">
					{
						transactions.map(transac => {
							return(
								<div key={transac._id} onClick={() => {changeTransacHandle(transac); openModalHandle(); }}>
									<span>{transac.transactionCode} </span>
									<small>(click to see more details)</small>
								</div>
							)
						})
					}
				</div>
				<div ref={modalRef} id="out" className="modal-container" onClick={closeModalHandle2}>
					<div id="in" className="modal-popup">
					{
					transaction ?
					<Fragment>
						<div className="modal-header-container">
							<span>Transaction No.: {transaction.transactionCode}</span>
						</div>
						<div className="modal-body-container">
							<table className="transac-info">
								<tbody>
									<tr>
										<td><span>Customer Name: </span></td>
										<td><span>{transaction.userId}</span></td>
									</tr>
									<tr>
										<td><span>Status: </span></td>
										<td><span>{transaction.status}</span></td>
									</tr>
									<tr>
										<td><span>Payment Mode: </span></td>
										<td><span>{transaction.paymentMode}</span></td>
									</tr>
								</tbody>
							</table>
							<table className="transac-items">
								<thead>
									<tr>
										<td>Item</td>
										<td>Quantity</td>
										<td>Price</td>
									</tr>
								</thead>
								<tbody>
									{
										transaction.products.map(item => {
											return(
												<tr key={item._id}>
													<td>{item.name}</td>
													<td>{item.quantity}</td>
													<td>{item.subtotal}</td>
												</tr>
											)
										})
									}
								</tbody>
							</table>
						</div>
						<div className="modal-footer-container">
							{
								status === "Pending" ?
								<Fragment>
									<div className="accept-button">
										<button id="Accepted" onClick={updateTransactionHandle}>accept</button>
									</div>
									<div className="reject-button">
										<button id="Rejected" onClick={updateTransactionHandle}>reject</button>
									</div>
								</Fragment>
								:
									status === "Completed" ?
									""
									:
									<Fragment>
										<div className="complete-button">
											<button id="Completed" onClick={updateTransactionHandle}>complete</button>
										</div>
										<div className="refund-button">
											<button id="Refunded" onClick={updateTransactionHandle}>refund</button>
										</div>
									</Fragment>
							}
							<div className="close-button">
								<button onClick={closeModalHandle}>close</button>
							</div>
						</div>
					</Fragment>
							:
						""
					}
					</div>
				</div>
			</section>
		</Fragment>
	)
}

export default TransactionsAdmin;