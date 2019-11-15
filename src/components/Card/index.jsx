import React, { useState, useEffect } from 'react';
import sendWSRequest from '../../services/web-interface';
import Select from 'react-select';

import './styles.scss';

export default function Card(props) {

	const [concepts, setConcepts] = useState([]);
	const [cardState, setCardState] = useState('initial');
	const [selectedConcept, setSelectedConcept] = useState();
	const [comments, setComments] = useState('');
	const [id, setId] = useState(null);

	const getConcepts = async () => {
		try {
			let response = await sendWSRequest(`/fetch_concepts`);
			response = response.map( concept => {
				return {
					value: concept,
					label: concept
				}
			});
			setConcepts(response);
		} catch(error) {
			console.log(error);
		}
	}

	useEffect(()=> {
		if (props.content.card_type === 1) {
			getConcepts();
		}
	}, []);

	const submit = async (state) => {
		setCardState(state);
		let feedback = {
			status: state === 'notsure' ? 0 : ( state === 'verified' ? 1: 2), 
			keyword: props.content.card_details.keyword,
			comment: comments
		};
		if (props.content.card_type === 1) {
			feedback = {
				keyword_rw_type: state === 'edit' ? selectedConcept.label : props.content.card_details.real_world_type,
				...feedback,
			}
		} else {
			feedback = {
				rel_keyword: props.content.card_details.rel_keyword,
				...feedback,
			}
		}
		if (id) {
			feedback = {
				id: id,
				...feedback,
			}
		}
		let data = {
			type: props.content.card_type,
			feedback: feedback
		}

		try {
			let response = await sendWSRequest(`/save_feedback`, {
				data: data
			});
			setId(response.id);
			response.next_card && props.addNewCard(response.next_card);
		} catch(error) {
			console.log(error);
		}
	}

	return (
		<div class="card">
			{ props.content.card_type === 1 &&
				<div class="card-question">Is {props.content.card_details.keyword} is a type of {props.content.card_details.real_world_type} ?</div>
			}
			{ props.content.card_type === 2 &&
				<div class="card-question">Is {props.content.card_details.keyword} is a {props.content.card_details.rel_type} {props.content.card_details.rel_keyword_rw_type}</div>
			}
			{ props.content.card_type === 1 && cardState === 'edit' &&
				<>
				<div class="card-question"> What type do you suggest</div>
				<Select 
					className="select"
					options={concepts}
					value={selectedConcept} 
					onChange={ selected => setSelectedConcept(selected)}/></>
			}
			{
				cardState === 'edit' && 
				<input class="input"
						type="text" 
						placeholder="Comments" 
						value={comments} 
						onChange={(e) => setComments(e.target.value)}
				/>
			}
			<div>
				{ (cardState === 'initial' || cardState === 'notsure') &&
					<div class="actions">
						<button onClick={ () => { submit('notsure')}}>Not Sure</button>
						<div>
							<button onClick={ () => { submit('verified')}}>Yes</button>
							<button onClick={ () => { setCardState('edit')} }>No</button>
						</div>
					</div>
				}
				{ cardState === 'verified' &&
					<div class="actions">Verified</div>
				}
				{
					cardState === 'edit' && 
					<div class="actions">
						<button onClick={ () => { setCardState('initial')} }>Cancel</button>
						<button onClick={ () => { submit('updated')}}>Suggested</button>
					</div>
				}
				{ (cardState === 'updated') &&
					<div>Suggested: {selectedConcept.label} Commented: {comments}</div>
				}
			</div>
		</div>
		);	
}