import React, {Fragment, useState, useEffect, useRef} from "react";

const AddStock = ({products,crud}) =>{

	const [productId,setProductId] = useState();
	const [quantity, setQuantity] = useState();
	const jakeModalRef = useRef();
	const quantityRef = useRef();
	const addStockRef = useRef();
	let intervalId = null;

	const addStockHandle = (id) => {
		setProductId(id);
	}

	const openModalHandle = () =>{
		clearInterval(intervalId);
		jakeModalRef.current.classList.remove("jake-modal-off");
		jakeModalRef.current.classList.add("jake-modal-on");
	}

	const modalOffHandle = (e) =>{

		if(e.target.id === "out"){
			jakeModalRef.current.classList.remove("jake-modal-on");
			quantityRef.current.classList.remove("warning");

			intervalId = setInterval(() => {
				jakeModalRef.current.classList.add("jake-modal-off");
			},500)
		}

		clearInterval(intervalId);
	}

	const changeQuantity = (e) =>{
		setQuantity(e.target.value);
		quantityRef.current.classList.remove("warning");
	}

	const submitHandle = (e) =>{
		e.preventDefault();
		let reload = 0;

		if(!quantity){
			quantityRef.current.classList.add("warning");
		}else{

			for(let x = 0; x < quantity ; x++){
				fetch("http://localhost:3001/stocks/create",{
					method : "POST",
					body : JSON.stringify({productId : productId}),
					headers : {
						"Content-Type" : "application/json",
						"Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMGVjMjIxNjQ3OTNlMDllY2MwNzE1MiIsImlhdCI6MTU5NTQzMzA5N30.ZkBZWm7AWdomTQmYKWVmuGwB-dTP0QlWqBUWo0I0ONE"
					}
				})
				.then(data => data.json())
				.then(result => {
					console.log(result);
				})
				reload += 1;
			}
		}
	}

	useEffect(() => {
		if(crud){
			if(crud === "AddStock"){
				addStockRef.current.classList.add("open-form-container");
			}else{
				addStockRef.current.classList.remove("open-form-container");
			}
		}else{
			addStockRef.current.classList.remove("open-form-container");
		}
	},[crud])

	return(
		<Fragment>
			<div ref={addStockRef} className="form-container">
				<div className="header-container">
					<h1>Add Stock</h1>
				</div>
				<div className="stock-container">
					{
						products.map(product => {
							return(
								<div key={product._id}>
									<div>
										<h2>Stocks: {product.stocks}</h2>
										<button onClick={() => {addStockHandle(product._id); openModalHandle(); }}>
											<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
											<path fillRule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"/>
											</svg>
										</button>
									</div>
									<img src={"http://localhost:3001" + product.image} alt="image here"/>
								</div>
							)
						})
					}
				</div>
			</div>

			<div ref={jakeModalRef} id="out" className="jake-modal jake-modal-off" onClick={modalOffHandle}>
				<div id="in" className="jake-pop-up-modal">	
					<div className="pop-up-header">
						<h1>Add Stock.</h1>
					</div>
					<div className="pop-up-content">
						<form onSubmit={submitHandle}>
							<div>
								<h1>Quantity: </h1>
							</div>
							<div ref={quantityRef}>
								<input type="number" onChange={changeQuantity}/>
							</div>
							<div>
								<button>Add</button>
							</div>
						</form>
					</div>
				</div>
			</div>	
		</Fragment>
	)
}

export default AddStock;