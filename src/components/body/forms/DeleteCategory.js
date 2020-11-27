import React, {Fragment, useState, useEffect, useRef} from "react";

const DeleteCategory = ({categories,crud}) =>{

	const [categoryId, setCategoryId] = useState("");
	const nameRef = useRef();
	const deleteCategoryRef = useRef();

	const categoryHandle = (e) =>{
		setCategoryId(e.target.value);
		nameRef.current.classList.remove("warning");
		console.log(e.target.value);
	}

	const submitHandle = (e) =>{
		e.preventDefault();

		if(!categoryId){
			nameRef.current.classList.add("warning");
		}else{
			fetch("http://localhost:3001/categories/" + categoryId, {
				method : "DELETE",
				headers : {
					"Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMGVjMjIxNjQ3OTNlMDllY2MwNzE1MiIsImlhdCI6MTU5NTQzMzA5N30.ZkBZWm7AWdomTQmYKWVmuGwB-dTP0QlWqBUWo0I0ONE"
				}
			})
			.then(data => data.json())
			.then(result => {
				console.log(result);
				window.location.href = "admin-panel";
			})
		}
	}

	useEffect(() => {
		if(crud){
			if(crud === "DeleteCategory"){
				deleteCategoryRef.current.classList.add("open-form-container");
			}else{
				deleteCategoryRef.current.classList.remove("open-form-container");
			}
		}else{
			deleteCategoryRef.current.classList.remove("open-form-container");
		}
	},[crud])

	return(
		<Fragment>
			<div ref={deleteCategoryRef} className="form-container">
				<div className="header-container">
					<h1>Delete Category</h1>
				</div>
				<div className="sub-form-container">
					<form onSubmit={submitHandle}>
						<div ref={nameRef}>
							<select defaultValue="default" onChange={categoryHandle}>
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
						<div className="submit-button">
							<button>Delete</button>
						</div>
					</form>
				</div>
			</div>
		</Fragment>
	)
}

export default DeleteCategory;