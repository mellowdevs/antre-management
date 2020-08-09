import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

const SignedInLinks = (props) => {
	return (
		<ul className='navbar-nav text-center'>
			<li className='nav-item'>
				<Link to='/create' className='nav-link' href='#'>
					<button type='button' className='btn btn-create' id='newOrder'>
						+
					</button>
				</Link>
			</li>
			<li className='nav-item'>
				<Link to='/menu' className='nav-link nav-text' href='#'>
					Menu
				</Link>
			</li>
			<li className='nav-item'>
				<Link to='/warehouse' className='nav-link nav-text' href='#'>
					Depo
				</Link>
			</li>
			<li className='nav-item'>
				<Link to='/expenses' className='nav-link  nav-text' href='#'>
					Masraf
				</Link>
			</li>
			<li className='nav-item'>
				<a onClick={props.signOut} className='nav-link  nav-text' href='#'>
					Çıkış
				</a>
			</li>
		</ul>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => {
			dispatch(signOut());
		},
	};
};
export default connect(null, mapDispatchToProps)(SignedInLinks);
