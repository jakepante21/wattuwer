import React, {Fragment, useState, useEffect, useRef} from "react";

const CheckoutForm = ({products,stocks}) => {

	let jsonUser = localStorage.getItem("user");
    let userInfo = JSON.parse(jsonUser);
    let jsonCart = localStorage.getItem("cart");
    let cartInfo = JSON.parse(jsonCart);
    const [cart,setCart] = useState(cartInfo);
    const [prods,setProds] = useState([]);
  	const [items,setItems] = useState([]);
    const [total,setTotal] = useState();
    const [contactNum,setContactNum] = useState();
    const [payMode,setPayMode] = useState();
    const contactRef = useRef();

   	const payModeChangeHandle = (e) =>{
   		setPayMode(e.target.value);
   	}

    const contanctChangeHandle = (e) =>{
    	let num = e.target.value;
    	if(num.length === 11){
    		setContactNum(num);
    		contactRef.current.classList.remove("warning");
    	}else{
    		contactRef.current.classList.add("warning");
    	}
    }

    const formChecker = () =>{
    	if(!cart){
    		alert("Cart is empty!!");
    		return false;
    	}else{
    		if(!total){
    			alert("system error!!");
    			return false;
    		}else{
    			if(!contactNum){
    				alert("Enter your contact number!!");
    				contactRef.current.classList.add("warning");
    				return false;
    			}else{
    				if(!payMode){
    					alert("Select Payment Method!!");
    					return false;
    				}else{
    					return true;
    				}
    			}
    		}
    	}
    }

    const submitHandle = (e) =>{
    	e.preventDefault();
    	let valid = formChecker();
    	if(valid){
    		let firstCode = "WTWR";
			let secondCode = Date.now();
			let transactionCode = firstCode + secondCode;
			let userId = userInfo.id;
			let products = [];
			let assignedItem = [];

			cart.forEach(item => {
				let prodQty = parseInt(item.qty);
				let matchedItem = items.filter(itemProduct => {
					return itemProduct.productId === item.product._id;
				})

				assignedItem = [...assignedItem, 
					{
						productId : item.product._id,
						stocks : matchedItem.splice(0,prodQty)
					}
				];
			})

			let finalOrder = assignedItem.map(assItem => {
				let prodDetails = prods.find(product => {
					return product._id === assItem.productId;
				})

				let cartDetails = cart.find(cartProd => {
					return cartProd.product._id === assItem.productId;
				}) 

				return(
					{
						productId : assItem.productId,
						items : assItem.stocks.map(itemAssigned => {
							return(
								{
									_id : itemAssigned._id,
									codeNumber : itemAssigned.codeNumber
								}
							)
						}),
						name : 	prodDetails.name,
						price : prodDetails.price,
						quantity : cartDetails.qty,
						subtotal : cartDetails.price
					}
				)
			})

			fetch("https://wattuwer-server.herokuapp.com/transactions/create",{
				method : "POST",
				body : JSON.stringify({
					transactionCode : transactionCode,
					userId : userId,
					contactNo : contactNum,
					paymentMode : payMode,
					products : finalOrder,
					total : total
				}),
				headers : {
					"Content-Type" : "application/json"
				}
			})
			.then(data => data.json())
			.then(result => {
				// console.log(result);
				let soldStocks = [];
				assignedItem.forEach(item => {
					item.stocks.forEach(stockItem => {
						soldStocks.push(stockItem);
					})
				})

				soldStocks.forEach(stockDetail => {
					console.log(stockDetail._id)
					console.log(stockDetail.codeNumber)
					console.log(stockDetail.productId)
					fetch("https://wattuwer-server.herokuapp.com/order-stocks/create",{
						method : "POST",
						body : JSON.stringify({ 
							_id : stockDetail._id , 
							productId : stockDetail.productId , 
							codeNumber : stockDetail.codeNumber
						}),
						headers : {
							"Content-Type" : "application/json"
						}
					})
					.then(data => data.json())
					.then(result => {
						console.log(result._id)
						console.log(result.codeNumber)
						console.log(result.productId)
						fetch("https://wattuwer-server.herokuapp.com/stocks/admin-only/api/wattuwer/stock/" + result._id, {
							method : "DELETE"
						})
						.then(data => data.json())
						.then(result => {
							console.log(result._id)
							console.log(result.codeNumber)
							console.log(result.productId)
							localStorage.removeItem("cart");
							localStorage.removeItem("total");
							localStorage.removeItem("noOfCart");
							window.location.href = "/user";
						})
					})
				})
			})
    	}
    }

    useEffect(() => {
    	setItems(stocks);
    	setProds(products);
    },[stocks])

    useEffect(() => {
    	let subTotal = 0;
    	cart.forEach(item => {
    		subTotal += item.price;
    	})

    	setTotal(subTotal);
    },[cart])

	return(
		<Fragment>
			<section>
				<div className="checkout-container">
					<div className="header-title">
						<h1>details.</h1>
					</div>
					<div className="details-container">
						<div className="name-container">
							<span>Name: {userInfo.firstname + " " + userInfo.lastname}</span>
						</div>
						<div className="address-container">
							<span>Address: {userInfo.address}</span>
						</div>
						<div className="phoneNumber-container">
							<span>Contact Number: </span><input ref={contactRef} type="number" onChange={contanctChangeHandle}/>
						</div>
						<div className="orderList-header-container">
							<h3>order list.</h3>
						</div>
						<div className="orderList-container">
							<table>
								<thead>
									<tr>
										<th>Product</th>
										<th>Quantity</th>
										<th>Price</th>
									</tr>
								</thead>
								<tbody>
									{
										cart.map(item => {
											return(
												<tr key={item.product._id}>
													<td>{item.product.name}</td>
													<td>{item.qty}</td>
													<td><span>&#8369;</span>{item.price.toFixed(2)}</td>
												</tr>
											)
										})
									}
								</tbody>
								<tfoot>
									<tr>
										<td colSpan="2">Total: </td>
										<td><span>&#8369;{total}</span></td>
									</tr>
								</tfoot>
							</table>
						</div>
						<div className="mode-container">
							<div className="mode-header-container">
								<h3>mode of payment.</h3>
							</div>
							<div className="mode-list-container">
								<form onSubmit={submitHandle}>
									<div>
										<label htmlFor="cod">Cash on Delivery</label>
										<input type="radio" name="cod" id="cod" value="COD" onChange={payModeChangeHandle}/>
									</div>
									<div>
										<button>submit</button>
									</div>
								</form>
								<h4>or</h4>
								<div className="stripe-button">
									<button>Pay with Stripe</button>
								</div>
								<div className="paypal-button">
									<button>Pay with Paypal</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	)
} 

export default CheckoutForm;