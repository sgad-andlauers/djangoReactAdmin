import React , {useEffect, useState}from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
  useMediaQuery,
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
  urlGet: "https://dev.geo.sdis67.com/api/v1/public/allUsers"
};
export default function DashBoard(props) {
  const classes = useStyles();
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [apiData, setApiData]= useState(null)
  const [openAddAccount, setOpenAddAccount] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const getAPIData = async () => {
    const res = await axios.get(`${api.urlGet}`);
    setApiData(res.data.data)
  };
  useEffect(() => {
    console.log("getapi");
    getAPIData();
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
    <AddAccountTemplate apiData= {apiData}/>
  );
  return (
    <div>
      {apiData &&
        apiData.map((data) => {
          return (
            <>
              <Button
                onClick={(e) => {
                handleClickSetDialog(e, data);
                }}
              >
                <Paper variant="outlined">
                  <List dense>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>Nom</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={`Nom:  ${data.lastName}  ${data.firstName}`} />
                    </ListItem>
                  </List>
                </Paper>
              </Button>
              <br/>
            </>
          );
      })}
      {selectedRow && (
        <AccountTemplate
          selectedRow={selectedRow}
          open={open}
          onClickClose={handleClose}
          fullScreen={fullScreen}
        />
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