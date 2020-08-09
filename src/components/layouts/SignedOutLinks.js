import React from 'react';
import { Link } from 'react-router-dom';

export default function SignedOutLinks() {
	return (
		<ul className='navbar-nav text-center navbar-right'>
			<li className='nav-item'>
				<Link to='/signin' className='nav-link  nav-text' href='#'>
					Giriş
				</Link>
			</li>
		</ul>
	);
}
