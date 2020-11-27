import React, {Fragment, useState, useEffect, useRef} from "react";

const Pagination = ({currentPage, itemPerPage, currentPage2, numberOfPage}) => {

	// const [numberOfPage,setNumberOfPage] = useState();
	// const [newpages,setPages] = useState([]);
	const [pages,setPages] = useState([]);
	const [selectedPage,setCurrSelectedPage] = useState(currentPage);
	const pageUl = useRef();

	useEffect(() => {
		let array = [];
		for(let x = currentPage; x <= numberOfPage; x++){
			console.log(array)
			if(array.length > 0){
				array.forEach(data => {
					if(data !== x){
						array.push(x);
						console.log(array)
					}
				})
				console.log(array)
			}else{
				array.push(x);
			}
			console.log(array)
		}

		setPages(array);
		console.log(array)
	},[numberOfPage])

	// useEffect(() => {
	// 	// console.log(numberOfPage);
	// 	setNumberOfPage(numberOfPage);
	// },[numberOfPage])

	// useEffect(() => {
	// 	if(localStorage.getItem("cart")){
	// 		setNumberOfPage(Math.ceil(JSON.parse(localStorage.getItem("cart")).length / itemPerPage));
	// 	}

	// },[JSON.parse(localStorage.getItem("cart"))])


	// useEffect(() => {
	// 	if(cart){
	// 		if(cart.length > 0){
	// 			setCartTwo(cart);
	// 		}
	// 	}
	// },[cart])

	const colorPage = (e) =>{
		let pageNumbers = pageUl.current.childNodes;
		pageNumbers.forEach((link,index) => {
			if(link.childNodes[0].id === e.target.id){
				link.classList.add("page-selected");
			}else{
				link.classList.remove("page-selected");
			}
		})
	}

	const setSelectedPage = (page) =>{
		setCurrSelectedPage(page);
	}

	return(
		<Fragment>
			<div className="pagination">
				<div className="left-arrow" onClick={() => currentPage2(selectedPage - 1)}>
					<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					  <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
					</svg>
				</div>
				<div className="page-numbers">
					<ul ref={pageUl}>
						{
							pages.map(page => {
								return(
									<li key={page} onClick={(e) => {colorPage(e); currentPage2(page); setSelectedPage(page); }}><span id={"a" + page} >{page}</span></li>
								)
							})
						}
					</ul>
				</div>
				<div className="right-arrow" onClick={() => currentPage2(selectedPage + 1)}>
					<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
					</svg>
				</div>
			</div>
		</Fragment>
	)
}

export default Pagination;