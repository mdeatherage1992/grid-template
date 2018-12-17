import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Reactable from 'reactable';
import Tr from 'reactable';

class App extends Component {
  constructor() {
    super();
    this.state = {
      rawData:[],
      content:[],
      name:[],
      count: 0
    }
  }

  sortData(x) {
    var key;
    var finalData = [];
    var finalHeader = [];
    for(key in x) {
      if(key === "Meta Data") {
        finalHeader.push(x[key])
        this.setState({name:finalHeader})
      }
      if(key === "Time Series Weekly") {
        finalData.push(x[key])
        this.setState({content:finalData})
      }

    }
  }

  objSort(obj) {
    var key;
    var finals = [];
    for(key in obj) {
      finals.push(obj[key])
    }
    console.log(finals)
    return finals;
  }
componentWillMount() {
  var key;
  fetch("https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=MSFT&apikey=PW729TH2CCY2065P")
  .then(response => response.json())
  .then(response => {
  this.setState({rawData:response})
  this.setState({name:this.objSort(response["Meta Data"])})
  this.setState({content:this.objSort(response["Weekly Time Series"])})
  })
}

render() {
  var key;
  const listItems = this.state.name.map((name,index) => {
    for(key in name) { return (
      <div className={index}>
    <th key={index}>{name[key]}</th>
    <br />
    </div>
  )}
})
const listRows = this.state.content.map((name,index) => {
  for(key in name) {
  return (
  <div className={index}>
  <td key={index}>{name[key]}</td>
  <br />
  </div>
  )}
})
  return (
    <div className="outer-wall">
    <table>
    <thead>
    <tr>{listItems}</tr>
    <tr>{listRows}</tr>
    </thead>
    </table>
      </div>
    )
  }
}

export default App;
