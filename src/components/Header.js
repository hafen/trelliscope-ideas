import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Typography from '@mui/material/Typography';
import LayoutMenu from './LayoutMenu';
import { useDisplayListContext } from '../contexts/displayListContext';

export default function Header() {
  const {
    displayList,
    unselectedDisplays,
    selectedDisplayObject,
    selectedDisplay,
    setSelectedDisplay,
  } = useDisplayListContext();

  return (
    <>
      {displayList.length > 1 && (
        <div>
          <SelectDisplayMenu
            unselectedDisplays={unselectedDisplays}
            setSelectedDisplay={setSelectedDisplay}
          />
        </div>
      )}
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        {selectedDisplayObject.description}
      </Typography>
      <LayoutMenu />
    </>
  );
}

function SelectDisplayMenu({ unselectedDisplays, setSelectedDisplay }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (val) => {
    setSelectedDisplay(val);
    handleClose();
  };

  return (
    <div>
      <IconButton
        id="display-select-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="large"
      >
        <KeyboardArrowDownIcon />
      </IconButton>
      <Menu
        id="display-select-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'display-select-button',
        }}
      >
        <div
          style={{
            fontWeight: 600,
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 5,
          }}
        >
          Select a different display
        </div>
        {unselectedDisplays.map((d) => (
          <MenuItem key={d.name} onClick={() => handleSelect(d.name)}>
            <div>
              <div>{d.name}</div>
              <div style={{ fontStyle: 'italic', fontSize: 14 }}>
                {d.description}
              </div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
