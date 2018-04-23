import React from 'react';
import ReactDOM from 'react-dom';
import ChartModule from './components/ChartModule';

const renderToId = (id) => {
  ReactDOM.render(<ChartModule company="Facebook" />, document.getElementById(id));
};

renderToId('app');

module.exports = renderToId;
