import React from 'react'
import { render, screen } from '@testing-library/react'
import Dropdown from '../Dropdown'

test('renders Dropdown with Status label', () => {
  const mockUpdate = jest.fn()
  render(<Dropdown updateStatus={mockUpdate} value={''} required={false} />)

  // Check that the Status label appears (MUI TextField creates multiple Status elements)
  const labelElements = screen.getAllByText(/Status/i)
  expect(labelElements.length).toBeGreaterThan(0)
})
