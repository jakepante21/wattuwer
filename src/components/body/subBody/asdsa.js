<div className="cart-table-container">
	<table>
		<tbody>
		{
			cart.map(item => {
				return(
					<tr key={item.product._id}>
						<td>{item.product.name}</td>
						<td>
							<button id={item.product._id} onClick={addCartHandle}>+</button>
							<input type="number" value={item.qty}/>
							<button id={item.product._id} onClick={subCartHandle}>-</button></td>
						<td><span>&#8369; </span> {item.price}</td>
					</tr>
				)
			})
		}
		</tbody>
	</table>
</div>


<div key={item.product._id} className="item-container">
	<table>
		<tbody>
			<tr>
				<td>
					<img src={"http://localhost:3001" + item.product.image} alt="item image" />
				</td>
				<td>
					<span>{item.product.name}</span>
					<span>{item.product.description}</span>
				</td>
				<td>
					<button onClick={subCartHandle}>
						<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
						</svg>
					</button>
					<input type="number" value={item.qty}/>
					<button onClick={addCartHandle}>
						<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						  <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
						</svg>
					</button>
					<span>&#8369;{item.price.toFixed(2)}</span>
				</td>
			</tr>
		</tbody>
	</table>
</div>