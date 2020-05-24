import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            this.props.allStocks.map( stock => <Stock stock={stock} purchaseOrSell={this.props.purchaseOrSell} key={stock.id}/>)
          }
      </div>
    );
  }

}

export default PortfolioContainer;
