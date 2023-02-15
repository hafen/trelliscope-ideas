import React, { useState, useMemo, useCallback } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Popper from '@mui/material/Popper';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useLabelContext } from '../../contexts/labelContext';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function ColumnsSelect({ metas, label }) {
  const [tagGroup, setTagGroup] = useState('__ALL__');
  const { labelVars, setLabelVars } = useLabelContext();

  const handleChange = (event, value) => {
    setLabelVars(value);
  };

  const tagGroups = useMemo(() => {
    const tags = {};
    metas.forEach((d) => {
      d.tags.forEach((tag) => {
        if (!tags[tag]) {
          tags[tag] = [];
        }
        tags[tag].push(d.varname);
      });
    });
    return tags;
  }, [metas]);

  const VSPaper = useCallback((props) => {
    return (
      <Paper {...props}>
        <TagSelect
          tagGroups={tagGroups}
          tagGroup={tagGroup}
          setTagGroup={setTagGroup}
        />
        {props.children}
      </Paper>
    );
  });

  const VSPopper = useCallback((props) => {
    return (
      <Popper {...props} style={{ width: 335 }} placement="bottom-start" />
    );
  });

  return (
    <Box sx={{ p: 1, display: 'flex', flexDirection: 'row' }}>
      <Autocomplete
        multiple
        open
        limitTags={0}
        id="variable-select"
        options={metas.map((d) => d.varname)}
        // isOptionEqualToValue={(option, value) => option.varname === value}
        disableCloseOnSelect
        PopperComponent={VSPopper}
        PaperComponent={VSPaper}
        // size="small"
        // getOptionLabel={(option) => option.varname}
        renderOption={(props, option, { selected }) => {
          const hasLabel = option.label && option.label !== option.varname;
          const showOption =
            tagGroup === '__ALL__' || option.tags.includes(tagGroup);
          const optionVal = metas.filter((d) => d.varname === option)[0];
          return (
            <li {...props} style={{ display: showOption ? 'inherit' : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ lineHeight: hasLabel ? '20px' : '36px' }}>
                    {optionVal.varname}
                  </div>
                  {hasLabel && (
                    <div style={{ fontSize: 13, color: '#555555' }}>
                      {optionVal.label}
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        }}
        value={labelVars}
        onChange={handleChange}
        getLimitTagsText={(more) => (
          <span
            style={{ marginLeft: 5, color: '#888888' }}
          >{`${more} selected`}</span>
        )}
        renderInput={(params) => (
          <TextField {...params} label={label} placeholder="" />
        )}
        // renderTags={(params) => {
        //   console.log(params);
        // }}
        fullWidth
      />
    </Box>
  );
}

function TagSelect({ tagGroups, tagGroup, setTagGroup }) {
  const handleChange = (event) => {
    setTagGroup(event.target.value);
  };

  return (
    <Box
      sx={{
        minWidth: 150,
        pl: 2,
        pr: 2,
        pt: 1,
        pb: 1,
        backgroundColor: '#42a5f5',
      }}
    >
      <FormControl variant="standard" size="small" fullWidth>
        <InputLabel sx={{ color: '#FFFFFF' }} id="demo-simple-select-label">
          Variable Type
        </InputLabel>
        <Select
          sx={{ color: '#FFFFFF' }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tagGroup}
          label="Variable Type"
          onChange={handleChange}
        >
          <MenuItem value="__ALL__">All</MenuItem>
          {Object.keys(tagGroups).map((d) => (
            <MenuItem key={d} value={d}>
              {d}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
