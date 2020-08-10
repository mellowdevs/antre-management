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
						cid: category.id,
						cname: category.name,
						...doc.data(),
					};
					items.push(item);
				});
				this.setState({ items: items });
			})
			.catch((error) => {
				console.error(error);
			});
	}
	render() {
		const { category } = this.props;
		const items = this.state.items;
		return (
			<div className='card menu-card shadow'>
				<div className='card-body menu-card-body'>
					<h5 className='card-title menu-category-title  menu-item-detail'>
						{category.name}
					</h5>
					<div className='card-text'>
						<ul className='list-group '>
							{items &&
								items.map((item) => {
									return <MenuItem item={item} key={item.id} />;
								})}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default MenuCategory;
