import React from 'react';
import {Box, Paper, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import theme from "../../../../theme/theme";

const PaperComponent = ({title, text, href, linkText, sx}) => {
  return (
    <Paper sx={{width: '580px', height: '250px', alignSelf: 'end', ...sx}}>
      <Box sx={{m: '50px 60px'}}>
        <Typography variant={'h5'}>{title}</Typography>
        <Typography variant={'body1'}>{text}</Typography>
        <Link to={href} style={{color: '#1a1a3d'}}>
          <Typography
            variant="body1"
            sx={{
              mt: 1,
              color: theme.palette.primary.main,
              '&:visited': {
                color: 'red',
              },
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {linkText}
          </Typography>
        </Link>
      </Box>
    </Paper>
  );
};

export default PaperComponent;