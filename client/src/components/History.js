import React, { Component } from 'react'
import { Grid, Row, Col, Image, Button } from 'react-bootstrap'
import uuid from 'uuid/v1'
import * as Session from '../utils/session'

/**
 * The views history page.
 */
export default class History extends Component {

  constructor(props) {
    super(props)
    this.state = {
      movies: []
    }
  }

  async componentDidMount() {
    // loads history views (ids) and one by one, fetch video posters.
    (await (await Session.request('views')).json()).reduce((acc, id) => acc
      .then(() => fetch(`${API_URL}/movies/${id}?filter=_id,title,poster_path`))
      .then(response => response.json())
      .then(m => this.setState({ movies: [...this.state.movies, m] }))
      , Promise.resolve())
  }

  // renders a view history item with the movie title+poster
  _renderMovie(movie) {
    return (
      <Row key={uuid()} className='show-grid'>
        <Col xs={2}>
          <p>{movie.title}</p>
        </Col>
        <Col xs={2}>
          <Image src={movie.poster_path} thumbnail responsive />
        </Col>
      </Row>
    )
  }

  // handle when the user clear the session
  _handleClearSession() {
    Session.remove()
    location.reload()
  }

  render() {
    const { movies } = this.state
    return (
      <div className='container'>
        <h1>History</h1>
        <p>
          (first is the last viewed)
          {' '}
          <Button className='btn btn-danger'
            onClick={this._handleClearSession.bind(this)}>
            Clear session
          </Button>
        </p>
        <hr />
        {!movies.length ? <p>No history yet.</p>
          : movies.map(this._renderMovie.bind(this))}
      </div>
    )
  }

} 
