import React, {Fragment,useEffect, useState, useRef} from "react";
import cover from "./../../assets/images/cover.jpg";
import fOne from "./../../assets/images/1.jpg";
import fTwo from "./../../assets/images/2.jpg";
import fThree from "./../../assets/images/t-1.jpg";
import fFour from "./../../assets/images/t2.jpg";
import HomeProducts from "./subBody/HomeProducts";
import Menu from "./subBody/Menu";

const Home = ({products,categories,genderCategories,product,cartTotal,noOfCart,cartRef,cartButtonRef,passFunctionClearCart,bitch,changeQuantityRef,addToCartRef}) =>{

	const [count,setCount] = useState(0);
	const [baseCount, setBaseCount] = useState(4);
	const countRef = useRef(count);
	const baseRef = useRef(baseCount);
	const clearCartRef = useRef();
	// let baseCount = 0;

	useEffect( () => {
		console.log(count)
		// let images = document.querySelectorAll(".image-container img")
		// let imageContainer = document.querySelector(".front-prod");
		// let size = images[0].width;
		// imageContainer.style.transform = "translateX(" + (-size * 2) + "px)";
		let images = document.querySelectorAll(".front-prod .product-container");
		let beforeImages = images;
		let parent = document.querySelector(".front-prod");
		for(var x = images.length - 1; x >= 0; x--){
			// let clone = document.createElement("div");
			// let imageLink = document.createElement("img");
			// // clone.appendChild(image);
			// console.log(image);
			// clone.classList.add("image-container","cloned");
			// // parent.prepend(clone);
			let clone = images[x].cloneNode(true);
			clone.classList.add("cloned");
			parent.prepend(clone);
		}
		for(var y = 0; y <= images.length - 1; y++){
			// let clone = document.createElement("div");
			// let imageLink = document.createElement("img");
			// // clone.appendChild(image);
			// console.log(image);
			// clone.classList.add("image-container","cloned");
			// // parent.prepend(clone);
			let clone = images[y].cloneNode(true);
			clone.classList.add("cloned");
			parent.appendChild(clone);
		}
		let allImages = document.querySelectorAll(".front-prod .product-container")
		let imageContainer = document.querySelector(".front-prod");
		let size = allImages[0].offsetWidth;
		let newCount = beforeImages.length;
		// baseCount = beforeImages.length;
		setBaseCount(beforeImages.length);
		// count = newCount;
		setCount(newCount);
		countRef.current = count;
		baseRef.current = baseCount;
		console.log(count);
		console.log(baseRef.current);
		imageContainer.style.transform = "translateX(" + (-size * newCount) + "px)";

		console.log(count)
		imageContainer.addEventListener("transitionend",() => {
			console.log(countRef.current);
			console.log(baseRef.current);
			if(countRef.current === baseRef.current - 2){
				let newBaseCount = baseCount + 2;
				imageContainer.style.transform = "translateX(" + (-size * newBaseCount) + "px)";
				imageContainer.style.transition = null;
				// count = newBaseCount;
				setCount(newBaseCount);
				countRef.current = count;

				console.log(countRef);
			}else if(countRef.current === baseRef.current + 5){
				let newBaseCount = baseCount + 1;
				imageContainer.style.transform = "translateX(" + (-size * newBaseCount) + "px)";
				imageContainer.style.transition = null;
				// count = newBaseCount;
				console.log(count);
				setCount(newBaseCount);
				countRef.current = count;
			}
		})
	},[])

	const leftArrowHandle = () =>{
		if(countRef.current <= baseRef.current - 2){
			return;
		}
		// let images = document.querySelectorAll(".featured-container div");
		// count--;
		// console.log(count)

		// if(count === 1){
		// 	console.log(count);
		// 	let newElement = images[images.length - 1];
		// 	let newElement2 = images[images.length - 2];
		// 	let parent = document.querySelector(".featured-container");
		// 	images[images.length - 1].remove();
		// 	parent.prepend(newElement);
		// 	count++;
		// 	// console.log(parent);
		// 	// console.log(newElement);
		// 	images.forEach((image,index) => {
		// 		let imageSize = image.clientWidth;
		// 		image.style.transform = "translateX("+ -768 +"px)";
		// 		// image.style.transition = "all 0.5s ease-in-out";
		// 		// console.log(index);
		// 		// console.log(count);
		// 	})
		// }else{
		// 	images.forEach((image,index) => {
		// 		let imageSize = image.clientWidth;
		// 		image.style.transform = "translateX("+ (-imageSize * count) +"px)";
		// 		image.style.transition = "all 0.5s ease-in-out";
		// 		// console.log(index);
		// 		// console.log(count);
		// 	})
		// }

		// images.forEach((image,index) => {
		// 	let imageSize = image.clientWidth;
		// 	image.style.transform = "translateX("+ (-imageSize * count) +"px)";
		// 	image.style.transition = "all 0.5s ease-in-out";
		// 	// console.log(index);
		// 	// console.log(count);
		// })
		console.log(count);
		// count--;
		setCount((count) - 1);
		countRef.current = count;
		console.log(count);
		
		// if(count === baseCount - 2){
		// 	console.log(count)
		// 	let newBaseCount = baseCount + 2;
		// 	imageContainer.style.transform = "translateX(" + (-size * newBaseCount) + "px)";
		// 	imageContainer.style.transition = null;
		// 	count = newBaseCount;
		// }else{	
		// 	imageContainer.style.transform = "translateX(" + (-size * count) + "px)";
		// 	imageContainer.style.transition = "all 0.5s ease-in-out";
		// }
		// imageContainer.style.transform = "translateX(" + (-size * count) + "px)";
		// imageContainer.style.transition = "all 0.5s ease-in-out";
		// let pos = imageContainer.getBoundingClientRect().left;
		// console.log(pos);
		// if(pos === -224){
		// 	truE = true;
		// 	// console.log(pos);
		// }

	}	

	useEffect(() => {
		let newImages = document.querySelectorAll(".front-prod .product-container")
		let imageContainer = document.querySelector(".front-prod");
		let size = newImages[0].clientWidth;
		imageContainer.style.transform = "translateX(" + (-size * count) + "px)";
		console.log(-size * count)
		imageContainer.style.transition = "all 0.4s ease-in-out";
		countRef.current = count;
		baseRef.current = baseCount;
	},[count])

	const rightArrowHandle = () =>{
		if(countRef.current >= baseRef.current + 5){
			console.log(count);
			console.log(baseCount);
			return;
		}
		// let images = document.querySelectorAll(".featured-container div");
		// count++;
		// console.log(count)
		// images.forEach((image,index) => {
		// 	let imageSize = image.clientWidth;
		// 	image.style.transform = "translateX("+ (-imageSize * count) +"px)";
		// 	image.style.transition = "all 0.5s ease-in-out";
		// 	// console.log(index);
		// 	console.log((-imageSize * count));
		// })
		console.log(count);
		setCount((count) + 1);
		countRef.current = count;
		console.log(count);
		// let newImages = document.querySelectorAll(".front-prod .product-container")
		// let imageContainer = document.querySelector(".front-prod");
		// let size = newImages[0].clientWidth;
		// imageContainer.style.transform = "translateX(" + (-size * count) + "px)";
		// imageContainer.style.transition = "all 0.4s ease-in-out";
		
	}

	// CLEAR CART REF
	// useEffect(() => {
	// 	// passFunctionClearCart(clearCartRef.current);
	// 	console.log(clearCartRef.clearCartHandle)
	// },[clearCartRef])

	return(
		<Fragment>
			<div className="cover-container">
				<div className="cover-caption">
					<h1>Shop Now</h1>
					<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
					<path fillRule="evenodd" d="M4.646 7.646a.5.5 0 0 1 .708 0L8 10.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/>
					<path fillRule="evenodd" d="M8 4.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5z"/>
					</svg>
				</div>
				<div className="cover-overlay"></div>
				<img src={cover} alt="clothes"/>
			</div>
			<section>
				<div className="header-title">
					<h1>Featured Items.</h1>
				</div>
				<div className="carousel-container">
					<svg onClick={leftArrowHandle} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-bar-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" d="M5.854 4.646a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L3.207 8l2.647-2.646a.5.5 0 0 0 0-.708z"/>
					<path fillRule="evenodd" d="M10 8a.5.5 0 0 0-.5-.5H3a.5.5 0 0 0 0 1h6.5A.5.5 0 0 0 10 8zm2.5 6a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 1 0v11a.5.5 0 0 1-.5.5z"/>
					</svg>
					<div className="carousel-item-container">
						<div className="carousel-showed-item">
							<div className="carousel-product-container">
								<div className="carousel-image-container">
									<div className="carousel-image">
										<div className="carosel-image-overlay">

										</div>
										<img src={fOne} alt="Wear"/>
									</div>
									<div className="carosel-image-description">
										<p>
											Floral Shirt.
										</p>
										<p>
											$50.00
										</p>
									</div>
									<div className="carosel-view-button">
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
						</div>
					</div>
					<svg onClick={rightArrowHandle} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-bar-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"/>
					<path fillRule="evenodd" d="M6 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H6.5A.5.5 0 0 1 6 8zm-2.5 6a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 1 0v11a.5.5 0 0 1-.5.5z"/>
					</svg>
				</div>
			</section>
			<Menu product={product}/>
			<HomeProducts products={products} categories={categories} genders={genderCategories} cartTotal={cartTotal} noOfCart={noOfCart} cartRef={cartRef} cartButtonRef={cartButtonRef} bitch={bitch} changeQuantityRef={changeQuantityRef} addToCartRef={addToCartRef}/>
		</Fragment>
	)
}

export default Home;