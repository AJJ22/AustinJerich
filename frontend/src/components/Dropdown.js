import MenuItem from '@mui/material/MenuItem'
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
          
          {dropdownItems
            .map(item => (
              <MenuItem value={item}>{item}</MenuItem>
            ))
          }
        </TextField>
      </div>
    </Box>
  )
}