import React from 'react'

import CarouselContainer from './movies/CarouselContainer'

// the container will show only 2 carousels, but feel free to add.
const genresToShow = [
  'Action',
  'Western',
]

export default () => <CarouselContainer genres={genresToShow} />
