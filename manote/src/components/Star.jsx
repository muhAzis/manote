import React from 'react';

const Star = ({ width, color = 'white', className }) => {
  return (
    <svg className={className} width={width} viewBox="0 0 67 67" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34 0.00012207C33.9976 0.165283 33.9963 0.330688 33.9963 0.496399C33.9963 0.330627 33.9951 0.165161 33.9927 0L34 0.00012207ZM33.9927 66.9928C33.9951 66.9928 33.9976 66.9927 34 66.9927C34.2668 48.8911 48.8909 34.267 66.9926 34.0001L66.9927 33.9927C48.7233 33.7234 33.9963 18.8298 33.9963 0.496399C33.9963 18.9979 18.9979 33.9964 0.496338 33.9964C0.330566 33.9964 0.165161 33.9952 0 33.9928C0 33.9952 0.00012207 33.9976 0.00012207 34C0.165283 33.9976 0.330688 33.9964 0.496338 33.9964C18.8297 33.9964 33.7234 48.7234 33.9927 66.9928Z"
        fill="#D9D9D9"
      />
    </svg>
  );
};

export default Star;