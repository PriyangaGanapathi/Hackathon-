import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuth } from '../../context/useAuthentication.js';

import './styles.scss';

export default function Login() {

	const { authenticate } = useAuth();

	const validate = values => {
		const errors = {};
		if (!values.username) {
			errors.username = 'Required';
		} else if(!values.password) {
			errors.password = 'Required';
		}
		return errors;
	}

	const onSubmit = (values, { setSubmitting }) => {
		authenticate(values).then( response => {
			setSubmitting(false);
		}).catch( error => {
			alert('error');
		})
	}

	return (
		<div className='login'>    		
			<div className='login-container'>
				<h1>FERMA.AI</h1>
				<Formik
					initialValues={{ username: '', password: '' }}
					validate={ validate }
					onSubmit={ onSubmit }
				>
					{({ isSubmitting }) => (
						<Form>
							<Field className="form__input" placeholder="Username" type="text" name="username" />
							<ErrorMessage className="form__error-msg" name="username" component="div" />
							<Field className="form__input" placeholder="Password" type="password" name="password" />
							<ErrorMessage className="form__error-msg" name="password" component="div" />
							<button className="form__button" type="submit" disabled={isSubmitting}>
								Login
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}