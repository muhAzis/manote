import React from 'react';
import '../styles/CustomLogo.css';

const CustomLogo = ({ width = '93.4708mm', color = 'white', fontSize = '2rem', close, closed = false }) => {
  return (
    <div id="customLogo">
      <svg
        onClick={() => close && close(false)}
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width={width}
        version="1.1"
        style={{ cursor: close && 'pointer', fill: color, shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRrule: 'evenodd' }}
        viewBox="0 0 8781.54 8781.54"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g id="Layer_x0020_1">
          <metadata id="CorelCorpID_0Corel-Layer" />
          <path
            className="fil0"
            d="M8781.54 1503.19l0 5775.16c0,826.76 -676.44,1503.19 -1503.19,1503.19l-1544.76 0c0,-1816.98 -711.45,-2560.73 -1344.51,-3222.54 -328.39,-343.29 -624.2,-652.54 -624.2,-1168.23 0,-515.7 295.81,-824.94 624.2,-1168.23 633.06,-661.81 1344.51,-1405.56 1344.51,-3222.54l1544.76 0c826.76,0 1503.19,676.44 1503.19,1503.19zm-4457.19 7278.35l-2821.16 0c-826.76,0 -1503.19,-676.44 -1503.19,-1503.19l0 -5775.16c0,-826.76 676.44,-1503.19 1503.19,-1503.19l2821.16 0c0,1262.46 -501.72,1786.96 -948.16,2253.67 -536.9,561.27 -1020.56,1066.87 -1020.56,2137.1 0,1070.22 483.64,1575.82 1020.56,2137.1 446.44,466.71 948.16,991.21 948.16,2253.67z"
          />
        </g>
      </svg>
      <h3 className={closed ? 'closed' : ''} style={{ fontSize }}>
        Manote
      </h3>
    </div>
  );
};

export default CustomLogo;
