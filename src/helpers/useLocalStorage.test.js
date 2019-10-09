import React from 'react';
import useLocalStorage from './useLocalStorage';
import renderer, { act } from 'react-test-renderer';

function HookWrapper(props) {
	props.hook && props.hook();
	return null;
}

test('Default value should be set null', () => {
	let storedValue = null, setValue = null;
	renderer.create(<HookWrapper hook={() => [storedValue, setValue] = useLocalStorage('testName')} />);
	expect(storedValue).toBe(null);
});

test('Initialize value', () => {
	let storedValue = null, setValue = null;
	renderer.create(<HookWrapper hook={() => [storedValue, setValue] = useLocalStorage('testName', 'John Doe')} />);
	expect(storedValue).toBe('John Doe');
});

test('Update value', () => {
	let storedValue = null, setValue = null;
	renderer.create(<HookWrapper hook={() => [storedValue, setValue] = useLocalStorage('testName', 'John Doe')} />);
	act(() => {
		setValue('Zoomrx');
	});
	expect(storedValue).toBe('Zoomrx');
});