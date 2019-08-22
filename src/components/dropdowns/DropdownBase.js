import React from 'react'
import { Label, Select } from '@rebass/forms'
import { Box } from 'rebass'

const DropdownBase = ({ placeholder, options, onChange }) => {
  return (
      <Box>
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
                {`Provider: ${text}`}
              </option>
          ))}
        </Select>
      </Box>
  );
}

export default DropdownBase;
