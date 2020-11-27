import React, {Fragment, useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import dressImg from "./../../../assets/images/dress.jpg";
import shirtImg from "./../../../assets/images/shirt.jpg";
import sneakerImg from "./../../../assets/images/sneakers.jpg";
import suitImg from "./../../../assets/images/suit.jpg";
import bagImg from "./../../../assets/images/bag.jpg";
import watchImg from "./../../../assets/images/watch.jpg";
import skirtImg from "./../../../assets/images/skirt.jpg";
import jeansImg from "./../../../assets/images/jeans.jpg";

const Menu = ({product}) =>{

	return(
		<Fragment>
			<section>
				<div className="header-title">
					<h1>what we got?</h1>
				</div>
				<div className="menu-container grid grid-column-1 row-gap-1">
					<Link to="/product/dress" className="dress" target="_blank" onClick={() => {product("dress")}}>
						<div className="column-template-1 image-overlay dress">
							<div className="overlay-red">
								<span>dress.</span>
								<span>click to view</span>
							</div>
							<img src={dressImg} alt="dress"/>
						</div>
					</Link>
					<Link to="/product/shirt" className="shirt" target="_blank" onClick={() => {product("shirt")}}>
						<div className="column-template-1 image-overlay shirt">
							<div className="overlay-red">
								<span>shirt.</span>
								<span>click to view</span>
							</div>
							<img src={shirtImg} alt="shirt"/>
						</div>
					</Link>
					<Link to="/product/sneakers" className="sneaker" target="_blank" onClick={() => {product("sneakers")}}>
						<div className="column-template-1 image-overlay sneaker">
							<div className="overlay-red">
								<span>sneaker.</span>
								<span>click to view</span>
							</div>
							<img src={sneakerImg} alt="sneaker"/>
						</div>
					</Link>
					<Link to="/product/suits" className="suit" target="_blank" onClick={() => {product("suit")}}>
						<div className="column-template-1 image-overlay suit">
							<div className="overlay-red">
								<span>suit.</span>
								<span>click to view</span>
							</div>
							<img src={suitImg} alt="suit"/>
						</div>
					</Link>
					<Link to="/product/bags" className="bag" target="_blank" onClick={() => {product("bag")}}>
						<div className="column-template-1 image-overlay bag">
							<div className="overlay-red">
								<span>bag.</span>
								<span>click to view</span>
							</div>
							<img src={bagImg} alt="bag"/>
						</div>
					</Link>
					<Link to="/product/watches" className="watch" target="_blank" onClick={() => {product("watch")}}>
						<div className="column-template-1 image-overlay watch">
							<div className="overlay-red">
								<span>watch.</span>
								<span>click to view</span>
							</div>
							<img src={watchImg} alt="watch"/>
						</div>
					</Link>
					<Link to="/product/skirts" className="skirt" target="_blank" onClick={() => {product("skirt")}}>
						<div className="column-template-1 image-overlay skirt">
							<div className="overlay-red">
								<span>skirt.</span>
								<span>click to view</span>
							</div>
							<img src={skirtImg} alt="skirt"/>
						</div>
					</Link>
					<Link to="/product/jeans" className="jeans" target="_blank" onClick={() => {product("jeans")}}>
						<div className="column-template-1 image-overlay jeans">
							<div className="overlay-red">
								<span>jeans.</span>
								<span>click to view</span>
							</div>
							<img src={jeansImg} alt="jeans"/>
						</div>	
					</Link>
				</div>
			</section>
			<div id="shop"></div>
		</Fragment>
	)
}

export default Menu;