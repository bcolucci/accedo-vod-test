/**
 * API tests.
 * I'm sorry! I missed time to finish all the tests.
 * TODO: 1 test missing for the movies (GET /movies/:id)
 * TODO: 1 test to fix for the sessions
 */

import chai from 'chai'
import chaiHTTP from 'chai-http'

import '../src/connectDb'
import createApp from '../src/createApp'

const { API_PORT } = process.env

const should = chai.should()
chai.use(chaiHTTP)

// returns a test application which will listen on :3002
const createTestApp = () => createApp().listen(3002)

describe('API', () => {

  // pre/post processes
  let server = null
  before(() => server = createTestApp())
  after(() => server.close())

  describe('/sessions', () => {

    it('should creates a session and retrieves it', () => chai
      .request(server)
      .post('/sessions')
      .then(({ status, body }) => {
        status.should.eql(200)
        body.should.have.property('_id')
        body.should.have.property('__v')
        body.should.have.property('views')
        body.should.have.property('carousels')
        body.should.have.property('createdAt')
        body.should.have.property('updatedAt')
        const ssid = body._id
        return chai
          .request(server)
          .get(`/sessions/${ssid}`)
          .then(({ status, body }) => {
            status.should.eql(200)
            body._id.should.eq(ssid)
          })
      }))

    it('should pushes views and retrieves them', () => {
      const createSession = () => chai
        .request(server)
        .post('/sessions')
        .then(({ body }) => body._id)
      const retrieveViews = ssid => chai
        .request(server)
        .get(`/sessions/${ssid}/views`)
        .then(({ body }) => body)
      const pushView = (ssid, view) => chai
        .request(server)
        .post(`/sessions/${ssid}/views/${view}`)
      return createSession().then(ssid => {
        return retrieveViews(ssid).then(initialViews => {
          initialViews.should.deep.eq([])
          //TODO why this does not work???
          //return pushView(ssid, 'viewA')
        })
      })
    })

  })

  describe('/movies', () => {

    it('should return movie genres', () => chai
      .request(server)
      .get('/movie_genres')
      .then(({ status, body }) => {
        status.should.eql(200)
        body.should.deep.eq([
          'Action',
          'Adventure',
          'Animation',
          'Comedy',
          'Crime',
          'Documentary',
          'Drama',
          'Family',
          'Fantasy',
          'History',
          'Horror',
          'Music',
          'Mystery',
          'Romance',
          'Science Fiction',
          'TV Movie',
          'Thriller',
          'War',
          'Western',
        ])
      }))

    it('should return the number of matching movies', () => chai
      .request(server)
      .get('/movies?genre=Drama&count=true')
      .then(({ status, body }) => {
        status.should.eql(200)
        should.exist(body.count)
        body.count.should.eq(94)
      }))

    it('should return matching movies', () => chai
      .request(server)
      .get('/movies?genre=Action&filter=title')
      .then(({ status, body }) => {
        status.should.eql(200)
        body.map(m => m.title).should.deep.eq([
          'Alexander',
          'Aliens',
          'American Sniper',
          'Avengers: Age of Ultron',
          'Avengers: Infinity War',
          'Baby Driver',
          'Batman Begins',
          'Batman v Superman: Dawn of Justice',
          'Black Hawk Down',
          'Black Panther',
        ])
      }))

    it('should return matching movies with a cursor and a limit', () => chai
      .request(server)
      .get('/movies?genre=Horror&filter=title&limit=3')
      .then(({ status, body }) => {
        status.should.eql(200)
        const first3Movies = body.map(m => m.title)
        console.log(first3Movies)
        first3Movies.should.deep.eq([
          'Alien',
          'Alien: Covenant',
          'Aliens',
        ])
        return chai
          .request(server)
          .get('/movies?genre=Horror&filter=title&skip=2&limit=5')
          .then(({ body }) => {
            body.map(m => m.title).should.deep.eq([
              'Aliens',
              'Annabelle: Creation',
              'Annihilation',
              'Blade: Trinity',
              'Carrie',
            ])
          })
      }))

  })

})
