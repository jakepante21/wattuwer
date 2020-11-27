import React, {Fragment} from "react";

const Unauthorized = () => {
	return(
		<Fragment>
			<section className="unauth-section">
				<div>
					<h1>Sorry, you are unauthorized to visit this page.</h1>
				</div>
				<div>
					<button onClick={() => {window.location.href="/"}}>go back to home.</button>
				</div>
			</section>
		</Fragment>
	)	
}

export default Unauthorized;