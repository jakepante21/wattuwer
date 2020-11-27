import React, {Fragment, useState, useRef, useEffect} from "react";

const AddCategory = ({genderCategories,crud}) => {

	const [name,setName] = useState("");
	const nameRef = useRef();
	const addCategoryRef = useRef();

	const nameChange = (e) => {
		setName(e.target.value);
		nameRef.current.classList.remove("warning");
	}

	const submitHandle = (e) => {
		e.preventDefault();

		if(!name){
			nameRef.current.classList.add("warning");
		}else{
			fetch("https://wattuwer-server.herokuapp.com/categories/create",{
				method : "POST",
				body : JSON.stringify({name : name}),
				headers : {
					"Content-Type" : "application/json",
					"Authorization" : localStorage.getItem("token")
				}
			})
			.then(data => data.json())
			.then(category => {
				console.log(category);
				window.location.href = "/admin-panel";
			})
		}
	}

	useEffect(() => {
		if(crud){
			if(crud === "AddCategory"){
				addCategoryRef.current.classList.add("open-form-container");
			}else{
				addCategoryRef.current.classList.remove("open-form-container");
			}
		}else{
			addCategoryRef.current.classList.remove("open-form-container");
		}
	},[crud])

	return(
		<Fragment>
			<div ref={addCategoryRef} className="form-container">
				<div className="header-container">
					<h1>Add Category</h1>
				</div>
				<div className="sub-form-container">
					<form onSubmit={submitHandle}>
						<div ref={nameRef}>
							<input type="text" id="name" name="name" className="name" placeholder="Category Name" onChange={nameChange}/>
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

export default AddCategory;