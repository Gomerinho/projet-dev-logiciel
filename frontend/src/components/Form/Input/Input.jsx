import React from 'react';

const Input = ({ type, value, name, onChange }) => {
  return <input type={type} value={value} name={name} onChange={onChange} />;
};

export default Input;
