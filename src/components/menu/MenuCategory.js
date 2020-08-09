import React, { Component } from 'react';
import MenuItem from './MenuItem';
import firebase from 'firebase';

class MenuCategory extends Component {
	state = {
		items: [{}],
	};
	componentDidMount() {
		const { category } = this.props;
		const database = firebase.firestore();
		database
			.collection('categories')
			.doc(category.id)
			.collection('items')
			.orderBy('name', 'asc')
			.get()
			.then((response) => {
				const items = [];
				response.forEach((doc) => {
					const item = {
						id: doc.id,
						...doc.data(),
					};
					items.push(item);
				});
				this.setState({ items: items });
			})
			.catch((error) => {
				console.log(error);
			});
	}
	render() {
		const { category } = this.props;
		const items = this.state.items;
		return (
			<div class='card menu-card'>
				<div class='card-body menu-card-body'>
					<h5 class='card-title menu-category-title'>{category.name}</h5>
					<div class='scrollable menu-scrollable'>
						<p class='card-text'>
							<ul className='list-group'>
								{items &&
									items.map((item) => {
										return <MenuItem item={item} key={item.id} />;
									})}
							</ul>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default MenuCategory;
