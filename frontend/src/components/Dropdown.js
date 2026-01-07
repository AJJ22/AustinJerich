import * as React from 'react'
import { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
//import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'

export default function Dropdown({ updateStatus, value, required }) {
  return (
    <div>
      <TextField
        select
        label="Status"
        value={value}
        onChange={(e) => updateStatus(e.target.value)}
        className="input-field"
        required={required}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value='10'>Completed</MenuItem>
        <MenuItem value='20'>Reading</MenuItem>
        <MenuItem value='30'>Not Started</MenuItem>
      </TextField>
    </div>
  )
}