import * as React from 'react'
import { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
//import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

export default function Dropdown({ lable, updateFieldValue, value, required, dropdownItems }) {
  return (
    <Box
      sx={{ '& .MuiTextField-root': { m: 2, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          select
          label={lable}
          value={value}
          onChange={(e) => updateFieldValue(e.target.value)}
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
    </Box>
  )
}