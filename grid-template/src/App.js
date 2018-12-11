import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import { AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        columnDefs: [
            {headerName: "Make", field: "make"},
            {headerName: "Model", field: "model"},
            {headerName: "Price", field: "price"}

        ],
        rowData: [
            {make: "Toyota", model: "Celica", price: 35000},
            {make: "Ford", model: "Mondeo", price: 32000},
            {make: "Porsche", model: "Boxter", price: 72000}
        ]
    }
  }

  objectFieldSort(listings1,listings2) {
  var finals = [];
  var keys= listings1;
  var commonKeys=listings2;
  var i;
  var currentKey;
  var currentVal;
  var result = {}
  for (i = 0; i < keys.length; i++) {
      currentKey = commonKeys[i];
      currentVal = keys[i];
      result[currentKey] = currentVal;
      finals.push(result)
  }
  this.setState({rowData: finals})
  }

  columnFunc(listings1) {
    var finals = [];
    for(var i = 0; i < listings1.length; i++) {
      var item = listings1[i];
      while(i < 6) {
      var newObj = {}
      newObj.headerName = item;
      newObj.field = item;
      finals.push(newObj);
    }
  }
    this.setState({columnDefs:finals})
  }




  sortClick() {
    var key;
    var object;
    var property;
    var listings1 = [];
    var listings2 = [];
    var names = ['symbol=AAPL','symbol=MSFT','symbol=V','symbol=TSLA']
    names.map(i => {
      fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&' + i  + '&interval=5min&apikey=PW729TH2CCY2065P')
      .then(response => response.json())
      .then(response => {
        for(property in response) {
          if(property === "Meta Data"){
            for(key in response["Meta Data"]) {
              listings1.push(response["Meta Data"][key]);

            }
            this.columnFunc(listings1)
          }

          if(property === "Time Series (5min)") {
            for(key in response["Time Series (5min)"]) {
            listings2.push(response["Time Series (5min)"][key]);
            }
            this.objectFieldSort(listings1,listings2)
          }
      }
    })
  })
}




  componentWillMount() {
      this.sortClick()
  }


  handleClick = () => {
    this.sortClick();
    }

    render() {
        return (
            <div
                className="ag-theme-balham"
                style={{ height: '600px', width: '1200px' }}
            >
                <AgGridReact
                    enableSorting={true}
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}>
                </AgGridReact>
            <button onClick={this.handleClick}></button>
            </div>
        );
    }
}

export default App;
