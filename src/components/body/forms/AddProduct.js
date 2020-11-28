import React, {Fragment, useState, useRef, useEffect} from "react";

const AddProduct = ({categories,genderCategories, crud}) =>{

	const nameRef = useRef();
	const priceRef = useRef();
	const categoryRef = useRef();
	const genderRef = useRef();
	const descriptionRef = useRef();
	const imageRef = useRef();
	const addProductRef = useRef();
	const [product,setProduct] = useState({
		name : null,
		price : null,
		categoryId : null,
		genderId : null,
		description : null,
		image : null
	})

	const changeHandle = (e) => {
		setProduct({...product, [e.target.name] : e.target.value});
		if(e.target.name === "name"){
			nameRef.current.classList.remove("warning");
		}else if(e.target.name === "price"){
			priceRef.current.classList.remove("warning");
		}else if(e.target.name === "categoryId"){
			categoryRef.current.classList.remove("warning");
		}else if(e.target.name === "genderId"){
			genderRef.current.classList.remove("warning");
		}else if(e.target.name === "description"){
			descriptionRef.current.classList.remove("warning");
		}else if(e.target.name === "image"){
			imageRef.current.classList.remove("warning");
		}
	}

	const changeFileHandle = (e) => {
		console.log(e.target.files[0]);
		setProduct({...product, image : e.target.files[0]});
	}

	const submitHandle = (e) =>{
		e.preventDefault();
		const formData = new FormData();

		if(!product.name && !product.price && !product.categoryId && !product.genderId && !product.description && !product.image){
			nameRef.current.classList.add("warning");
			priceRef.current.classList.add("warning");
			categoryRef.current.classList.add("warning");
			genderRef.current.classList.add("warning");
			descriptionRef.current.classList.add("warning");
			imageRef.current.classList.add("warning");
		}else if(!product.name || !product.price || !product.categoryId || !product.genderId || !product.description || !product.image){
			if(!product.name){
				nameRef.current.classList.add("warning");
			}

			if(!product.price){
				priceRef.current.classList.add("warning");
			}

			if(!product.categoryId){
				categoryRef.current.classList.add("warning");
			}

			if(!product.genderId){
				genderRef.current.classList.add("warning");
			}

			if(!product.description){
				descriptionRef.current.classList.add("warning");
			}

			if(!product.image){
				imageRef.current.classList.add("warning");
			}
		}else{

			formData.append("name",product.name);
			formData.append("price",product.price);
			formData.append("categoryId",product.categoryId);
			formData.append("genderId",product.genderId);
			formData.append("description",product.description);
			formData.append("image",product.image);

			fetch("https://wattuwer-server.herokuapp.com/products/create",{
				method : "POST",
				body : formData,
				headers : {
					"Authorization" : localStorage.getItem("token")
				}
			})
			.then(data => data.json())
			.then(result => {
				console.log(result);
				// window.location.href = "/admin-panel";
			})
		}
	}

	useEffect(() => {
		if(crud){
			if(crud === "AddProduct"){
				addProductRef.current.classList.add("open-form-container");
			}else{
				addProductRef.current.classList.remove("open-form-container");
			}
		}else{
			addProductRef.current.classList.remove("open-form-container");
		}
	},[crud])

	return(
		<Fragment>
			<div ref={addProductRef} className="form-container">
				<div className="header-container">
					<h1>Add Product</h1>
				</div>
				<div className="sub-form-container">
					<form encType="multipart/form-data" onSubmit={submitHandle}>
						<div ref={nameRef}>
							<input type="text" className="name" id="name" name="name" placeholder="Product Name" onChange={changeHandle}/>
						</div>
						<div ref={priceRef}>
							<input type="number" className="price" id="price" name="price" placeholder="Product Price" onChange={changeHandle}/>
						</div>
						<div ref={categoryRef}>
							<select defaultValue="default" name="categoryId" onChange={changeHandle}>
								<option value="default" disabled>Select Category</option>
								{
									categories.map(category => {
										return(
											<option key={category._id} value={category._id}>{category.name}</option>
										)
									})
								}
							</select>
						</div>
						<div ref={genderRef}>
							<select defaultValue="default" name="genderId" onChange={changeHandle}>
								<option value="default" disabled>Select Gender</option>
								{
									genderCategories.map(gender => {
										return(
											<option key={gender._id} value={gender._id}>{gender.name}</option>
										)
									})
								}
							</select>
						</div>
						<div ref={descriptionRef}>
							<textarea name="description" placeholder="Description" rows="5" onChange={changeHandle}></textarea>
						</div>
						<div ref={imageRef}>
							<input type="file" className="image" id="image" name="image" onChange={changeFileHandle}/>
						</div>
						<div className="submit-button">
							<button>Submit</button>
						</div>
					</form>
				</div>
			</div>
		</Fragment>
	)
}

export default AddProduct;