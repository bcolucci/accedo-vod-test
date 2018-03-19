import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import YouTube from 'react-youtube'
import Stars from 'react-stars'

import './PlayerPopup.css'

/**
 * The movie trailer+info modal wrapper.
 * At the end of the video, it closes itself.
 */
export default class MoviePlayerPopup extends Component {

  constructor(props) {
    super(props)
    this.state = { movie: null }
    this.playerOpts = {
      playerVars: {
        autoplay: true
      }
    }
    this.handleClose = () => this.props.handleClose()
  }

  // another movie to show 
  componentWillReceiveProps({ movie }) {
    this.setState({ movie })
  }

  // renders the footer (movie info)
  _renderFooter() {
    const { movie } = this.state
    const genres = movie.genres.map(g => g.name)
    return (
      <Modal.Footer className='trailer-footer'>
        <h2>{movie.title}</h2>
        {movie.tagline ? <h3 style={{ fontSize: '1em' }}>{movie.tagline}</h3> : null}
        <Stars className='stars' count={10} edit={false} value={movie.vote_average} />
        <hr />
        <ul>
          <li>Language: {movie.original_language}</li>
          {movie.homepage ?
            <li>Homepage: <a href={movie.homepage} target='_blank'>{movie.homepage}</a></li> : null}
          <li>Genres: {genres.join(', ')}</li>
        </ul>
      </Modal.Footer>
    )
  }

  render() {
    const { movie } = this.state
    return !movie ? null : (
      <Modal show={!!movie}
        bsSize='large'
        className='trailer'
        backdrop={true}
        onHide={this.handleClose}>
        <Modal.Body>
          <div className='video-wrapper'>
            <YouTube
              opts={this.playerOpts}
              onEnd={this.handleClose}
              videoId={movie.trailer.key} />
          </div>
        </Modal.Body>
        {this._renderFooter()}
      </Modal>
    )
  }

}
