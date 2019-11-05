import { useState } from 'react';

export default function useLocalStorage(key, initialValue = null) {

	const [storedValue, setStoredValue] = useState(() => {
    	try {
    		const item = window.localStorage.getItem(key);
    		return item ? JSON.parse(item) : initialValue;
	    } catch (error) {
			console.log(error);
			return initialValue;
		}
	});

	const setValue = (value = null) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.log(error);
		}
	};

	const removeStorage = () => {
		setValue(); // clear value
		window.localStorage.removeItem(key); // Remove storage
	};

	return [storedValue, setValue, removeStorage];
}