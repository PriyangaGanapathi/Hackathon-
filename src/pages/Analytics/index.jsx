import React, { useState, useEffect } from 'react';
import sendWSRequest from '../../services/web-interface';

import './style.scss';
import ConfusionMatrixChart from '../../components/ConfusionMatrixChart';

export default function Analytics() {
    const [concepts, setConcepts] = useState([]);
    const [currentConcept, setCurrentConcept] = useState('');
    const [stats, setStats] = useState({});

    const getStats = async () => {
        try {
            const response = await sendWSRequest(`/analytics?concept=${currentConcept}`);
            setStats(response);            
        } catch (error) {
            console.log(error);
        }
    }

    const getConcepts = async () => {
        try {
            const response = await sendWSRequest(`/fetch_concepts`);
            setConcepts(response);
            setCurrentConcept(response[0]);
            getStats();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getConcepts();
    }, []);

    return (
      <div className="analytics-page">
        <div className="page-header">KIP Dashboard</div>
        <div className="title">Concepts</div>
        {concepts.map((concept, index) => (
          <div
            className={
              concept === currentConcept
                ? "concept-tile active"
                : "concept-tile"
            }
            onClick={() => setCurrentConcept(concept)}
          >
            {concept}
          </div>
        ))}
        <div className="stats">
          <div className="title">{currentConcept}</div>
          {stats.overall_stats && (
            <div className="overall-stats-tile">
              <div className="row total-row">
                <div className="tile-header">Total</div>
                <div className="tile-count total-count">
                  {stats.overall_stats.total}
                </div>
              </div>
              <div className="row splits-row">
                <div className="column">
                  <div className="tile-header">Approved</div>
                  <div className="tile-count">
                    {stats.overall_stats.approved}
                  </div>
                </div>
                <div className="column">
                  <div className="tile-header">Suggested</div>
                  <div className="tile-count">
                    {stats.overall_stats.suggestions}
                  </div>
                </div>
                <div className="column">
                  <div className="tile-header">Skipped</div>
                  <div className="tile-count">
                    {stats.overall_stats.skipped}
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    );
}