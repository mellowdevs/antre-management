import React, { Component } from 'react';
import MenuItem from './MenuItem';
import firebase from 'firebase';

class MenuCategory extends Component {
	state = {
		items: [{}],
	};
	componentWillMount() {
		const { category } = this.props;
		const database = firebase.database();
		database.ref(`/categories/${category.key}`).on('value', (snapshot) => {
			const items = [];
			snapshot.child('items').forEach((item) => {
				items.push({ cid: category.key, key: item.key, ...item.val() });
			});
			this.setState({ items: items });
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
								items.map((item, index) => {
									return <MenuItem item={item} key={index} />;
								})}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default MenuCategory;
