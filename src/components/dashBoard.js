import React , {useEffect, useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AccountTemplate from './Template/accountTemplate';
import AddAccountTemplate from './Template/addAccountTemplate';
import axios from "axios";
import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Paper,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const api = {
  urlGetUser: "https://dev.geo.sdis67.com/api/v1/public/allUsers",
  urlGetCities: "https://dev.geo.sdis67.com/api/v1/app/erp/cities"
};
export default function DashBoard(props) {
  const classes = useStyles();
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [apiData, setApiData]= useState(null);
  const [cities, setCities]= useState(null);
  const [openAddAccount, setOpenAddAccount] = React.useState(false);
  const getAPIData = async () => {
    const res = await axios.get(`${api.urlGetUser}`);
    setApiData(res.data.data)
  };
  useEffect(() => {
    console.log("getapi");
    getAPIData();
  }, []);
  const getCities = async () => {
    const res = await axios.get(`${api.urlGetCities}`);
    setCities(res.data.data.cities);
  }
  useEffect(() => {
    console.log("getCities");
    getCities();
  }, []);
  console.warn("apirequest", apiData);
  const handleClickSetDialog = (e, data) => {
    setOpen(true);
    setSelectedRow(data);
  };
  const handleClickOpenAddAccount = () => {
    setOpenAddAccount(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenAddAccount(false);
  };
  const addAcount = (
    <AddAccountTemplate apiData= {apiData} city={cities}/>
  );
  return (
    <div>
      {apiData &&
        apiData.map((data) => {
          return (
            <div key={data.id}>
              <Button
                onClick={(e) => {
                handleClickSetDialog(e, data);
                }}
              >
                <Paper variant="outlined">
                  <List dense>
                    <ListItem >
                      <ListItemAvatar>
                        <Avatar>Nom</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={`Nom:  ${data.lastName}  ${data.firstName}`} />
                    </ListItem>
                  </List>
                </Paper>
              </Button>
              <br/>
            </div>
          );
      })}
      {selectedRow && (
        <div>
          <AccountTemplate
            selectedRow={selectedRow}
            open={open}
            onClickClose={handleClose}
            city={cities}

          />
        </div>
      )}
      <Button variant="outlined" color="primary" onClick={handleClickOpenAddAccount}>
        Ajouter un profil
      </Button>
      <Dialog fullScreen open={openAddAccount} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        {addAcount}
      </Dialog>
      
    </div>
  );
}