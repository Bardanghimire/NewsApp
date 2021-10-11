
import './App.css';
import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pagesize = 8
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }
  apiKey = process.env.REACT_API_KEY
  render() {
    return (
      <div>
        <Router>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={2.5}
          />
          <Navbar />
          <Switch>
            <Route exact key="Home" path="/">
              <News apiKey={this.apiKey} setProgress={this.setProgress} pagesize={this.pagesize} country="in" category="general" />
            </Route>
            <Route exact key="general" path="/General">
              <News apiKey={this.apiKey} setProgress={this.setProgress} pagesize={this.pagesize} country="in" category="general" />
            </Route>
            <Route exact key="health" path="/Health">
              <News apiKey={this.apiKey} setProgress={this.setProgress} pagesize={this.pagesize} country="in" category="health" />
            </Route>
            <Route exact key="Business" path="/Business">
              <News apiKey={this.apiKey} setProgress={this.setProgress} pagesize={this.pagesize} country="in" category="Business" />
            </Route>
            <Route exact key="Entertainment" path="/Entertainment">
              <News apiKey={this.apiKey} setProgress={this.setProgress} pagesize={this.pagesize} country="in" category="Entertainment" />
            </Route>
            <Route exact key="Science" path="/Science">
              <News apiKey={this.apiKey} setProgress={this.setProgress} pagesize={this.pagesize} country="in" category="Science" />
            </Route>
            <Route exact key="Sports" path="/Sports">
              <News apiKey={this.apiKey} setProgress={this.setProgress} pagesize={this.pagesize} country="in" category="Sports" />
            </Route>
            <Route exact key="Technology" path="/Technology">
              <News apiKey={this.apiKey} setProgress={this.setProgress} pagesize={this.pagesize} country="in" category="Technology" />
            </Route>

          </Switch>
        </Router>
      </div>
    )
  }
}

