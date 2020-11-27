import React, {Fragment, useState, useEffect, useRef} from "react";

const DeleteProduct = ({products,crud}) => {

	const [deleteProduct,setDeleteProduct] = useState();
	const productRef = useRef();
	const deleteProductRef = useRef();

	const changeProductHandle = (e) =>{
		setDeleteProduct(e.target.value);
	}

	const submitHandle = (e) =>{
		e.preventDefault();

		if(!deleteProduct){
			productRef.current.classList.add("warning");
		}else{
			productRef.current.classList.remove("warning");

			fetch("https://wattuwer-server.herokuapp.com/products/" + deleteProduct, {
				method : "DELETE",
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
			if(crud === "DeleteProduct"){
				deleteProductRef.current.classList.add("open-form-container");
			}else{
				deleteProductRef.current.classList.remove("open-form-container");
			}
		}else{
			deleteProductRef.current.classList.remove("open-form-container");
		}
	},[crud])

	return(
		<Fragment>
			<div ref={deleteProductRef} className="form-container">
				<div className="header-container">
					<h1>Delete Product</h1>
				</div>
				<div className="sub-form-container">
					<form onSubmit={submitHandle}>
						<div ref={productRef}>
							<select name="productId" defaultValue="default" onChange={changeProductHandle}>
								<option value="default">Select Product</option>
								{
									products.map(product =>{
										return(
											<option key={product._id} value={product._id}>{product.name}</option>
										)
									})
								}
							</select>
						</div>
						<div className="submit-button">
							<button>Delete</button>
						</div>
					</form>
				</div>
			</div>
		</Fragment>
	)
}

export default DeleteProduct;