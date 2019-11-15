import React, { useState, useEffect } from 'react';
import sendWSRequest from '../../services/web-interface';
import Select from 'react-select';

import './styles.scss';

export default function Card(props) {

	const [edit, setEdit] = useState(false);
	const [comments, setComments] = useState(null);
	const [selectedCategorie, setSelectedCategorie] = useState(null);

	const onSkip = () => {
		const data = {
			type: 1,
			keyword: props.content.keyword, 
			status: 0,
			keyword_rw_type:"",
			comment:'',
		};
		submitData(data);
	}

	const onApprove = () => {
		const data = {
			type: 1,
			keyword: props.content.keyword, 
			status: 1,
			keyword_rw_type:"",
			comment:'',
		};
		submitData(data);
	}
	const onUpdate = () => {
		const data = {
			type: 1,
			keyword: props.content.keyword, 
			status: 2,
			keyword_rw_type: selectedCategorie.label,
			comment: comments
		};
		submitData(data);
	}

	const submitData = async (content) => {
		try {
			await sendWSRequest('/save_feedback', {
				data: content
			});
			props.removeCard(props.content.keyword);
		} catch(error) {
			alert(error);
		}
		
	}


	return (
		<div class="card">
			<div class="title">{props.content.keyword}</div>
        		<div class="info">
        			<div class="ferma">{props.content.ferma_type}</div>
        			{ props.type == 'classifications' && edit ? ( 
        				<div>
							<Select options={props.options} value={selectedCategorie} onChange={ selected => setSelectedCategorie(selected)} />
						</div>
						) : (
						<div>
							<div class="real">{props.content.real_world_type}</div>
						</div>
						)
					}
        		</div>
        		{ edit ? (
        			<div>
	        			<input
	                            type='text'
	                            name='Comments'
	                            placeholder='Comments'
	                            value={comments}
	                            onChange={(e) => setComments(e.target.value)}
	                        />
        			</div>
        		):(<></>)}
			<div class="actions">
				<button onClick={onSkip}>
					skip
				</button>
				{ !edit ? (
					<div>
						<button onClick={onApprove}>
							yes
						</button>
						<button onClick={() => setEdit(true)}>
							no
						</button>
					</div>
				) : (
					<button onClick={onUpdate}>
						update
					</button>
				)
				}
			</div>
		</div>
		);
}