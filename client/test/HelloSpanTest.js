/**
 * I would like to implement some tests
 * but I miss time :(
 * Test the testing environement...
 */

import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import HelloSpan from '../src/components/HelloSpan'

describe('HelloSpan', () => {
  it('should say hello world', () => {
    const hello = shallow(<HelloSpan />)
    expect(hello.text()).to.equal('Hello, world!')
  })
})

