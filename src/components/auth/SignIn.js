import React, { Component } from 'react';
import logo from '../../assets/logo.jpg';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
class SignIn extends Component {
	state = {
		email: '',
		password: '',
	};
	handleChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.signIn(this.state);
		// console.log(this.state);
	};
	render() {
		const { authError, auth } = this.props;
		if (auth.uid) {
			return <Redirect to='/' />;
		}
		return (
			<div className='container'>
				<div className='wrapper fadeInDown login-div'>
					<div id='formContent'>
						<div className='fadeIn first'>
							<img className='signin-logo' src={logo} alt='Antre Giriş' />
						</div>
						<form onSubmit={this.handleSubmit}>
							<input
								type='email'
								id='email'
								className='fadeIn second'
								onChange={this.handleChange}
								placeholder='E-mail'
							/>
							<input
								type='password'
								id='password'
								className='fadeIn third'
								onChange={this.handleChange}
								placeholder='Şifre'
							/>
							<input type='submit' className='fadeIn fourth' value='GİRİŞ' />

							<div className='text-center error-text'>
								{authError ? <p>Bu bilgiler doğru değil, düzgün gir.</p> : null}
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (creds) => {
			dispatch(signIn(creds));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
