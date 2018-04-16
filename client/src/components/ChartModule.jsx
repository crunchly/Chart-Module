import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

class ChartModule extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.fetchData()
      .then((data) => {
        this.chart = new Chart(this.ref.current, {
          type: 'bar',
          data: {
            labels: data.map(funding => funding._id.funding_round_type),
            datasets: [{
              data: data.map(funding => funding.totalAmt),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            }],
          },
          options: {
            title: {
              display: true,
              text: 'Funding Rounds by Money Raised',
            },
            legend: {
              display: false,
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                },
              }],
            },
          },
        });
      });
  }

  fetchData() {
    const url = `/funding-rounds/${this.props.company}`;
    return fetch(url)
      .then(response => response.json());
  }

  render() {
    return <canvas ref={this.ref} />;
  }
}

ChartModule.propTypes = {
  company: PropTypes.string.isRequired,
};

export default ChartModule;
