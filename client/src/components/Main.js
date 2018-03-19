import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import Explore from './Explore'
import History from './History'

class Main extends Component {

  componentDidMount() {
    // first time on the application, we need to push the
    // default page (so we have the navbar link activated)
    if (!location.hash) {
      this.props.history.push('/#explore')
    }
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Explore} />
          <Route path='/explore' component={Explore} />
          <Route path='/history' component={History} />
        </Switch>
      </main>
    )
  }

}

export default withRouter(Main)
