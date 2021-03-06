import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

const formatTypes = function formatTypeTextIntoDisplayText(type) {
  const map = {
    angel: 'Angel',
    venture: 'Venture',
    'series-a': 'Series A',
    'series-b': 'Series B',
    'series-c+': 'Series C+',
    other: 'Other',
  };
  return map[type];
};

const chartIcon = (
  <div className="chart-module__icon">
    <svg viewBox="0 0 20 20">
      <path d="M17.78,0H2.22A2.23,2.23,0,0,0,0,2.22V17.78A2.23,2.23,0,0,0,2.22,20H17.78A2.23,2.23,0,0,0,20,17.78V2.22A2.23,2.23,0,0,0,17.78,0Zm0,17.78H15.56V4.44H13.33V17.78H11.11V9H8.89v8.82H6.67V12.35H4.44v5.43H2.22V2.22H17.78Z" />
    </svg>
  </div>
);

class ChartModule extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();

    this.state = {
      hidden: false,
    };
  }

  componentDidMount() {
    this.fetchData()
      .then((data) => {
        this.chart = new Chart(this.ref.current, {
          type: 'bar',
          data: {
            labels: data.map(funding => formatTypes(funding._id.funding_round_type)),
            datasets: [{
              data: data.map(funding => funding.totalAmt),
              backgroundColor: 'rgba(0, 46, 77, 0.5)',
              borderColor: 'rgba(0, 46, 77, 1)',
              borderWidth: 1,
            }],
          },
          options: {
            title: {
              display: true,
              text: 'Funding Rounds by Money Raised',
              fontStyle: 'normal',
            },
            legend: {
              display: false,
            },
            scales: {
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Funding Type',
                },
                ticks: {
                  fontColor: 'rgba(153, 153, 153, 1)',
                },
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Money Raised in USD',
                },
                ticks: {
                  callback: function tickCallback(value) {
                    return value === 0 ? '0' : `${(value / 1000000)}M`;
                  },
                  fontColor: 'rgba(153, 153, 153, 1)',
                },
              }],
            },
            layout: {
              padding: {
                left: 16,
                right: 16,
                top: 0,
                bottom: 8,
              },
            },
            tooltips: {
              callbacks: {
                label: function tipCallback(tooltipItem, barData) {
                  let label = barData.datasets[tooltipItem.datasetIndex].label || '';
                  if (label) {
                    label += ': ';
                  }

                  let numText;
                  if (tooltipItem.yLabel >= 100000000) {
                    numText = Math.round(tooltipItem.yLabel / 1000000);
                  } else {
                    numText = Math.round(tooltipItem.yLabel / 100000) / 10;
                  }

                  label += `Money Raised in USD: ${numText}M`;
                  return label;
                },
              },
            },
          },
        });
      });
  }

  fetchData() {
    const url = `funding-rounds/${this.props.company}`;
    return fetch(url)
      .then(response => response.json());
  }

  handleClick() {
    this.setState({ hidden: !this.state.hidden });
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.setState({ hidden: !this.state.hidden });
    }
  }

  render() {
    return (
      <div className="chart-module">
        <div className="chart-module__title">
          {chartIcon}Which funding rounds raised the most money?
          <div
            className="chart-module__btn"
            onClick={() => this.handleClick()}
            onKeyDown={e => this.handleKeyDown(e)}
            role="button"
            tabIndex="0"
          >
            {this.state.hidden ? 'SHOW' : 'HIDE'}
          </div>
        </div>
        <div className={this.state.hidden ? 'chart-module__canvas-wrap--hidden' : ''}>
          <canvas ref={this.ref} />
        </div>
      </div>
    );
  }
}

ChartModule.propTypes = {
  company: PropTypes.string.isRequired,
};

export default ChartModule;
