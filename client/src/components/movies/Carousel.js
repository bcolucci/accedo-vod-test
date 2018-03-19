import React, { Component } from 'react'
import { Image } from 'react-bootstrap'
import Carousel from 'nuka-carousel'
import { stringify } from 'querystring'
import uuid from 'uuid/v1'
import classNames from 'classnames'

import './Carousel.css'

import Session from '../../utils/session'

import {
  navEmitter,
  NavUp, NavDown,
  NavEnter, NavLeft, NavRight
} from '../../utils/navKeyEmitter'

import PlayerPopup from './PlayerPopup'

/**
 * Slider wrapper.
 * Maintains the current index and allow
 * to navigate with arrows + open the trailer video with Enter.
 */
export default class MovieCarousel extends Component {

  constructor(props) {
    super(props)

    const defaultCarouselOpts = {
      framePadding: '0px 0px',
      dragging: false,
      cellSpacing: 0,
      cellPadding: 0,
      slidesToScroll: 1,
      slidesToShow: 1
    }

    this.state = {
      movies: [],
      totalMovies: 0,
      slideIndex: 0,
      selectedMovie: null,
      options: defaultCarouselOpts,
      ...props
    }

    this.resizeSteps = [500, 900, 1200, 1600]

    this.navKeyListener = this._handleNavKey.bind(this)
    this.resizeListener = this._updateSlidesToShow.bind(this)

    this.reloadCtx = null
  }

  // trick because of a "first-draw" bug with the carousel lib
  _redrawCarousel() {
    clearTimeout(this.reloadCtx)
    this.reloadCtx = setTimeout(this.forceUpdate.bind(this), 100)
  }

  // returns how many slides to show based on the window width
  _slidesToShow() {
    return this.resizeSteps
      .reduce((acc, step) => window.innerWidth >= step ? acc + 1 : acc, 1)
  }

  // updates movies array if necessary (check the slice)
  _updateMoviesWithSlice(slice) {
    const movies = this.state.movies.slice()
    if (slice.length < 1) {
      return movies
    }
    const lastIdx = movies.findIndex(m => m._id === slice[0]._id)
    if (lastIdx === -1) {
      return [...movies, ...slice]
    }
    return [...movies, ...slice.slice(lastIdx)]
  }

  // updates the carousel options
  // makes some lazy loading if necessary
  //TODO can be improved, too many things...
  async _updateSlidesToShow() {
    const options = { ...this.state.options }
    options.slidesToShow = this._slidesToShow()
    const howMore = options.slidesToShow - this.state.options.slidesToShow
    if (howMore > 0) {
      // we have to show more than expected after the window width changed
      const slice = await this._retrieveNextMoviesSlice(this.state.movies.length, howMore)
      const movies = this._updateMoviesWithSlice(slice)
      this.setState({ options, movies })
    } else {
      this.setState({ options })
    }
    this._redrawCarousel()
  }

  async _retrieveTotalMovies() {
    const response = await fetch(`${API_URL}/${this.props.src}?genre=${this.props.genre}&count=true`)
    const { count } = await response.json()
    return count
  }

  async _retrieveNextMoviesSlice(skip, limit) {
    const qs = stringify({ genre: this.props.genre, skip, limit })
    const response = await fetch(`${API_URL}/${this.props.src}?${qs}`)
    return await response.json()
  }

  async _initFirstState() {

    // retrieves the previous slideIndex
    //TODO there is a bug somewhere with this...
    const prevState = await (await Session.request(`carousels/carousel-${this.props.genre}`)).json()
    const slideIndex = (prevState || {}).slideIndex || 0

    const slidesToShow = this._slidesToShow()
    const movies = await this._retrieveNextMoviesSlice(0, slidesToShow + slideIndex)
    const totalMovies = await this._retrieveTotalMovies()

    this.setState({
      movies,
      totalMovies,
      slideIndex,
      options: {
        ...this.state.options,
        slidesToShow
      }
    })
  }

  async _slideTo(key) {
    const { movies, totalMovies, slideIndex, options } = this.state
    const nextState = {
      slideIndex: key === NavRight ?
        Math.min(totalMovies - 1, slideIndex + 1)
        : Math.max(0, slideIndex - 1)
    }
    // here we save the current state (slideIndex)
    Session.push(`carousels/carousel-${this.props.genre}/${nextState.slideIndex}`)
    const nidx = nextState.slideIndex + options.slidesToShow - 1
    if (!movies[nidx]) {
      // lazy loading here also
      const slice = await this._retrieveNextMoviesSlice(nidx, options.slidesToShow)
      nextState.movies = this._updateMoviesWithSlice(slice)
    }
    this.setState(nextState)
  }

  // handle when a 
  async _handleNavKey(key) {
    if (!this.state.active) {
      // this carousel is not the one which
      // is currently active in the container
      return
    }
    if (key === NavUp || key === NavDown) {
      // maybe moving to another carousel
      //TODO maybe related to a bug
    }
    if (key === NavEnter) {
      // we want to open the trailer video + movie info
      const movie = this.state.movies[this.state.slideIndex]
      movie && this._handleView(movie)
    } else {
      // move to the left/right
      this._slideTo(key)
    }
  }

  // here we open the movie trailer+info modal
  async _handleView(movie) {
    this.setState({ selectedMovie: movie })
    await Session.push(`views/${movie._id}`)
  }

  // handle when the user clicks on the slider prev/next buttons
  _handleAfterSlide(nextIndex) {
    const { slideIndex } = this.state
    if (nextIndex !== slideIndex) {
      this._slideTo(nextIndex > slideIndex ? NavRight : NavLeft)
    }
  }

  // render all thumbs
  _renderThumbs() {
    const { movies, totalMovies, slideIndex } = this.state
    let idx = 0
    const thumbs = []
    for (idx; idx < totalMovies; idx += 1) {
      const movie = movies[idx]
      const src = movie ? movie.poster_path : '#'
      thumbs.push(
        <Image
          key={uuid()}
          onClick={() => this._handleView(movie)}
          className={`carousel-thumb ${idx === slideIndex ? 'carousel-thumb-active' : ''}`}
          src={src} />
      )
    }
    return thumbs
  }

  // the container says if this carousel is active or not 
  componentWillReceiveProps({ active }) {
    this.setState({ active })
  }

  // cleaning...
  componentWillUnmount() {
    clearTimeout(this.reloadCtx)
    navEmitter.removeListener('NavKey', this.navKeyListener)
    window.removeEventListener('resize', this.resizeListener)
  }

  async componentDidMount() {

    await this._initFirstState()
    this._redrawCarousel()

    navEmitter.addListener('NavKey', this.navKeyListener)
    window.addEventListener('resize', this.resizeListener)
  }

  render() {
    const { movies, active, options, index, slideIndex } = this.state
    const handleAfterSlide = this._handleAfterSlide.bind(this)
    const handleClose = () => this.setState({ selectedMovie: null })
    return !movies.length ? null : (
      <div className={classNames({
        'carousel-container': true,
        'carousel-container-active': active
      })}>
        <div className='carousel-title'>
          <h2>{this.props.genre}</h2>
        </div>
        <PlayerPopup
          handleClose={handleClose}
          movie={this.state.selectedMovie} />
        <Carousel {...options}
          slideIndex={slideIndex}
          afterSlide={handleAfterSlide}>
          {this._renderThumbs()}
        </Carousel>
      </div>
    )
  }


}
