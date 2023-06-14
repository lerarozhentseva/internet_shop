import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from "./route/components/AppRouter";
import {ThemeProvider} from "@mui/material";
import theme from "./theme/theme";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
// import {check} from "./http/userAPI";
import CircularProgress from '@mui/material/CircularProgress';

const App = observer(() => {
  // const {user} = useContext(Context);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //     check().then(data => {
  //       user.setUser(data);
  //       user.setIsAuth(true)
  //     }).finally(() => setLoading(false))
  // }, [])
  //
  // if (loading) return <CircularProgress/>

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppRouter/>
      </Router>
    </ThemeProvider>
  );
})

export default App;
