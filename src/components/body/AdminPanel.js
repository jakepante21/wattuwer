import React, {Fragment, useRef, useState, useEffect} from "react";
import AddCategory from "./forms/AddCategory";
import EditCategory from "./forms/EditCategory";
import DeleteCategory from "./forms/DeleteCategory";
import AddProduct from "./forms/AddProduct";
import EditProduct from "./forms/EditProduct";
import DeleteProduct from "./forms/DeleteProduct";
import AddStock from "./forms/AddStock";

const AdminPanel = ({categoryGenders,categories,products}) => {

	const [crud,setCrud] = useState();
	// const [selectedForm,setSelectedForm] = useState();

	// DOM manipulation
	const productButtons = useRef();
	const categoryButtons = useRef();
	const stockButtons = useRef();

	const productHandle = (e) =>{
		productButtons.current.classList.toggle("open-form-button");
		categoryButtons.current.classList.remove("open-form-button");
		stockButtons.current.classList.remove("open-form-button");
		e.target.classList.toggle("selected-crud");
		let parent = e.target.parentElement;
		let firstSibling = parent.nextElementSibling;
		let secondSibling = firstSibling.nextElementSibling;
		firstSibling.childNodes[0].classList.remove("selected-crud");
		secondSibling.childNodes[0].classList.remove("selected-crud");
	}

	const categoryHandle = (e) =>{
		categoryButtons.current.classList.toggle("open-form-button");
		productButtons.current.classList.remove("open-form-button");
		stockButtons.current.classList.remove("open-form-button");
		e.target.classList.toggle("selected-crud");
		let parent = e.target.parentElement;
		let firstSibling = parent.previousElementSibling;
		let secondSibling = parent.nextElementSibling;
		firstSibling.childNodes[0].classList.remove("selected-crud");
		secondSibling.childNodes[0].classList.remove("selected-crud");
	}

	const stockHandle = (e) =>{
		stockButtons.current.classList.toggle("open-form-button");
		productButtons.current.classList.remove("open-form-button");
		categoryButtons.current.classList.remove("open-form-button");
		e.target.classList.toggle("selected-crud");
		let parent = e.target.parentElement;
		let firstSibling = parent.previousElementSibling;
		let secondSibling = firstSibling.previousElementSibling;
		firstSibling.childNodes[0].classList.remove("selected-crud");
		secondSibling.childNodes[0].classList.remove("selected-crud");
	}

	const crudHandle = (e) =>{
		if(crud === e.target.name){
			setCrud("");
			console.log("s")
		}else{
			setCrud(e.target.name);
		}
	}	

	return(
		<Fragment>
			<section id="custom-section">
				<div className="header-title admin-panel-header">
					<h1>Admin Panel</h1>
				</div>
				<div className="flex-row flex-center crud-buttons">
					<div className="product-button">
						<button name="Products" onClick={productHandle}>Product</button>
					</div>
					<div className="category-button">
						<button name="Categories" onClick={categoryHandle}>Category</button>
					</div>
					<div className="stock-button">
						<button name="Stocks" onClick={stockHandle}>Stock</button>
					</div>
				</div>
				<div className="form-buttons-container">
					<div ref={productButtons} className="product-form-buttons">
						<div>
							<button onClick={crudHandle} name="AddProduct">
								<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"/>
								</svg>
								Products
							</button>
						</div>
						<div>
							<button onClick={crudHandle} name="EditProduct">
								<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
								<path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
								</svg>
								Products
							</button>
						</div>
						<div>
							<button onClick={crudHandle} name="DeleteProduct">
								<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
								</svg>
								Products
							</button>
						</div>
					</div>
					<div ref={categoryButtons} className="category-form-buttons">
						<div>
							<button onClick={crudHandle} name="AddCategory">
								<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"/>
								</svg>
								Category
							</button>
						</div>
						<div>
							<button onClick={crudHandle} name="EditCategory">
								<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
								<path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
								</svg>
								Category
							</button>
						</div>
						<div>
							<button onClick={crudHandle} name="DeleteCategory">
								<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
								</svg>
								Category
							</button>
						</div>
					</div>
					<div ref={stockButtons} className="stock-form-buttons">
						<div>
							<button onClick={crudHandle} name="AddStock">
								<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"/>
								</svg>
								Stock
							</button>
						</div>
						<div>
							<button onClick={crudHandle} name="DeleteStock">
								<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
								</svg>
								Stock
							</button>
						</div>
					</div>
				</div>
				<div className="outer-form-container">
					<AddProduct genderCategories={categoryGenders} categories={categories} products={products} crud={crud}/>
					<EditProduct genderCategories={categoryGenders} categories={categories} products={products} crud={crud}/>
					<DeleteProduct genderCategories={categoryGenders} categories={categories} products={products} crud={crud}/>
					<AddCategory genderCategories={categoryGenders} categories={categories} products={products} crud={crud}/>
					<EditCategory genderCategories={categoryGenders} categories={categories} products={products} crud={crud}/>
					<DeleteCategory genderCategories={categoryGenders} categories={categories} products={products} crud={crud}/>
					<AddStock genderCategories={categoryGenders} categories={categories} products={products} crud={crud}/>
				</div>
			</section>
		</Fragment>
	)
}

export default AdminPanel;