import React, { useState, useEffect } from 'react';
import sendWSRequest from '../../services/web-interface';
import Card from '../../components/Card';

import './styles.scss';

export default function Dashboard() {

	const [cards, setCards] = useState([]);

	const getCard = async () => {
		try {
			const response = await sendWSRequest(`/fetch_next_card`);
			setCards(cards.concat(response));
		} catch(error) {
			console.log(error);
		}	
	};

	useEffect(()=> {
		getCard();
	}, []);

	const addNewCard = (card) => {
		setCards(cards.concat(card));
	}

	return (
		<div className="cards-container">
            {cards.map( (card, index) => (
            	<Card key={index} content={card} addNewCard={addNewCard}/>
            ))}
	    </div>
	);
};
