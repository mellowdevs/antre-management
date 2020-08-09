import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const OrderDetails = (props) => {
	const id = props.match.params.id;
	const { auth } = props;
	if (!auth.uid) {
		return <Redirect to='/signin' />;
	}
	return (
		<div className='container section order-details'>
			<div className='card order-card'>
				<div className='card-body table-card-body'>
					<h5 className='card-title '>
						<div className='row'>
							<div className='col-4 table-name'>Masa {id}</div>
							<div className='col-3 offset-5 table-name'>
								<button className='btn edit-btn'>+</button>
							</div>
						</div>
					</h5>
					<div className='card-text'>
						<ul className='order-details-body list-group'>
							<li className='order-item list-group-item'>
								<div className='row'>
									<div className='col-1 prod-num'>3</div>
									<div className='col-9 prod-name'>Iced Americano</div>
									<div className='col-2 prod-price'>45₺</div>
								</div>
							</li>
							<li className='order-item list-group-item'>
								<div className='row'>
									<div className='col-1 prod-num'>1</div>
									<div className='col-9 prod-name'>Cold Brew</div>
									<div className='col-2 prod-price'>20₺</div>
								</div>
							</li>
							<li className='order-item list-group-item'>
								<div className='row'>
									<div className='col-1 prod-num'>1</div>
									<div className='col-9 prod-name'>Cheesecake</div>
									<div className='col-2 prod-price'>15₺</div>
								</div>
							</li>
						</ul>
						<div className='row'>
							<div className='col-3 '> Tutar: </div>
							<div className='col-3 offset-6 table-price text-center'>80₺</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-6'>
							<button className='btn btn-primary pay-btn'>Ödeme Al</button>
						</div>
						<div className='col-6'>
							<button className='btn btn-primary add-drop-btn'>
								Ekle/Çıkar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
	};
};

export default connect(mapStateToProps)(OrderDetails);
