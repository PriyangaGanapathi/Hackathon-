import React, { useState, useEffect } from 'react';
import sendWSRequest from '../../services/web-interface';
import Select from 'react-select';
import { useAuth } from '../../context/useAuthentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

export default function Card(props) {

	const [concepts, setConcepts] = useState([]);
	const [cardState, setCardState] = useState('initial');
	const [selectedConcept, setSelectedConcept] = useState();
	const [comments, setComments] = useState('');
	const [id, setId] = useState(null);

	const { contributions, setContributions } = useAuth();

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
				keyword_rw_type: props.content.card_details.keyword_rw_type,
				rel_keyword: props.content.card_details.rel_keyword,
				...feedback,
			}
		}

		let data = {
			type: props.content.card_type,
			feedback: feedback
		}

		if (id) {
			data = {
				id: id,
				...data
			}
		}

		try {
			let response = await sendWSRequest(`/save_feedback`, {
				data: data
			});
			if (state === 'verified' || state === 'updated') {
				setContributions(contributions + 1);
			}
			setCardState(state);
			setId(response.id);
			response.next_card && props.addNewCard(response.next_card);
		} catch(error) {
			console.log(error);
		}
	}

	return (
		<div class="card">
			{ props.content.card_type === 1 &&
				<div class="card-question">Is <span class="tag">{props.content.card_details.keyword}</span> is a type of <span class="tag">{props.content.card_details.real_world_type}</span> ?</div>
			}
			{ props.content.card_type === 2 &&
				<div class="card-question">Is <span class="tag">{props.content.card_details.keyword}</span> is a <span class="tag">{props.content.card_details.rel_type} {props.content.card_details.rel_keyword_rw_type}</span></div>
			}
			{ props.content.card_type === 1 && cardState === 'edit' &&
				<>
				<div class="card-field"> What type do you suggest?</div>
				<Select 
					className="select"
					options={concepts}
					value={selectedConcept} 
					onChange={ selected => setSelectedConcept(selected)}
					styles={{
						option: base => ({
							...base,
							height: '50px',
						}),
					}}/></>
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
						<button class="grey" onClick={ () => { submit('notsure')}}>
							{ id && 
								<FontAwesomeIcon icon={faCheckCircle} />
							}
							<FontAwesomeIcon icon="check-circle" />
							Not Sure
						</button>
						<div class='initial'>
							<button class="green" onClick={ () => { submit('verified')}}>Yes</button>
							<button class="red" onClick={ () => { setCardState('edit')} }>No</button>
						</div>
					</div>
				}
				{ cardState === 'verified' &&
					<div class="verified-status">
						<FontAwesomeIcon icon={faCheckCircle} />
						<div class="status">Verified</div>
					</div>
				}
				{
					cardState === 'edit' && 
					<div class="actions align-right">
						<button class="grey" onClick={ () => { setCardState('initial')} }>Cancel</button>
						<button class="green" onClick={ () => { submit('updated')}}>Suggested</button>
					</div>
				}
				{ cardState === 'updated' && props.content.card_type === 1 &&
					<div>Suggested: {selectedConcept.label} Commented: {comments}</div>
				}
				{ cardState === 'updated' && props.content.card_type === 2 &&
					<div>Suggested : {comments}</div>
				}
			</div>
		</div>
		);	
}