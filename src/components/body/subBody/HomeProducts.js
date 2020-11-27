import React, {Fragment,useState,useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import Pagination from "./Pagination";

const HomeProducts = ({products,categories,genders,cartTotal,noOfCart,cartRef,cartButtonRef,clrTotal,clrCartNum,changeQuantityRef,addToCartRef}) => {

	const [currentProducts,setCurrentProducts] = useState([]);
	const [allProducts,setAllProducts] = useState([]);
	const [category,setCategory] = useState("cate-all");
	const [categoryName,setCategoryName] = useState("All");
	const [gender,setGender] = useState("all");
	const [genderName,setGenderName] = useState("All");
	const [currentPageProducts,setCurrentPageProducts] = useState(1);
	const [itemPerPageProducts,setItemPerPageProducts] = useState(8);
	const [numberOfPageProducts,setNumberOfPagePRoducts] = useState();
	const qtyRef = useRef();
	const modalRef = useRef();
	const shopNavRef = useRef();
	const productsRefRef = useRef();
	const genderRef = useRef();
	const categoryRef = useRef();
	const changeQtyRef = useRef();
	const addCartRef = useRef();
	const body = document.querySelector("body");

	// RETRIEVING PRODUCTS
	useEffect(() => {
		setAllProducts(products);
	},[products])

	// DOM Manipulation Functions

	// PRODUCT FILTER
	const openFilter = (select,e) => {
		if(select === "gender"){
			if(e.target.id){
				if(e.target.id === "gender-open" || e.target.id === "all-gender-open"){
					genderRef.current.classList.toggle("block");
				}
			}
		}

		if(select === "category"){
			if(e.target.id){
				if(e.target.id === "cate-open" || e.target.id === "all-cate-open"){
					categoryRef.current.classList.toggle("block");
				}
			}
		}
	}

	// SET FILTER

	const genderHandle = (e) => {
		setGender(e.target.id);
		genderRef.current.classList.remove("block");
		if(e.target.id === "all"){
			setGenderName("All")
		}else{
			let name = genders.find(gender => {
				return gender._id === e.target.id;
			})
			setGenderName(name.name);
		}
	}

	const categoryHandle = (e) => {
		setCategory(e.target.id)
		categoryRef.current.classList.remove("block");
		if(e.target.id === "cate-all"){
			setCategoryName("All")
		}else{
			let name = categories.find(category => {
				return category._id === e.target.id;
			})
			setCategoryName(name.name);
		}
	}

	useEffect(() => {
		let newProducts = products;
		if(gender === "all"){
			setAllProducts(newProducts);
		}else{
			newProducts = products.filter(prod => {
				return prod.genderId === gender;
			})

			setAllProducts(newProducts);
		}

		if(category === "cate-all"){
			setAllProducts(newProducts);
		}else{
			newProducts = newProducts.filter(prod => {
				return prod.categoryId == category;
			})

			setAllProducts(newProducts);
		}

	},[gender,category])

	useEffect(() => {
		body.addEventListener("click",(e) => {
			if(window.location.pathname === "/"){
				if(e.target.id !== "shop-nav" && e.target.id !== "gender-li" && e.target.id !== "cate-li"){
					if(genderRef.current !== null & categoryRef.current !== null){
						genderRef.current.classList.remove("block");
						categoryRef.current.classList.remove("block");
					}
				}
			}
		})
	},[])

	// SHOP NAV 

	const shopNavScroll = () => {
		if(window.location.pathname === "/"){
			if(productsRefRef.current !== null){
				let productsRefPosition = productsRefRef.current.getBoundingClientRect().top;
				if(productsRefPosition <= 136){
					shopNavRef.current.classList.add("shop-header-fixed");
					cartButtonRef.current.classList.add("shop-on");
				}else{
					shopNavRef.current.classList.remove("shop-header-fixed");
					cartButtonRef.current.classList.remove("shop-on");
				}
			}
		}
	}

	useEffect(() => {
		if(window.location.pathname === "/"){
			window.addEventListener("scroll",shopNavScroll);
		}
	},[])

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

	// PAGINATION FUNCTIONS
	const setPageHandleProducts = (page) =>{
		if(page <= 0){
			setCurrentPageProducts(1);
		}else if(page >= numberOfPageProducts){
			setCurrentPageProducts(numberOfPageProducts);
		}else{
			setCurrentPageProducts(page);
		}

	}

	useEffect(() => {
		let newProducts = allProducts;
		let indexToStart = (currentPageProducts * itemPerPageProducts) - itemPerPageProducts;
		let indexToEnd = currentPageProducts * itemPerPageProducts;
		let newProducts2 = newProducts.slice(indexToStart,indexToEnd);
		let numPage = Math.ceil(newProducts.length / itemPerPageProducts);
		setCurrentProducts(newProducts2);
		setNumberOfPagePRoducts(numPage);
	},[allProducts,currentPageProducts])

	return(
		<Fragment>
			<section>
				<div ref={shopNavRef} id="shop-nav" className="shop-header">
					<div className="shop-title">
						<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-bag-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" d="M14 5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5zM1 4v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4H1z"/>
						<path d="M8 1.5A2.5 2.5 0 0 0 5.5 4h-1a3.5 3.5 0 1 1 7 0h-1A2.5 2.5 0 0 0 8 1.5z"/>
						<path fillRule="evenodd" d="M10.854 7.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 10.293l2.646-2.647a.5.5 0 0 1 .708 0z"/>
						</svg>
						<h1>Shop</h1>
					</div>
					<div className="filter-label">
						<span>filter by:</span>
					</div>
					<div className="gender-container">
						<div className="gender-label">
							<span>gender.</span>
						</div>
						<div className="gender-filter-container">
							<div id="gender-open" className="gender-filter" onClick={(e) => {openFilter("gender",e)}}>
								<span id="all-gender-open">{genderName}</span>
								<ul ref={genderRef} id="gender-li" className="genders">
									<li id="all" onClick={genderHandle}><span>All</span></li>
									{
										genders.map(gender => {
											return(
												<li key={gender._id} id={gender._id} onClick={genderHandle}><span>{gender.name}</span></li>
											)
										})
									}
								</ul>
							</div>
						</div>
					</div>
					<div className="category-container">
						<div className="category-label">
							<span>category.</span>
						</div>
						<div className="category-filter-container">
							<div id="cate-open" className="category-filter" onClick={(e) => {openFilter("category",e)}}>
								<span id="all-cate-open">{categoryName}</span>
								<ul ref={categoryRef} id="cate-li" className="categories">
									<li id="cate-all" onClick={categoryHandle}><span>All</span></li>
									{
										categories.map(category => {
											return(
												<li key={category._id} id={category._id} onClick={categoryHandle}><span>{category.name}</span></li>
											)
										})
									}
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div ref={productsRefRef} className="grid grid-column-2 column-gap-1 row-gap-1 shop-products-container">
					{
						currentProducts.map(product => {
							return(
								<div key={product._id}>
									<div className="product-image-container">
										<div className="overlay">
											<Link to={"/products/" + product._id} className="home-view-product-button flex-column flex-center" target="_blank"><button>view item</button>
											</Link>
										</div>
										<img src={"https://wattuwer-server.herokuapp.com" + product.image} alt="product image.."/>
									</div>
									<div className="flex-column flex-justify-center product-info-container">
										<div className="flex-row flex-justify-center text product-name-container">
											<p>{product.name}</p>
										</div>
										<div className="flex-row flex-justify-center text product-price-container">
											<p><span>&#8369; </span>{product.price.toFixed(2)}</p>
										</div>
										<div className="flex-column flex-justify-center">
											<Link to={"/products/" + product._id} className="flex-column flex-center" target="_blank"><button>view item</button></Link>
										</div>
										<div className="flex-column flex-center">
											<input ref={qtyRef} type="number" placeholder="quantity" id={product._id} className={"c" + product._id} onChange={changeQuantityHandle}/>
										</div>
										<div className="flex-column flex-center">
											<button onClick={() => addToCartHandle(product)}>
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
				<Pagination currentPage={currentPageProducts} itemPerPage={itemPerPageProducts} numberOfPage={numberOfPageProducts} currentPage2={setPageHandleProducts}/>
			</section>
		</Fragment>
	)
}

export default HomeProducts;