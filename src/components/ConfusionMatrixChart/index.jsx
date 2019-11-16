import React, { useEffect, useRef } from 'react';

import './style.scss';

export default function ConfusionMatrixChart({data}) {
    const calculateAlpha = (value) => {
        let percentage = value / (data.tp + data.tn + data.fp + data.fn);
        if (percentage > 0) {
            return `rgba(255,99,71,${percentage.toFixed(2)})`;
        } else {
            return `rgba(255,99,71,0)`;
        }
    }    

    return (
      <div class="chart">
        <div class="chart-row">
          <div className="chart-header"></div>
          <div className="chart-header">P</div>
          <div className="chart-header">N</div>
        </div>
        <div class="chart-row">
          <div className="chart-header">T</div>
          <div
            style={{ background: calculateAlpha(data.tp) }}
            class="chart-column"
          >
            {data.tp}
          </div>
          <div
            style={{ background: calculateAlpha(data.tn) }}
            class="chart-column"
          >
            {data.tn}
          </div>
        </div>
        <div class="chart-row">
          <div className="chart-header">F</div>
          <div
            style={{ background: calculateAlpha(data.fp) }}
            class="chart-column"
          >
            {data.fp}
          </div>
          <div
            style={{ background: calculateAlpha(data.fn) }}
            class="chart-column"
          >
            {data.fn}
          </div>
        </div>
      </div>
    );
}