import React from 'react'
import { Label, Select } from '@rebass/forms'
import { Box } from 'rebass'

const DropdownBase = ({ placeholder, options, onChange }) => {
  return (
      <Box>
        <Label htmlFor='country'>Web3 Provider</Label>
        <Select
            id='providers'
            name='providers'
            defaultValue={placeholder}
            onChange={(e) => onChange(e.target.value)}
        >
           {options.map(({ key, value, text }) => (
              <option
                  key={key}
                  value={value}>
                {text}
              </option>
          ))}
        </Select>
      </Box>
  );
}

export default DropdownBase;
