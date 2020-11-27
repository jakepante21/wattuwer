import React, {Fragment,useState,useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import Pagination from "./Pagination";

const HomeProducts = ({products,categories,genders}) => {

	const [currentProducts,setCurrentProducts] = useState([]);
	const [allProducts,setAllProducts] = useState([]);
	const [category,setCategory] = useState("cate-all");
	const [categoryName,setCategoryName] = useState("All");
	const [gender,setGender] = useState("all");
	const [genderName,setGenderName] = useState("All");
	const [preCart,setPreCart] = useState([]);
	const [cart,setCart] = useState([]);
	const [cartNum,setCartNum] = useState();
	const [total,setTotal] = useState();
	const [currentPage,setCurrentPage] = useState(1);
	const [itemPerPage,setItemPerPage] = useState(2);
	const [numberOfPage,setNumberOfPage] = useState();
	const [currentPageProducts,setCurrentPageProducts] = useState(1);
	const [itemPerPageProducts,setItemPerPageProducts] = useState(8);
	const [numberOfPageProducts,setNumberOfPagePRoducts] = useState();
	const [currentCart,setCurrentCart] = useState();
	const qtyRef = useRef();
	const modalRef = useRef();
	const cartButtonRef = useRef();
	const shopNavRef = useRef();
	const productsRefRef = useRef();
	const genderRef = useRef();
	const categoryRef = useRef();
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
			console.log(newProducts)
			setAllProducts(newProducts);
		}else{
			newProducts = newProducts.filter(prod => {
				return prod.categoryId == category;
			})

			setAllProducts(newProducts);
		}

	},[gender,category])

	// useEffect(() => {
	// 	if(category === "all"){
	// 		setAllProducts(products);
	// 	}else{
	// 		let newProducts = products.filter(prod => {
	// 			return prod.categoryId === category;
	// 		})

	// 		setAllProducts(newProducts);
	// 	}
	// },[category])

	useEffect(() => {
		body.addEventListener("click",(e) => {
			if(window.location.pathname === "/"){
				if(e.target.id !== "shop-nav" && e.target.id !== "gender-li" && e.target.id !== "cate-li"){
					if(genderRef.current !== null & categoryRef.current !== null){
						// console.log(genderRef)
						// console.log(categoryRef)
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
				// console.log(productsRefPosition)
				if(productsRefPosition <= 136){
					shopNavRef.current.classList.add("shop-header-fixed");
					cartButtonRef.current.classList.add("shop-on");
				}else{
					shopNavRef.current.classList.remove("shop-header-fixed");
					cartButtonRef.current.classList.remove("shop-on");
				}
			}
		}
		// console.log(productsRefPosition);
	}

	useEffect(() => {
		// console.log(window.location.pathname);
		if(window.location.pathname === "/"){
			window.addEventListener("scroll",shopNavScroll);
		}
	},[])

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

	// CART FUNCTIONS

	const changeQuantityHandle = (e) =>{

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

					let newQuantity = parseInt(duplicateItem.qty) + parseInt(e.target.value);
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
				let duplicateItem = cart.find(item => {
					return item.product._id === product._id;
				})

				if(duplicateItem){
					let newSetCart = cart.filter(item => {
						return item.product._id !== duplicateItem.product._id;
					})
					// console.log(newSetCart);
					let newQuantity = parseInt(itemToAdd.qty) + parseInt(duplicateItem.qty);
					let price = product.price * newQuantity;
					setCart([...newSetCart,{product : product, qty : newQuantity, price : price}]);
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
				input.value = "";
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
				let price = product.price * itemToAdd.qty;

				setCart([...cart,{product : product, qty : itemToAdd.qty, price : price}]);
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

	const clearCartHandle = () => {
		setCart([]);
		localStorage.removeItem("cart");
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
		}
		// console.log(newSetCart2);
	}

	// 

	useEffect(() => {
		if(cart.length > 0){
			localStorage.setItem("cart",JSON.stringify(cart));

			let cartNum = 0;
			let total = 0;
			cart.forEach(item => {
				cartNum += parseInt(item.qty);
				total += parseInt(item.price);
			})

			setTotal(total);
			setCartNum(cartNum);
			cartButtonRef.current.classList.add("cart-open");
		}else{
			let cartNum = 0;
			let total = 0;
			setTotal(total);
			setCartNum(cartNum);
			// localStorage.removeItem("cart");
			cartButtonRef.current.classList.remove("cart-open");
		}
	},[cart])

	useEffect(() => {
		let preParseCart = localStorage.getItem("cart");
		let parseCart = JSON.parse(preParseCart);
		if(parseCart){
			setCart(parseCart);
			cartButtonRef.current.classList.add("cart-open");
		}
	},[])


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

	const setPageHandleProducts = (page) =>{
		console.log(page)
		if(page <= 0){
			setCurrentPageProducts(1);
		}else if(page >= numberOfPageProducts){
			setCurrentPageProducts(numberOfPageProducts);
		}else{
			setCurrentPageProducts(page);
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
			<section className="home-section">
				<div ref={cartButtonRef} className="cart-button-container" onClick={openModalHandle}>
					<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cart4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
					</svg>
					<span>
						{cartNum}.
					</span>
				</div>
				<div ref={shopNavRef} id="shop-nav" className="shop-header">
					<div className="shop-title">
						<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-bag-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" d="M14 5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5zM1 4v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4H1z"/>
						<path d="M8 1.5A2.5 2.5 0 0 0 5.5 4h-1a3.5 3.5 0 1 1 7 0h-1A2.5 2.5 0 0 0 8 1.5z"/>
						<path fillRule="evenodd" d="M10.854 7.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 10.293l2.646-2.647a.5.5 0 0 1 .708 0z"/>
						</svg>
						<h1>Shop</h1>
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
				<div ref={productsRefRef} className="shop-products-container">
					{
						currentProducts.map(product => {
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
											<p><span>&#8369; </span>{product.price.toFixed(2)}</p>
										</div>
										<div className="view-button-container">
											<Link to={"/products/" + product._id} target="_blank"><button>view item</button></Link>
										</div>
										<div className="quantity-container">
											<input ref={qtyRef} type="number" placeholder="quantity" id={product._id} className={"c" + product._id} onChange={changeQuantityHandle}/>
										</div>
										<div className="addCart-button-container">
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
								<span>total: &#8369; {total.toFixed(2)}</span>
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

export default HomeProducts;