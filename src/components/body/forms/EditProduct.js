import React, {Fragment, useState, useEffect, useRef} from "react";

const EditProduct = ({products,categories,genderCategories,crud}) => {

	const [updateProduct,setUpdateProduct] = useState({
		id : null,
		name : "",
		price : 0,
		categoryId : "",
		genderId : "",
		description : "",
		image : null
	})

	const selectProductRef = useRef();
	const editProductRef = useRef();

	const changeProductHandle = (e) => {
		let selectedProduct = products.find(product => {
			return product._id === e.target.value;
		})
		setUpdateProduct(selectedProduct);
	}

	const changePropertyHandle = (e) => {
		setUpdateProduct({...updateProduct, [e.target.name] : e.target.value});
	}

	const changeFileHandle = (e) =>{
		setUpdateProduct({...updateProduct, image : e.target.files[0]});
	}

	const submitHandle = (e) =>{
		e.preventDefault();
		const formData = new FormData();
		formData.append("name",updateProduct.name);
		formData.append("price",updateProduct.price);
		formData.append("categoryId",updateProduct.categoryId);
		formData.append("genderId",updateProduct.genderId);
		formData.append("description",updateProduct.description);
		if(typeof updateProduct.image === "object"){
			formData.append("image",updateProduct.image);
		}

		if(!updateProduct._id){
			selectProductRef.current.classList.add("warning");
		}else{
			selectProductRef.current.classList.remove("warning");
			fetch("https://wattuwer-server.herokuapp.com/products/" + updateProduct._id, {
				method : "PUT",
				body : formData,
				headers : {
					"Authorization" : localStorage.getItem("token")
				}
			})
			.then(data => data.json())
			.then(result => {
				console.log(result);
				window.location.href = "/admin-panel";
			})
		}
	}

	useEffect(() => {
		if(crud){
			if(crud === "EditProduct"){
				editProductRef.current.classList.add("open-form-container");
			}else{
				editProductRef.current.classList.remove("open-form-container");
			}
		}else{
			editProductRef.current.classList.remove("open-form-container");
		}
	},[crud])

	return(
		<Fragment>
			<div ref={editProductRef} className="form-container">
				<div className="header-container">
					<h1>Edit Product</h1>
				</div>
				<div className="sub-form-container">
					<form encType="multipart/form-data" onSubmit={submitHandle}>
						<div ref={selectProductRef}>
							<select defaultValue="default"onChange={changeProductHandle}>
								<option value="default" disabled>Select Product</option>
								{
									products.map(product => {
										return(
											<option key={product._id} value={product._id}>{product.name}</option>
										)
									})
								}
							</select>
						</div>
						{
							updateProduct.image ? 
								typeof updateProduct.image === "object" ?
								""
								:
									<div className="edit-thumbnail">
										<img src={updateProduct.image} alt="product"/>
									</div>
							:
							""
						}
						<div>
							<input type="text" name="name" id="name" value={updateProduct.name} onChange={changePropertyHandle} placeholder="Product Name"/>
						</div>
						<div>
							<input type="number" name="price" id="price" value={updateProduct.price} onChange={changePropertyHandle} placeholder="Product Price"/>
						</div>
						<div>
							<select value={updateProduct.categoryId} name="categoryId" onChange={changePropertyHandle}>
								{
									categories.map(category => {
										return(
											<option key={category._id} value={category._id}>{category.name}</option>
										)
									})
								}
							</select>
						</div>
						<div>
							<select value={updateProduct.genderId} name="genderId" onChange={changePropertyHandle}>
								{
									genderCategories.map(gender => {
										return(
											<option key={gender._id} value={gender._id}>{gender.name}</option>
										)
									})
								}
							</select>
						</div>
						<div>
							<textarea placeholder="Description" rows="5" name="description" value={updateProduct.description} onChange={changePropertyHandle}>
							</textarea>
						</div>
						<div>
							<input type="file" name="image" id="image" onChange={changeFileHandle}/>
						</div>
						<div className="submit-button">
							<button>Update</button>
						</div>
					</form>
				</div>
			</div>
		</Fragment>
	)
}

export default EditProduct;