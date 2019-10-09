import React from 'react';
import { ProvideAuth, useAuth} from './useAuthentication';
import renderer, { act } from 'react-test-renderer';

function HookWrapper(props) {
	props.hook && props.hook();
	return null;
}

test('Default value without context provided', () => {
	let authProperties = null;
	renderer.create( <HookWrapper hook={() => authProperties = useAuth()} />);
	expect(authProperties.token).toBe(null);
	expect(authProperties.isAuthenticated).toBeInstanceOf(Function);
	expect(authProperties.userDetails).toBe(null);
	expect(authProperties.authenticate).toBeInstanceOf(Function);
	expect(authProperties.unauthenticate).toBeInstanceOf(Function);
});

test('Default value with context provided', () => {
	let authProperties = null;
	renderer.create(
		<ProvideAuth>
			<HookWrapper hook={() => authProperties = useAuth()} />
		</ProvideAuth>
	);
	expect(authProperties.token).toBe(null);
	expect(authProperties.isAuthenticated).toBeInstanceOf(Function);
	expect(authProperties.userDetails).toBe(null);
	expect(authProperties.authenticate).toBeInstanceOf(Function);
	expect(authProperties.unauthenticate).toBeInstanceOf(Function);
});

test('Authenticate', async () => {
	let authProperties = null;
	renderer.create(
		<ProvideAuth>
			<HookWrapper hook={() => authProperties = useAuth()} />
		</ProvideAuth>
	);

	await act( async () => {
		await authProperties.authenticate({
			email: 'email@zrx.com',
			password: 'password',
			staysigned: true
		});
	});
	
	expect(authProperties.token).toBe('qwertyuiopasdfghjkl');
	expect(authProperties.isAuthenticated()).toBe(true);
	expect(authProperties.userDetails.id).toBe(1);
});

test('Unauthenticate', async () => {
	let authProperties = null;
	renderer.create(
		<ProvideAuth>
			<HookWrapper hook={() => authProperties = useAuth()} />
		</ProvideAuth>
	);

	await act( async () => {
		await authProperties.authenticate({
			email: 'email@zrx.com',
			password: 'password',
			staysigned: true
		});
	});

	expect(authProperties.token).toBe('qwertyuiopasdfghjkl');
	expect(authProperties.isAuthenticated()).toBe(true);
	expect(authProperties.userDetails.id).toBe(1);

	await act( async () => {
		await authProperties.unauthenticate();
	});

	expect(authProperties.token).toBe(null);
	expect(authProperties.isAuthenticated()).toBe(false);
	expect(authProperties.userDetails).toBe(null);

});