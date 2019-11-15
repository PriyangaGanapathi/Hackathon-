import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuth } from '../../context/useAuthentication.js';

import './styles.scss';

export default function Login() {

	const { authenticate } = useAuth();

	const validate = values => {
		const errors = {};
		if (!values.email) {
			errors.email = 'Required';
		} else if(!values.password) {
			errors.password = 'Required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
			errors.email = 'Invalid email address';
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
		<div>
    		<h1>FERMA.AI</h1>
		    <Formik
		    	initialValues={{ email: '', password: '' }}
				validate={ validate }
				onSubmit={ onSubmit }
			>
				{({ isSubmitting }) => (
					<Form>
						<Field className="form__input" placeholder="Username" type="email" name="email" />
						<ErrorMessage className="form__error-msg" name="email" component="div" />
						<Field className="form__input" placeholder="Password" type="password" name="password" />
						<ErrorMessage className="form__error-msg" name="password" component="div" />
						<button className="form__button" type="submit" disabled={isSubmitting}>
							Login
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}