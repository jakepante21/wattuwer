import React, {Fragment,useState,useEffect, useRef} from "react";

const EditCategory = ({categories,genderCategories,crud}) =>{

	const [name,setName] = useState("");
	const [categoryId,setCategoryId] = useState("");
	const nameRef = useRef();
	const categoryRef = useRef();
	const editCategoryRef = useRef();

	const categoryChange = (e) => {
		let prevCategory = categories.find(category => {
			return category._id === e.target.value;
		})
		setName(prevCategory.name);
		setCategoryId(prevCategory._id);
		nameRef.current.classList.remove("warning");
		categoryRef.current.classList.remove("warning");
	}

	const categoryHandle = (e) =>{
		setName(e.target.value);
	}

	const submitHandle = (e) => {
		e.preventDefault();

		if(!name && !categoryId){
			nameRef.current.classList.add("warning");
			categoryRef.current.classList.add("warning");
		}else if(!name){
			categoryRef.current.classList.add("warning");
		}else if(!categoryId){
			categoryRef.current.classList.add("warning");
		}else{
			fetch("http://localhost:3001/categories/" + categoryId, {
				method : "PUT",
				body : JSON.stringify({name : name}),
				headers : {
					"Content-Type" : "application/json",
					"Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMGVjMjIxNjQ3OTNlMDllY2MwNzE1MiIsImlhdCI6MTU5NTQzMzA5N30.ZkBZWm7AWdomTQmYKWVmuGwB-dTP0QlWqBUWo0I0ONE"
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
			if(crud === "EditCategory"){
				editCategoryRef.current.classList.add("open-form-container");
			}else{
				editCategoryRef.current.classList.remove("open-form-container");
			}
		}else{
			editCategoryRef.current.classList.remove("open-form-container");
		}
	},[crud])

	return(
		<Fragment>
			<div ref={editCategoryRef} className="form-container">
				<div className="header-container">
					<h1>Edit Category</h1>
				</div>
				<div className="sub-form-container">
					<form onSubmit={submitHandle}>
						<div ref={nameRef}>
							<select defaultValue="default" onChange={categoryChange}>
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
						<div ref={categoryRef}>
							<input type="text" id="name" name="name" placeholder="Category Name" value={name} onChange={categoryHandle}/>
						</div>
						<div className="submit-button">
							<button type="submit">Submit</button>
						</div>
					</form>
				</div>
			</div>
		</Fragment>
	)
}

export default EditCategory;