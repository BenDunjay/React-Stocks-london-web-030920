import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    searchTerm: "All",
    priceOrSorted: ""
  }

  changeSearchTerm = (event) => {
    const newSearch = event.target.value
    this.setState({
      searchTerm: newSearch
    })
  }

  changePriceOrSorted = (event) => {
    const newSearch = event.target.value
    this.setState({
      priceOrSorted: newSearch
    })
  }

  fetchStocks = () => {
    fetch('http://localhost:3000/stocks')
    .then(response => response.json())
    .then(stocksArray => {
      const newStocksArray = stocksArray.map(stock => {
          stock.purchased = false;
          return stock;
        });
        this.setState({
          stocks: newStocksArray,
        });
    })
  }

  componentDidMount(){
    this.fetchStocks()
  }

  purchaseOrSellStock = (stockId) => {
    const stockChoiceCopy = this.state.stocks.filter(stock => stock.id === stockId)[0]
    stockChoiceCopy.purchased = !stockChoiceCopy.purchased
    const newStockArray = this.state.stocks.map(stock => (stock.id === stockId ? stockChoiceCopy : stock))
    this.setState({
      stocks: newStockArray
    })
  }

  filterStocksBySearch = () => {
    return this.filterStockByPriceOrAlphabet().filter(stock => 
 {     if (this.state.searchTerm === "All"){
        return stock
      }
    else {
      return stock.type === this.state.searchTerm
    }})
  }

  filterStockByPriceOrAlphabet = () => {
    const newlyArrangedStock = [...this.state.stocks]
    if (this.state.priceOrSorted === "Alphabetically"){
      return this.arrangeByName(newlyArrangedStock)
    }
    else if (this.state.priceOrSorted === "Price"){
      return this.arrangeByPrice(newlyArrangedStock)
    }
    else {
      return this.state.stocks
    }
  }

  arrangeByName = (array) => {
    return array.sort((a,b) => a.name > b.name ? 1 : -1)
  }

  arrangeByPrice = (array) => {
    return array.sort((a,b) => a.price > b.price ? 1 : -1)
  }

  availableStocks = () => {
    return this.filterStocksBySearch().filter(stock => stock.purchased === false)
  }

  purchasedStocks = () => {
    return this.filterStocksBySearch().filter(stock => stock.purchased === true)
  }

  render() {
    return (
      <div>
        <SearchBar changeSearchTerm={this.changeSearchTerm} changePriceOrSorted={this.changePriceOrSorted}/>

          <div className="row">
            <div className="col-8">

              <StockContainer allStocks={this.availableStocks()} purchaseOrSell={this.purchaseOrSellStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer allStocks={this.purchasedStocks()}  purchaseOrSell={this.purchaseOrSellStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
