import React, { Component } from 'react'
import uuid from 'uuid/v1'

import {
  navEmitter,
  NavUp, NavDown
} from '../../utils/navKeyEmitter'

import Carousel from './Carousel'

/**
 * Contains 1 or more carousels.
 * Maintains the active carousel index.
 * Allow to move between carousels with Up/Down arrows.
 */
export default class MovieCarouselContainer extends Component {

  constructor(props) {
    super(props)
    this.state = { active: 0 }
    this.navKeyListener = this._handleNav.bind(this)
  }

  // handle the Up/Dow key events
  // may change the current active carousel.
  _handleNav(key) {
    const { active } = this.state
    if (key === NavUp && active > 0) {
      this.setState({ active: active - 1 })
    } else if (key === NavDown && active < this.props.genres.length - 1) {
      this.setState({ active: active + 1 })
    }
  }

  // cleaning...
  componentWillUnmount() {
    navEmitter.removeListener('NavKey', this.navKeyListener)
  }

  componentDidMount() {
    navEmitter.addListener('NavKey', this.navKeyListener)
  }

  render() {
    return (
      <div>
        {this.props.genres.map((genre, idx) => (
          <Carousel
            key={uuid()}
            src='movies/'
            genre={genre}
            active={this.state.active === idx} />
        ))}
      </div>
    )
  }

}
