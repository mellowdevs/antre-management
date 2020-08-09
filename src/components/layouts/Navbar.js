import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';

const Navbar = (props) => {
	const { auth } = props;

	return (
		<nav className='navbar navbar-expand navbar-light antre-navbar'>
			<div className='container'>
				<div className='navbar-header text-center'>
					<Link to='/' className='navbar-brand'>
						Antre
					</Link>
				</div>

				<div
					className='collapse navbar-collapse justify-content-end'
					id='navbarNav'
				>
					<ul className='navbar-nav text-center'>
						{auth.uid ? <SignedInLinks /> : <SignedOutLinks />}
					</ul>
				</div>
			</div>
		</nav>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
	};
};
export default connect(mapStateToProps)(Navbar);
