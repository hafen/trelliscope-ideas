import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';

export default function LayoutMenu({ layout, handleLayoutChange }) {
  return (
    <Box
      sx={{
        minWidth: 140,
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Box sx={{ pr: 1, fontSize: 16, lineHeight: '50px' }}>Layout</Box>
      <FormControl size="small" sx={{ pt: 0.5 }}>
        <Select
          labelId="layout-label"
          id="layout"
          value={layout}
          displayEmpty
          inputProps={{
            'aria-label': 'Without label',
            sx: { maxHeight: '1.4375em' },
          }}
          onChange={handleLayoutChange}
          renderValue={(value) =>
            value === 'grid' ? (
              <GridViewIcon fontSize="small" />
            ) : (
              <ListIcon fontSize="small" />
            )
          }
        >
          <MenuItem value="grid">
            <ListItemIcon>
              <GridViewIcon />
            </ListItemIcon>
            <ListItemText>Grid</ListItemText>
          </MenuItem>
          <MenuItem value="table">
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText>Table</ListItemText>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

// import * as React from 'react';
// import { styled, alpha } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import MenuList from '@mui/material/MenuList';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import GridViewIcon from '@mui/icons-material/GridView';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import ListIcon from '@mui/icons-material/List';

// const StyledMenu = styled((props) => (
//   <Menu
//     elevation={0}
//     anchorOrigin={{
//       vertical: 'bottom',
//       horizontal: 'right',
//     }}
//     transformOrigin={{
//       vertical: 'top',
//       horizontal: 'right',
//     }}
//     {...props}
//   />
// ))(({ theme }) => ({
//   '& .MuiPaper-root': {
//     borderRadius: 6,
//     marginTop: theme.spacing(1),
//     width: 115,
//     color:
//       theme.palette.mode === 'light'
//         ? 'rgb(55, 65, 81)'
//         : theme.palette.grey[300],
//     boxShadow:
//       'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//     '& .MuiMenu-list': {
//       padding: '4px 0',
//     },
//     '& .MuiMenuItem-root': {
//       '& .MuiSvgIcon-root': {
//         fontSize: 18,
//         color: theme.palette.text.secondary,
//         marginRight: theme.spacing(1.5),
//       },
//       '&:active': {
//         backgroundColor: alpha(
//           theme.palette.primary.main,
//           theme.palette.action.selectedOpacity
//         ),
//       },
//     },
//   },
// }));

// export default function LayoutMenu() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <Button
//         id="layout-button"
//         aria-controls={open ? 'layout-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         variant="contained"
//         disableElevation
//         onClick={handleClick}
//         endIcon={<KeyboardArrowDownIcon />}
//       >
//         View
//         <GridViewIcon sx={{pl: 1}} />
//       </Button>
//       <StyledMenu
//         id="layout-menu"
//         MenuListProps={{
//           'aria-labelledby': 'layout-button',
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={handleClose} disableRipple>
//           <ListItemIcon>
//             <GridViewIcon />
//           </ListItemIcon>
//           <ListItemText>Grid</ListItemText>
//         </MenuItem>
//         <MenuItem onClick={handleClose} disableRipple>
//           <ListItemIcon>
//             <ListIcon />
//           </ListItemIcon>
//           <ListItemText>Table</ListItemText>
//         </MenuItem>
//       </StyledMenu>
//     </div>
//   );
// }
