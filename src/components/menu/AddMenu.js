import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { addMenuItem } from '../../store/actions/menuActions';
class AddMenu extends Component {
	state = {
		cid: '',
		name: '',
		price: '',
		buttonName: 'Kategoriler',
	};
	handleChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};
	addMenuItem;
	handleSubmit = (e) => {
		this.props.addMenuItem(this.state);
	};
	render() {
		const { auth, categories, menuError } = this.props;

		console.log('propp', categories);
		if (!auth.uid) {
			return <Redirect to='signin' />;
		}
		return (
			<div className='container-fluid add-menu-container'>
				<div className='card add-menu-card'>
					<div className='card-title text-center'>
						<h5 className='component-title add-menu-title'>Menüye Ekle</h5>
					</div>
					<div className='card-body'>
						<div className='row'>
							<div className='col-12 text-center'>
								<input
									type='text'
									id='name'
									className='product-name'
									onChange={this.handleChange}
									placeholder='Ürün Adı'
								/>
							</div>
						</div>
						<div className='row'>
							<div className='col-12 text-center'>
								<input
									type='number'
									id='price'
									className='product-price'
									onChange={this.handleChange}
									placeholder='₺'
									min='1'
								/>
							</div>
						</div>
						<div className='row'>
							<div className='col-6'>
								<DropdownButton
									id='dropdown-basic-button'
									title={this.state.buttonName}
								>
									{categories &&
										categories.map((category) => {
											return (
												<Dropdown.Item
													onClick={(e) => {
														this.setState({ cid: category.id });
														this.setState({ buttonName: category.name });
													}}
												>
													{category.name}
												</Dropdown.Item>
											);
										})}
								</DropdownButton>
							</div>

							<div className='col-6'>
								<Link to='/menu' style={{ textDecoration: 'none' }}>
									<button
										className='btn btn add-menu-item-button'
										onClick={this.handleSubmit}
									>
										Kaydet
									</button>
								</Link>
							</div>
						</div>
						<div className='add-menu-error-div text-center'>
							<p className='add-menu-error'>
								{menuError ? <p>Kategori seçmelisin</p> : null}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	console.log('ss', state);
	return {
		auth: state.firebase.auth,
		menuError: state.menu.menuError,
		categories: state.firestore.ordered.categories,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addMenuItem: (product) => dispatch(addMenuItem(product)),
	};
};
export default compose(
	firestoreConnect(() => [
		{ collection: 'categories', orderBy: ['name', 'asc'] },
	]),
	connect(mapStateToProps, mapDispatchToProps)
)(AddMenu);
