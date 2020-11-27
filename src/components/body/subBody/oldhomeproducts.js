import React, {Fragment,useState,useEffect, useRef} from "react";
import {Link} from "react-router-dom";

const HomeProducts = ({products}) => {

	const [quantities,setQuantities] = useState([]);
	const [cart,setCart] = useState([]);
	const [iconCart,setIconCart] = useState();
	const [total,setTotal] = useState();
	const qtyRef = useRef();
	const modalRef = useRef();
	const cartButtonRef = useRef();

	const openFilter = () => {
		let cates = document.querySelector(".cates");
		cates.classList.toggle("block");
	}

	const quantityHandle = (e) =>{
		let removeDupCart = quantities.find(quan => {
			return quan.productId === e.target.id;
		})

		let fullProduct = products.find(prod => {
			return prod._id === e.target.id;
		})

		let eachPrice = fullProduct.price;
		// console.log(price);

		if(removeDupCart){
			let intQuantity = parseInt(removeDupCart.qty);
			let intQuantity2 = parseInt(e.target.value);
			let newQuan = intQuantity2 + intQuantity;
			let price = newQuan * eachPrice;
			let filterDup = quantities.filter(quan => {
				return quan.productId !== e.target.id;
			})
			if(filterDup.length > 0){
				setQuantities([...filterDup,{productId : e.target.id, qty : newQuan, price : price}]);
			}else{
				console.log("wew");
				setQuantities([{productId : e.target.id, qty : newQuan, price : price}]);
			}
		}else{
			let intQuantity = parseInt(e.target.value);
			let price = eachPrice * intQuantity;
			setQuantities([...quantities,{productId : e.target.id, qty : intQuantity, price : price}]);
		}
	}

	const addCartHandle = (product) => {
		let findQuantity = quantities.find(quan => {
			return quan.productId === product._id;
			// console.log(product._id)
			// console.log(quan.productId)
		})

		// console.log(findQuantity)

		let removeDupCart = cart.find(crt => {
			return crt.product._id === product._id;
		})
		if(removeDupCart){
			let filterDup = cart.filter(crt => {
				return crt.product._id !== product._id;
			})
			setCart([...filterDup,{product, qty : findQuantity.qty, price : findQuantity.price}]);
		}else{
			setCart([...cart,{product,qty : findQuantity.qty, price : findQuantity.price}]);
		}
		let clearInput = product._id;
		let inputToClear = document.querySelector(".c" + clearInput);
		inputToClear.value = "";
	}

	const addCartHandleTwo = () =>{

		if(quantities.length > 0){
			let refreshQuantities = quantities.filter(item => {
				return item.qty !== 0;
			})

			console.log(refreshQuantities);
			let updatedCart = cart.map(item => {
				let updatedQty = refreshQuantities.find(sameItem => {
					return sameItem.productId === item.product._id;
				})

				if(updatedQty){
					let price = parseInt(item.product.price) * parseInt(updatedQty.qty);

					return {
						product : item.product,
						qty : updatedQty.qty,
						price : price
					}
				}else{
					return;
				}
			})

			let finalUpdatedCart = updatedCart.filter(finalItem => {
				return finalItem !== undefined;
			})
			if(finalUpdatedCart.length > 0){
				setCart(finalUpdatedCart);
				// console.log(finalUpdatedCart);
			}
		}else{
			// setCart([]);
		}
	}

	useEffect(() => {
		if(cart.length > 0){
			localStorage.setItem("cart",JSON.stringify(cart));

			let totalCart = 0;
			cart.forEach(cart => {
				totalCart += parseInt(cart.qty);
			})
			setIconCart(totalCart);

			cartButtonRef.current.classList.add("cart-open");
			let subPrice = 0;
			cart.forEach(item => {
				subPrice += item.price;
			})
			// console.log(subPrice);
			setTotal(subPrice);
		}else{
			cartButtonRef.current.classList.remove("cart-open");
		}
	},[cart])

	useEffect(() => {
		let newCart = localStorage.getItem("cart");
		let parseCart = JSON.parse(newCart);
		if(parseCart){
			let newQuantities = parseCart.map(cart => {
				return {
					productId : cart.product._id,
					qty : cart.qty
				}
			})

			console.log(parseCart)
			console.log(newQuantities)

			if(parseCart){
				setCart(parseCart);
				setQuantities(newQuantities);
			}
			cartButtonRef.current.classList.add("cart-open");
		}else{
			cartButtonRef.current.classList.remove("cart-open");
		}
		
	},[])

	useEffect(() => {
		addCartHandleTwo();
	},[quantities])

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

	const addQuantityHandle = (e) =>{
		let removeDupCart = quantities.find(quan => {
			return quan.productId === e.target.id;
		})
		// console.log(newQuan);

		if(removeDupCart){
			let intQuantity = parseInt(removeDupCart.qty);
			let newQuan = intQuantity += 1;
			let filterDup = quantities.filter(quan => {
				return quan.productId !== e.target.id;
			})
			if(filterDup.length > 0){
				setQuantities([...filterDup,{productId : e.target.id, qty : newQuan}]);
			}else{
				console.log("wew");
				setQuantities([{productId : e.target.id, qty : newQuan}]);
			}
		}else{
			setQuantities([...quantities,{productId : e.target.id, qty : e.target.value}]);
		}
	}

	const subQuantityHandle = (e) =>{
		let removeDupCart = quantities.find(quan => {
			return quan.productId === e.target.id;
		})
		console.log(removeDupCart);

		if(removeDupCart){
			let intQuantity = parseInt(removeDupCart.qty);
			let newQuan = intQuantity -= 1;
			if(newQuan > 0){
				let filterDup = quantities.filter(quan => {
					return quan.productId !== e.target.id;
				})
				if(filterDup.length > 0){
					setQuantities([...filterDup,{productId : e.target.id, qty : newQuan}]);
				}else{
					console.log("wew");
					setQuantities([{productId : e.target.id, qty : newQuan}]);
				}
			}else{
				let filterDup = quantities.filter(quan => {
					return quan.productId !== e.target.id;
				})
				// console.log(filterDup);
				if(filterDup.length > 0){
					setQuantities([...filterDup]);
				}else{
					setQuantities([]);
				}
			}
		}else{
			setQuantities([...quantities,{productId : e.target.id, qty : e.target.value}]);
		}
	}

	return(
		<Fragment>
			<section>
				<div ref={cartButtonRef} className="cart-button-container" onClick={openModalHandle}>
					<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cart4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
					</svg>
					<span>
						{iconCart}.
					</span>
				</div>
				<div className="shop-header">
					<div className="shop-title">
						<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-bag-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" d="M14 5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5zM1 4v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4H1z"/>
						<path d="M8 1.5A2.5 2.5 0 0 0 5.5 4h-1a3.5 3.5 0 1 1 7 0h-1A2.5 2.5 0 0 0 8 1.5z"/>
						<path fillRule="evenodd" d="M10.854 7.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 10.293l2.646-2.647a.5.5 0 0 1 .708 0z"/>
						</svg>
						<h1>Shop</h1>
					</div>
					<div className="shop-filter">
						<div className="filter" onClick={openFilter}>
							<span>All</span>
							<ul className="cates">
								<li>All</li>
								<li>Men</li>
								<li>Women</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="shop-products-container">
					{
						products.map(product => {
							return(
								<div key={product._id}>
									<div className="product-image-container">
										<div className="overlay">
										</div>
										<img src={"http://localhost:3001" + product.image} alt="product image.."/>
									</div>
									<div className="product-info-container">
										<div className="product-name-container">
											<p>{product.name}</p>
										</div>
										<div className="product-price-container">
											<p><span>&#8369; </span>{product.price}.00</p>
										</div>
										<div className="view-button-container">
											<button>view item</button>
										</div>
										<div className="quantity-container">
											<input ref={qtyRef} type="number" placeholder="quantity" id={product._id} className={"c" + product._id} onChange={quantityHandle}/>
										</div>
										<div className="addCart-button-container">
											<button onClick={() => addCartHandle(product)}>
												<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
												<path fillRule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
												</svg>
												<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cart4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
												</svg>
											</button>
										</div>
									</div>
								</div>
							)
						})
					}
				</div>
			</section>
			<div ref={modalRef} id="out" className="jake-modal" onClick={outModalHandle}>
				<div id="id" className="jake-pop-up-modal">
					<div className="modal-header-container">
						<div className="modal-title">	
							<h1>cart.</h1>
						</div>
						<div className="modal-x" onClick={closeModalHandle}>
							<span>&#10005;</span>
						</div>
					</div>
					{
						cart.length > 0 ?
						<div className="cart-table-container">
							<table>
								<tbody>
								{
									cart.map(item => {
										return(
											<tr key={item.product._id}>
												<td>{item.product.name}</td>
												<td>
													<button id={item.product._id} onClick={addQuantityHandle}>+</button>
													<input type="number" value={item.qty}/>
													<button id={item.product._id} onClick={subQuantityHandle}>-</button></td>
												<td><span>&#8369; </span> {item.price}</td>
											</tr>
										)
									})
								}
								</tbody>
							</table>
						</div>
						:
						<div className="cart-empty-container">
							<h1>cart is empty.</h1>
						</div>
					}
					{
						cart.length > 0 ?
						<div className="cart-footer-container">
							<div className="check-out-button">
								<button><Link to="/checkout" target="_blank">check out</Link></button>
							</div>
							<div className="total-container">
								<h3>total: <span>&#8369; </span> <span>{total}.00</span></h3>
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

export default HomeProducts;