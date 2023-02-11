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
import { TagSelect } from '../sidebar/VariableMultiSelect';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function VariableSelect({ metas, handleSelect, nSortVars }) {
  const [tagGroup, setTagGroup] = useState('__ALL__');
  const [open, setOpen] = useState(true);

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
      <Popper
        {...props}
        // style={{ paddingLeft: 100, width: 500 }}
        // placement="bottom-start"
      />
    );
  });

  return (
    <Box sx={{ p: 1, display: 'flex', flexDirection: 'row' }}>
      <Autocomplete
        open
        id="variable-select"
        options={metas}
        // isOptionEqualToValue={(option, value) => option.varname === value}
        disableCloseOnSelect
        PopperComponent={VSPopper}
        PaperComponent={VSPaper}
        // size="small"
        getOptionLabel={(option) => option.varname}
        renderOption={(props, option, { selected }) => {
          const hasLabel = option.label && option.label !== option.varname;
          const showOption =
            tagGroup === '__ALL__' || option.tags.includes(tagGroup);
          return (
            <li {...props} style={{ display: showOption ? 'inherit' : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ lineHeight: hasLabel ? '20px' : '36px' }}>
                    {option.varname}
                  </div>
                  {hasLabel && (
                    <div style={{ fontSize: 13, color: '#555555' }}>
                      {option.label}
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        }}
        onChange={handleSelect}
        renderInput={(params) => (
          <TextField
            autoFocus
            {...params}
            label={`Search or select ${
              nSortVars === 0 ? 'variable' : 'more variables'
            } to sort on`}
            placeholder=""
          />
        )}
        // renderTags={(params) => {
        //   console.log(params);
        // }}
        fullWidth
      />
    </Box>
  );
}
