import React, {Fragment, useState, useEffect, useRef} from "react";
import Pagination from "./Pagination";
import {Link} from "react-router-dom";

const Cart = ({products,categories,cartRef,exportQuantityHandle, exportAddCartHandle}) => {

	const [alProductd,setProducts] = useState([]);
	const [cart,setCart] = useState([]);
	const [preCart,setPreCart] = useState([]);
	const [cartNum,setNoOfCart] = useState();
	const [cartTotal,setCartTotal] = useState();
	const [currentCart,setCurrentCart] = useState();
	const [currentPage,setCurrentPage] = useState(1);
	const [itemPerPage,setItemPerPage] = useState(2);
	const [numberOfPage,setNumberOfPage] = useState();
	const cartButtonRef = useRef();
	const modalRef = useRef();

	// SETTING PRODUCTS
	useEffect(() => {
		setProducts(products);
	},[products])

	// MODAL EVENTS & FUNCTIONS
	const openModalHandle = () => {
		modalRef.current.classList.add("jake-modal-on");
	}

	const closeModalHandle = () =>{
		modalRef.current.classList.remove("jake-modal-on");
	}

	const outModalHandle = (e) =>{
		if(e.target.id === "out"){
			modalRef.current.classList.remove("jake-modal-on");
		}
	}

	// CART EVENTS AND FUNCTIONS

	// GETTING AND SETTING TOTAL AND CARTNUM PROPS
	// useEffect(() => {
	// 	if(localStorage.getItem("total") && localStorage.getItem("noOfCart")){
	// 		let total = parseInt(localStorage.getItem("total"));
	// 		let noOfCart = parseInt(localStorage.getItem("noOfCart"));

	// 		setCartTotal(total);
	// 		setNoOfCart(noOfCart);
	// 	}
	// },[localStorage.getItem("total"),localStorage.getItem("noOfCart")])

	// TAKING CART DATA FROM LOCALSTORAGE
	// useEffect(() => {
	// 	if(localStorage.getItem("cart")){
	// 		let parseCart = JSON.parse(localStorage.getItem("cart"));
	// 		setCart(parseCart);
	// 	}
	// },[localStorage.getItem("cart")])

	useEffect(() => {
		if(cart.length > 0){
			cartButtonRef.current.classList.add("cart-open");
		}else{
			cartButtonRef.current.classList.remove("cart-open");
		}
	},[cart])

	useEffect(() => {
		cartRef(cartButtonRef.current);
	},[])

	// CART FUNCTIONS

	const changeQuantityHandle = (e) =>{
		// console.log(preCart)

		let prodId = e.target.id;
		let input = document.querySelector(".c" + prodId);
		input.classList.remove("warning");

		// TO CHECK IF THERE'S ITEM IN THE CART
		if(preCart.length > 0){

			// TO CHECK IF THERE'S ALREADY EXISTING SAME ITEM ON THE CART
			let duplicateItem = preCart.find(item => {
				return item.productId === e.target.id;
			})

			if(duplicateItem){

				// TO CHECK IF THERE'S INPUT VALUE
				if(e.target.value){

					// ADDING QUANTITY WITHOUT DUPLICATE
					let preCartWithoutDup = preCart.filter(item => {
						return item.productId !== duplicateItem.productId;
					})

					let newQuantity = parseInt(e.target.value);
					setPreCart([...preCartWithoutDup,{productId : e.target.id , qty : newQuantity}]);
				}else{
					let preCartWithoutDup = preCart.filter(item => {
						return item.productId !== duplicateItem.productId;
					})

					setPreCart([...preCartWithoutDup]);
				}
			}else{
				setPreCart([...preCart,{productId : e.target.id, qty : e.target.value}]);
			}
		}else{
			setPreCart([...preCart,{productId : e.target.id, qty : e.target.value}]);
		}
	}

	const addToCartHandle = (product) => {

		// TO CHECK IF THERE'S ITEM IN THE CART
		if(cart.length > 0){

			let itemToAdd = preCart.find(item => {
				return item.productId === product._id;
			})

			if(itemToAdd){
				if(product.stocks > itemToAdd.qty){
					let duplicateItem = cart.find(item => {
						return item.product._id === product._id;
					})

					if(duplicateItem){
						let newSetCart = cart.filter(item => {
							return item.product._id !== duplicateItem.product._id;
						})
						// console.log(newSetCart);
						let newQuantity = parseInt(itemToAdd.qty) + parseInt(duplicateItem.qty);
						if(product.stocks >= newQuantity){
							let price = product.price * newQuantity;
							setCart([...newSetCart,{product : product, qty : newQuantity, price : price}]);
						}else{
							let prodId = product._id;
							let input = document.querySelector(".c" + prodId);
							setPreCart([]);
							input.value = "";
							alert("No. of quantity exceeds no. of stocks: " + product.stocks)
						}
					}else{
						let itemToAdd = preCart.find(item => {
							return item.productId === product._id;
						})
						let price = product.price * itemToAdd.qty;
						// console.log(itemToAdd)
						setCart([...cart,{product : product, qty : itemToAdd.qty, price : price}]);
					}
					let prodId = product._id;
					let input = document.querySelector(".c" + prodId);
					setPreCart([]);
					input.value = "";
				}else{
					let prodId = product._id;
					let input = document.querySelector(".c" + prodId);
					setPreCart([]);
					input.value = "";
					alert("No. of quantity exceeds no. of stocks: " + product.stocks)
				}
			}else{
				let prodId = product._id;
				let input = document.querySelector(".c" + prodId);
				input.classList.add("warning");
				// input.value = "";
			}
		}else{

			// GETTING THE QUANTITY
			let itemToAdd = preCart.find(item => {
				return item.productId === product._id;
			})

			if(itemToAdd){
				if(product.stocks > itemToAdd.qty){
					let price = product.price * itemToAdd.qty;

					setCart([...cart,{product : product, qty : itemToAdd.qty, price : price}]);
					setPreCart([]);
				}else{
					alert("No. of quantity exceeds no. of stocks: " + product.stocks);
				}
			}else{
				let prodId = product._id;
				let input = document.querySelector(".c" + prodId);
				input.classList.add("warning");
			}
			let prodId = product._id;
			let input = document.querySelector(".c" + prodId);
			input.value = "";
		}
	}

	// MAKING ADD TO CART AND QUANTITY HANDLE AVAILABLE FOR OTHER COMPONENTS
	useEffect(() => {
		exportQuantityHandle(changeQuantityHandle);
		exportAddCartHandle(addToCartHandle);
	},[preCart])

	const clearCartHandle = () => {
		setCart([]);
		setCartTotal(0);
		setNoOfCart(0);
		localStorage.removeItem("cart");
		localStorage.removeItem("tota");
		localStorage.removeItem("noOfCart");
		// clearCartRef.current.clearCartHandle();
		// console.log(clearCartRef.current)
		// clearCartRefHandle();
	}

	const addCartHandle = (e) =>{
		let itemToAdd = cart.find(item => {
			return item.product._id === e.target.id;
		})

		let newSetCart = cart.filter(item => {
			return item.product._id !== itemToAdd.product._id;
		})

		let newQty = parseInt(itemToAdd.qty) + 1;
		let newPrice = itemToAdd.product.price * newQty;

		let newSetCart2 = cart.map(item => {
			if(itemToAdd.product._id === item.product._id){
				return {...item,qty : newQty, price : newPrice};
			}else{
				return item;
			}
		})
		// console.log(newSetCart2);
		setCart(newSetCart2);
	}

	const subCartHandle = (e) =>{
		let itemToAdd = cart.find(item => {
			return item.product._id === e.target.id;
		})

		let newSetCart = cart.filter(item => {
			return item.product._id !== itemToAdd.product._id;
		})

		let newQty = parseInt(itemToAdd.qty) - 1;
		if(newQty > 0){
			let newPrice = itemToAdd.product.price * newQty;
			let newSetCart2 = cart.map(item => {
				if(itemToAdd.product._id === item.product._id){
					return {...item,qty : newQty, price : newPrice};
				}else{
					return item;
				}
			})
			setCart(newSetCart2);
		}else{
			setCart(newSetCart);
			localStorage.setItem("cart",JSON.stringify(cart));
			if(newSetCart.length <= 0){
				clearCartHandle();
			}
		}
		// console.log(newSetCart2);
	}

	// UPDATING CART EVERY REMOUNT
	useEffect(() => {
		let preParseCart = localStorage.getItem("cart");
		let parseCart = JSON.parse(preParseCart);
		if(parseCart){
			setCart(parseCart);
			// cartButtonRef.current.classList.add("cart-open");
		}
	},[])

	useEffect(() => {
		if(cart.length > 0){
			localStorage.setItem("cart",JSON.stringify(cart));

			let cartNum = 0;
			let total = 0;
			cart.forEach(item => {
				cartNum += parseInt(item.qty);
				total += parseInt(item.price);
			})

			setCartTotal(total);
			setNoOfCart(cartNum);
			// cartButtonRef.current.classList.add("cart-open");
		}else{
			let cartNum = 0;
			let total = 0;
			setCartTotal(total);
			setNoOfCart(cartNum);
			// localStorage.removeItem("cart");
			// cartButtonRef.current.classList.remove("cart-open");
		}
	},[cart])

	// PAGINATION

	const setPageHandle = (page) =>{
		if(page <= 0){
			setCurrentPage(1);
		}else if(page >= numberOfPage){
			setCurrentPage(numberOfPage);
		}else{
			setCurrentPage(page);
		}
	}

	useEffect(() => {
		let newCart = cart;
		let indexToStart = (currentPage * itemPerPage) - itemPerPage;
		let indexToEnd = currentPage * itemPerPage;
		let newCart2 = newCart.slice(indexToStart,indexToEnd);
		let numPage = Math.ceil(cart.length / itemPerPage);
		setCurrentCart(newCart2);
		setNumberOfPage(numPage);
		// console.log(numberOfPage)
	},[currentPage,cart])

	return(
		<Fragment>
			<div ref={cartButtonRef} className="cart-button-container" onClick={openModalHandle}>
				<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cart4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				<path fillRule="evenodd" d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
				</svg>
				<span>
					{cartNum}.
				</span>
			</div>
			<div ref={modalRef} id="out" className="jake-modal" onClick={outModalHandle}>
				<div id="id" className="jake-pop-up-modal">
					<div className="modal-header-container">
						<div className="modal-title">	
							<h1>your cart.</h1>
						</div>
						<div className="modal-x" onClick={closeModalHandle}>
							<span>&#10005;</span>
						</div>
					</div>
					{
						cart.length > 0 ?
						<div className="cart-table-container">
							{
								currentCart.map(item => {
									return(
										<div key={item.product._id} className="item-container">
											<div className="image-container">
												<img src={"http://localhost:3001" + item.product.image}/>
											</div>
											<div className="product-name">
												<span>{item.product.name}</span>
											</div>
											<div className="product-description">
												<p>{item.product.description}</p>
											</div>
											<div className="product-quantity">
												<button onClick={subCartHandle}>
													<svg id={item.product._id} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
													  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
													</svg>
												</button>
												<input type="number" value={item.qty} disabled/>
												<button onClick={addCartHandle}>
													<svg id={item.product._id} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
													  <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
													</svg>
												</button>
											</div>
											<div className="product-price">
												<span>&#8369;{item.price.toFixed(2)}</span>
											</div>
										</div>
									)
								})
							}
						</div>
						:
						<div className="cart-empty-container">
							<h1>cart is empty.</h1>
						</div>
					}
					{
						cart.length > 0?
						<Pagination currentPage={currentPage} itemPerPage={itemPerPage} currentPage2={setPageHandle} numberOfPage={numberOfPage}/>
						:
						""
					}
					{
						cart.length > 0 ?
						<div className="cart-footer-container">
							<div className="clear-cart-button">
								<button onClick={clearCartHandle}>clear</button>
							</div>
							<div className="total-container">
								<span>total: &#8369; {
									cartTotal ?
									cartTotal.toFixed(2)
									:
									""
								}</span>
							</div>
							<div className="check-out-button">
								<Link to="/checkout" target="_blank"><button>check out</button></Link>
							</div>
						</div>
						:
						""
					}
				</div>
			</div>
		</Fragment>
	)
}

export default Cart;