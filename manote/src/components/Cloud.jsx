import React from 'react';

const Cloud = ({ width, color, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      className={className}
      width={width}
      version="1.1"
      style={{ fill: color, shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRrule: 'evenodd' }}
      viewBox="0 0 14500.84 4760.11"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer" />
        <path d="M13748.63 0c260.77,0 513.09,36.22 752.2,103.86l0 4656.26 -14500.84 0 0 -1059.03c310.27,-164.92 664.25,-258.49 1040.14,-258.49 338.61,0 659.45,75.96 946.58,211.56 251.15,-555.81 810.39,-942.61 1459.95,-942.61 361.63,0 695.23,119.93 963.29,322.13 505.92,-608.09 1268.29,-995.28 2121.16,-995.28 463.95,0 901.04,114.73 1284.74,317.09 392.43,-350.45 910.12,-563.57 1477.65,-563.57 90.33,0 179.36,5.54 266.87,16.02 233.01,-596.28 813.12,-1018.69 1491.92,-1018.69 227.02,0 442.96,47.34 638.62,132.54 505.08,-565.59 1239.76,-921.79 2057.71,-921.79z" />
      </g>
    </svg>
  );
};

export default Cloud;
