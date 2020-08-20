import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	updateMenuItem,
	deleteMenuItem,
} from '../../store/actions/menuActions';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';
class UpdateMenuItem extends Component {
	state = {
		id: '',
		cid: '',
		item: undefined,
	};
	handleChange = (e) => {
		this.state[e.target.id] = parseFloat(e.target.value) || e.target.value;
	};
	handleUpdate = (e) => {
		this.props.updateMenuItem(this.state);
	};
	handleDelete = (e) => {
		this.props.deleteMenuItem(this.state);
	};
	componentDidUpdate() {
		const database = firebase.database();
	}
	componentDidMount() {
		const database = firebase.database();

		const cid = this.props.match.params.cid;
		const id = this.props.match.params.id;
		database
			.ref(`categories/${cid}/items/${id}`)
			.once('value')
			.then((snapshot) => {
				let item = {};
				if (snapshot && snapshot.val()) {
					item = snapshot.val();
					this.setState({ id: id, cid: cid, ...item });
				}
			});
	}
	render() {
		const { auth } = this.props;
		const item = this.state.item;
		if (!auth.uid) {
			return <Redirect to='/signin' />;
		}
		console.log('item', item);
		return (
			<div className='container-fluid update-menu-container'>
				<div className='card add-product-card shadow'>
					<div className='card-title text-center'>
						<h5 className='component-title menu-update-title'>Menü Güncelle</h5>
					</div>
					<div className='card-body'>
						<div className='row'>
							<div className='col-8 menu-input'>
								<input
									type='text'
									id='name'
									className='product-name'
									placeholder='Ürün Adı'
									onChange={this.handleChange}
									defaultValue={this.state.name}
									min='1'
								/>
							</div>
							<div className='col-3  menu-input'>
								<input
									type='number'
									id='price'
									className='product-price'
									placeholder='Satış Fiyatı'
									onChange={this.handleChange}
									defaultValue={this.state.price}
									min='1'
								/>
							</div>
						</div>
						<div className='row'>
							<div className='col-4 offset-4 update-menu-col text-center'>
								<Link to='/menu' style={{ textDecoration: 'none' }}>
									<button
										className='btn btn-danger update-menu-btn'
										onClick={this.handleDelete}
									>
										Kaldır
									</button>
								</Link>
							</div>
							<div className='col-4 update-menu-col '>
								<Link to='/menu' style={{ textDecoration: 'none' }}>
									<button
										className='btn btn-success update-menu-btn'
										onClick={this.handleUpdate}
									>
										Güncelle
									</button>
								</Link>
							</div>
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateMenuItem: (item) => dispatch(updateMenuItem(item)),
		deleteMenuItem: (item) => dispatch(deleteMenuItem(item)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateMenuItem);
