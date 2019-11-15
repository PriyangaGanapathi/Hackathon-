import React, { useState, useEffect } from 'react';
import sendWSRequest from '../../services/web-interface';

import './style.scss';
import ConfusionMatrixChart from '../../components/ConfusionMatrixChart';

export default function Analytics() {
    const [concepts, setConcepts] = useState([]);
    const [currentConcept, setCurrentConcept] = useState('');
    const [stats, setStats] = useState({});
    // const [computedMetrics, setComputedMetrics] = useState({})

    // const getComputedMetrics = (stats) => {
    //     let {tp, tn, fp, fn} = stats.confusion_matrix;

    //     let p = tp + fn;
    //     let n = fp + tn;

    //     let accuracy = (tp + tn) / (p + n);
    //     let f1 = (2 * tp) / (2 * tp + fp + fn);
    //     let precision = tp / (tp + fp);
    //     let recall = tp / (tp + fn);

    //     accuracy = Math.round(accuracy * 100) / 100;
    //     f1 = Math.round(f1 * 100) / 100;
    //     precision = Math.round(precision * 100) / 100;
    //     recall = Math.round(recall * 100) / 100;

    //     let computedData = {
    //         f1,
    //         precision,
    //         recall,
    //         accuracy
    //     };
        
    //     setComputedMetrics(computedData);
    // }

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

    const updateCurrentConcept = (concept) => {
        setCurrentConcept(concept);
        getStats();
    }

    useEffect(() => {
        getConcepts();
    }, []);

    

    return (
      <div className="analytics-page">
        <div className="page-header">
            KPI Dashboard
        </div>
        <div className="title">Concepts</div>
        {concepts.map((concept, index) => (
          <div
            className={
              concept === currentConcept
                ? "concept-tile active"
                : "concept-tile"
            }
            onClick={() => updateCurrentConcept(concept)}
          >
            {concept}
          </div>
        ))}
        <div className="stats">
          <div className="title">Stats for {currentConcept}</div>
          <div className="flex-wrapper">
            {stats.confusion_matrix && (
              <div className="chart-container">
                <ConfusionMatrixChart data={stats.confusion_matrix} />
              </div>
            )}
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
            {/* {computedMetrics.f1 && (
                <div className="computed-metrics-container">
                    <div className="computed-table">
                        <div className="computed-row">
                            <div className="computed-column">
                            </div>
                        </div>
                    </div> 
                </div>
            )} */}
          </div>
        </div>
      </div>
    );
}