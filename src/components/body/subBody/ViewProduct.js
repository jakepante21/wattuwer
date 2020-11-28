import React, {Fragment, useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";

const ViewProduct = ({products,categories,changeQuantityRef,addToCartRef}) => {

	const [allProducts,setProducts] = useState();
	// const [allProducts,setProducts] = useState([]);
	const [allCategories, setCategories] = useState([]);
	const [category,setCategory] = useState();
	const changeQtyRef = useRef();
	const addCartRef = useRef();
	// const [currentProduct,setCurrentProduct] = useState();
	// const [currentCategory,setCurrentCategory] = useState();

	// useEffect(() => {
	// 	setProduct(localStorage.getItem("view"));
	// },[localStorage.getItem("view")])

	// useEffect(() => {
	// 	setProducts(products);
	// 	setCategories(categories);
	// },[products,categories])

	// SETTING CATEGORIES
	useEffect(() => {
		setCategories(categories);
	},[categories])

	useEffect(() => {
		// let lowerProduct;
		// if(product){
		// 	lowerProduct = product.toLowerCase();

		// 	let category = allCategories.find(cate => {
		// 		// console.log(cate.name.toLowerCase())
		// 		return cate.name.toLowerCase() === lowerProduct;
		// 	})

		// 	// console.log(allCategories)
		// 	setCurrentCategory(category);

		// 	let newProducts = allProducts.filter(prod => {
		// 		return prod.categoryId === category._id;
		// 	})

		// 	setCurrentProduct(newProducts);
		// }

		let path = window.location.pathname;
		let matchCategory = allCategories.find(category=> {
			let regex = new RegExp(category.name.toLowerCase());
			let didMatch = path.match(regex);
				// console.log(category.name)
			if(didMatch){
				return category;
			}
		})
		
		if(matchCategory){
			fetch("https://wattuwer-server.herokuapp.com/products/category/" + matchCategory._id,{
				method : "GET"
			})
			.then(data => data.json())
			.then(result => {
				setProducts(result);
				setCategory(matchCategory.name);
			})
		}
		
		// console.log(matchCategory);

	},[allCategories])

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
				<div className="view-header">
					<h1>{
						category ? 
						category
						:
						""
					}</h1>
				</div>
				<div className="view-products-container">
					{
						allProducts ?
						allProducts.map(prod => {
							return(
								<div key={prod._id}>
									<div className="product-image-container">
										<div className="overlay">
										</div>
										<img src={"http://localhost:3001" + prod.image} alt="product image.."/>
									</div>
									<div className="product-info-container">
										<div className="product-name-container">
											<p>{prod.name}</p>
										</div>
										<div className="product-price-container">
											<p><span>&#8369; </span>{prod.price.toFixed(2)}</p>
										</div>
										<div className="view-button-container">
											<Link to={"/products/" + prod._id} target="_blank"><button>view item</button></Link>
										</div>
										<div className="quantity-container">
											<input type="number" placeholder="quantity" id={prod._id} className={"c" + prod._id} onChange={changeQuantityHandle}/>
										</div>
										<div className="addCart-button-container">
											<button onClick={() => {addToCartHandle(prod)}}>
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
						:
						""
					}
				</div>
			</section>
		</Fragment>
	)
}

export default ViewProduct;