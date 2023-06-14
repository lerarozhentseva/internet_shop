import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";

export default function NewsItem() {
  return (
    <Card sx={{minWidth: 275}}>
      <CardContent>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          2020-07-12 19:20:09
        </Typography>
        <Link to={'/'} style={{color: '#333333'}}><Typography variant="h6" component="div">
          Операционные системы
        </Typography></Link>
        <Typography variant="body2" mt={1}>
          Могут быть классифицированы по базовой технологии, типу лицензии, развивается ли в настоящее время, по
          назначению, а также по множеству других признаков.
        </Typography>
      </CardContent>
    </Card>
  );
}