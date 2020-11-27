import React, {Fragment,useEffect, useState, useRef} from "react";
import {Link} from "react-router-dom";
import cover from "./../../assets/images/cover.jpg";
import fOne from "./../../assets/images/1.jpg";
import fTwo from "./../../assets/images/2.jpg";
import fThree from "./../../assets/images/t-1.jpg";
import fFour from "./../../assets/images/t2.jpg";
import HomeProducts from "./subBody/HomeProducts";
import Menu from "./subBody/Menu";

const Home = ({products,categories,genderCategories,product,cartTotal,noOfCart,cartRef,cartButtonRef,passFunctionClearCart,bitch,changeQuantityRef,addToCartRef}) =>{

	const [allProducts,setProducts] = useState([]);
	const [featuredProducts,setFeaturedProducts] = useState([]);
	const [count,setCount] = useState(0);
	const [baseCount, setBaseCount] = useState(0);
	const countRef = useRef(count);
	const baseRef = useRef(baseCount);
	const carouselShowedItemRef = useRef();
	const changeQtyRef = useRef();
	const addCartRef = useRef();
	const qtyRef = useRef();

	// SETTING UP PRODUCTS
	useEffect(() => {
		let sliceProducts = products.slice(0,5);
		if(sliceProducts){
			setFeaturedProducts(sliceProducts);
		}
	},[products])

	// FIRST CLONING OF THE ITEMS/FEATURED PRODUCTS

	useEffect(() => {
		if(featuredProducts.length > 0){
			setCount(featuredProducts.length);
			setBaseCount(featuredProducts.length);
		}

		let items = carouselShowedItemRef.current.childNodes;
		let parent = carouselShowedItemRef.current;
		let beforeClone = [];
		items.forEach(item => {
			beforeClone.push(item);
		})

		// CLONING THE FEATURED ITEMS

		for(var x = beforeClone.length - 1 ; x >= 0 ; x--){
			let clone = beforeClone[x].cloneNode(true);
			clone.classList.add("cloned");
			carouselShowedItemRef.current.prepend(clone);
		}

		for(var y = 0 ; y <= beforeClone.length - 1 ; y++){
			let clone = beforeClone[y].cloneNode(true);
			clone.classList.add("cloned");
			carouselShowedItemRef.current.appendChild(clone);
		}

		let temporaryCount = featuredProducts.length;

		if(items[0]){
			let size = items[0].offsetWidth;
			carouselShowedItemRef.current.style.transform = "translateX(" + (-size * temporaryCount) + "px)";	
		}


	},[featuredProducts])

	// SETTING UP THE REF OF COUNT AND BASECOUNT

	useEffect(() => {
		countRef.current = count;
		baseRef.current = baseCount;
	},[count,baseCount])

	// INFINITE CAROUSEL EFFECT | RETURNNING TO SAME POSITION IF CONDITION MEETS

	useEffect(() => {
		carouselShowedItemRef.current.addEventListener("transitionend",() => {
			let items = carouselShowedItemRef.current.childNodes;
			if(items[0]){
				let size = items[0].offsetWidth;
				if(countRef.current === baseRef.current * 2){
					carouselShowedItemRef.current.style.transition = null;
					carouselShowedItemRef.current.style.transform = "translateX(" + (-size * baseRef.current) + "px)";
					setCount(baseRef.current)
				}else if(countRef.current === baseRef.current - Math.ceil(baseRef.current)){
					carouselShowedItemRef.current.style.transition = null;
					carouselShowedItemRef.current.style.transform = "translateX(" + (-size * baseRef.current) + "px)";
					setCount(count + baseRef.current);
				}
			}
		})
	},[])

	// EVERYTIME ARROW GETS CLICK CAROUSEL WILL SLIDE

	useEffect(() => {
		let items = carouselShowedItemRef.current.childNodes;
		if(items[0]){
			let size = items[0].offsetWidth;
			carouselShowedItemRef.current.style.transform = "translateX(" + (-size * count) + "px)";
			carouselShowedItemRef.current.style.transition = "transform 0.5s ease-in-out";
		}
	},[count])

	// CAROUSEL ARROW FUNCTIONS | PLUS ADDING COUNT EVERYTIME ARROW GETS CLICK

	const rightArrowHandle = () =>{
		if(count === baseCount * 2){
			return;
		}

		setCount(count + 1);
	}
	const leftArrowHandle = () =>{
		if(count === baseCount - Math.ceil(baseRef.current)){
			return;
		}

		setCount(count - 1);
	}

	// CART FUNCTIONS

	useEffect(() => {
		changeQtyRef.current = changeQuantityRef;
		addCartRef.current = addToCartRef;
	},[changeQuantityRef,addToCartRef])

	const changeQuantityHandle = (e) => {
		let quantityFunc = changeQtyRef.current.current;
		quantityFunc(e);
		// console.log(e);
		// console.log(quantityFunc)
	}

	const addToCartHandle = (e) => {
		let cartFunc = addCartRef.current.current;
		cartFunc(e);

		// let quantityFunc = changeQtyRef.current.current;
		// quantityFunc(1);
		// console.log(e);

	}

	return(
		<Fragment>
			<div className="cover-container">
				<div className="cover-caption">
					<h1>Shop Now</h1>
					<svg onClick={() => {window.location.href="/#shop"}}width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
					<path fillRule="evenodd" d="M4.646 7.646a.5.5 0 0 1 .708 0L8 10.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/>
					<path fillRule="evenodd" d="M8 4.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5z"/>
					</svg>
				</div>
				<div className="cover-overlay"></div>
				<img src={cover} alt="clothes"/>
			</div>
			<section id="home-first-section">
				<div className="header-title">
					<h1>Featured Items.</h1>
				</div>
				<div className="carousel-container">
					<svg onClick={leftArrowHandle} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-bar-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" d="M5.854 4.646a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L3.207 8l2.647-2.646a.5.5 0 0 0 0-.708z"/>
					<path fillRule="evenodd" d="M10 8a.5.5 0 0 0-.5-.5H3a.5.5 0 0 0 0 1h6.5A.5.5 0 0 0 10 8zm2.5 6a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 1 0v11a.5.5 0 0 1-.5.5z"/>
					</svg>
					<div className="carousel-item-container">
						<div ref={carouselShowedItemRef} className="carousel-showed-item">
							{
								featuredProducts ?
									featuredProducts.map(product => {
										return(
											<div key={product._id} className="carousel-product-container">
												<div className="carousel-image-container">
													<div className="carousel-image">
														<div className="carosel-image-overlay">
															<div className="carousel-view-button">
																<Link to={"/products/" + product._id}><button>view item</button>
																</Link>
															</div>
															
														</div>
														<img src={"https://wattuwer-server.herokuapp.com" + product.image} alt="Wear"/>
													</div>
													<div className="carosel-image-description">
														<p>
															{product.name}
														</p>
														<p>
															&#8369;{product.price.toFixed(2)}
														</p>
													</div>
													<div className="carousel-view-button">
														<button>view item</button>
													</div>
													<div className="carouse-add-button">
														<button>
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
					</div>
					<svg onClick={rightArrowHandle} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-bar-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"/>
					<path fillRule="evenodd" d="M6 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H6.5A.5.5 0 0 1 6 8zm-2.5 6a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 1 0v11a.5.5 0 0 1-.5.5z"/>
					</svg>
				</div>
			</section>
			<Menu product={product}/>
			<HomeProducts products={products} categories={categories} genders={genderCategories} cartTotal={cartTotal} noOfCart={noOfCart} cartRef={cartRef} cartButtonRef={cartButtonRef} changeQuantityRef={changeQuantityRef} addToCartRef={addToCartRef}/>
		</Fragment>
	)
}

export default Home;