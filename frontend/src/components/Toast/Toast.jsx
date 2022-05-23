import React from 'react';

const Toast = props => {
  return <div className={'toast ' + props.className}>{props.children}</div>;
};

export default Toast;
