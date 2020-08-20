import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { firebaseConnect } from 'react-redux-firebase';
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
		this.setState({
			[e.target.id]: parseFloat(e.target.value) || e.target.value,
		});
	};
	handleSubmit = (e) => {
		this.props.addMenuItem(this.state);
	};
	render() {
		const { auth, categories, menuError, menuSuccess } = this.props;
		if (!auth.uid) {
			return <Redirect to='signin' />;
		}
		return (
			<div className='container-fluid add-menu-container'>
				<div className='card add-menu-card shadow'>
					<div className='card-title text-center'>
						<h5 className='component-title add-expense-title'>Menüye Ekle</h5>
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
										categories.map((category, index) => {
											return (
												<Dropdown.Item
													key={index}
													onClick={(e) => {
														this.setState({ cid: category.key });
														this.setState({ buttonName: category.value.name });
													}}
												>
													{category.value.name}
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
							<p className='add-menu-result'>
								{menuError ? (
									<p className='add-menu-error-text'>Kategori seçmelisin</p>
								) : null}
							</p>
							<p className='add-menu-result'>
								{menuSuccess ? (
									<p className='add-menu-success-text'>
										Ürün başarıyla eklendi
									</p>
								) : null}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		menuError: state.menu.menuError,
		menuSuccess: state.menu.menuSuccess,
		categories: state.firebase.ordered.categories,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addMenuItem: (product) => dispatch(addMenuItem(product)),
	};
};
export default compose(
	firebaseConnect({ path: 'categories', queryParams: ['orderByKey'] }),
	connect(mapStateToProps, mapDispatchToProps)
)(AddMenu);
