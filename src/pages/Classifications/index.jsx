import React, { useState, useEffect } from 'react';
import sendWSRequest from '../../services/web-interface';
import Card from '../../components/Card';

import './styles.scss';

export default function Classifications() {

	const [terms, setTerms] = useState([]);
	const [categories, setCategories] = useState();
	const [currentTerms, setCurrentTerms] = useState([]);

	const getTerms = async (count) => {
		try {
			// const response = await sendWSRequest(`/fetch_terms`, {
			// 	params: {
			// 		term_count: count
			// 	}
			// });
			const response = [
				{"keyword": "herceptin1", "ferma_type": "Generic_drug", "real_world_type": "Generic_drug"
				},
				{"keyword": "herceptin2", "ferma_type": "Generic_drug", "real_world_type": "Generic_drug"
				},
				{"keyword": "herceptin3", "ferma_type": "Generic_drug", "real_world_type": "Generic_drug"
				},
				{"keyword": "herceptin4", "ferma_type": "Generic_drug", "real_world_type": "Generic_drug"
				},
				{"keyword": "herceptin5", "ferma_type": "Generic_drug", "real_world_type": "Generic_drug"
				},
				{"keyword": "herceptin6", "ferma_type": "Generic_drug", "real_world_type": "Generic_drug"
				},
				{"keyword": "herceptin7", "ferma_type": "Generic_drug", "real_world_type": "Generic_drug"
				},
				{"keyword": "herceptin8", "ferma_type": "Generic_drug", "real_world_type": "Generic_drug"
				},
				{"keyword": "herceptin9", "ferma_type": "Generic_drug", "real_world_type": "Generic_drug"
				}
			];
			setCurrentTerms(response.splice(0,5));
			setTerms(response);
		} catch(error) {
			console.log(error);
		}	
	};


	const getCategories = async () => {
		try {
			const response = await sendWSRequest(`/fetch_categories`);
			updateCategories(response);
		} catch(error) {
			console.log(error);
		}
	};

	const updateCategories = (categories) => {
		const formatedData = categories.map( categorie => {
			return {
				value: categorie,
				label: categorie
			}
		});
		setCategories(formatedData);
	};

	useEffect(()=> {
		getTerms(5);
		getCategories();
	}, []);

	const onRemoveCard = (keyword) => {
		const newCurrentTerms = currentTerms.filter( term => term.keyword !== keyword);
		if (terms.length) {
			setCurrentTerms([...newCurrentTerms, terms[0]]);
			const newTerms = terms.filter( (term, index) => index !== 0);
			setTerms(newTerms);
		} else {
			setCurrentTerms(newCurrentTerms);
		}	
	}

	return (
		<div className="terms-list">
            {currentTerms.map(term => (
            	<Card key={term.keyword} type="classifications" content={term} options={categories} removeCard={onRemoveCard}/>
            ))}
	    </div>
	);
};
