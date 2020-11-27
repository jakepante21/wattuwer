import React, {Fragment, useState, useEffect, useRef} from "react";

const Transactions = ({transactions}) => {

	const [transaction,setTransaction] = useState();
	const modalRef = useRef();

	const changeTransacHandle = (transac) => {
		setTransaction(transac);	
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

	return(
		<Fragment>
			<div className="transaction-header">
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
						<div>
							<button onClick={closeModalHandle}>close</button>
						</div>
					</div>
				</Fragment>
						:
					""
				}
				</div>
			</div>
		</Fragment>
	)
}

export default Transactions;