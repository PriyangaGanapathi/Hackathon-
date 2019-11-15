import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

export default function Dashboard() {
	return (
		<div class='menu-container'>
			<Link className="menu-item" to="/classifications">
				Verify KG Terms and Classifications
			</Link>
			<Link className="menu-item" to="/relationships">
				Verify KG Relationships
			</Link>
			<Link className="menu-item" to="/hierarchy">
				Verify KG Hierarchy
			</Link>
		</div>
	);
}