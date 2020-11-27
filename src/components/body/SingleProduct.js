import React, {Fragment, useState, useEffect, useRef} from "react";

const SingleProduct = ({changeQuantityRef,addToCartRef}) => {

	const [product,setProduct] = useState();
	const changeQtyRef = useRef();
	const addCartRef = useRef();

	useEffect(() => {
		let pathname = window.location.pathname;
		fetch("http://localhost:3001" + pathname,{
			method : "GET"
		})
		.then(data => data.json())
		.then(result => {
			setProduct(result);
		})
	},[])

	useEffect(() => {
		console.log(product);
	},[product])

	// CART FUNCTIONS

	useEffect(() => {
		changeQtyRef.current = changeQuantityRef;
		addCartRef.current = addToCartRef;
	},[changeQuantityRef,addToCartRef])

	const changeQuantityHandle = (e) => {
		let quantityFunc = changeQtyRef.current.current;
		quantityFunc(e);
		// console.log(quantityFunc)
	}

	const addToCartHandle = (e) => {
		let cartFunc = addCartRef.current.current;
		cartFunc(e);
	}

	return(
		<Fragment>
			<section>
				<div className="single-product-header">
					{
						product ?
						<h1>{product.name}</h1>
						:
						""
					}
				</div>
				{
					product ?
					<div className="product-container">
						<div className="product-image-container">
							<img src={"http://localhost:3001" + product.image}/>
						</div>
						<div className="product-description">
							<p>{product.description}</p>
						</div>
						<div className="product-price">
							<span>&#8369;{product.price.toFixed(2)}</span>
						</div>
						<div className="product-quantity">
							<input id={product._id} type="number" className={"c" + product._id} placeholder="quantity" onChange={changeQuantityHandle}/>
						</div>
						<div className="product-button">
							<button onClick={() => {addToCartHandle(product)}}>
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
					:
					<div>
						<h1>Go Back to Home.</h1>
					</div>
				}
			</section>
		</Fragment>
	)
}

export default SingleProduct;

