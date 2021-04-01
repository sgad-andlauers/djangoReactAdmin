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
import GroupTemplate from './Template/groupTemplate';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import Box from '@material-ui/core/Box';

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
  urlGetCities: "https://dev.geo.sdis67.com/api/v1/app/erp/cities",
  urlGroup: "https://dev.geo.sdis67.com/api/v1/public/group",
  urlGetPermissions: "https://dev.geo.sdis67.com/api/v1/public/permissions",
};
export default function DashBoard(props) {
  const classes = useStyles();
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAccount, setOpenAccount] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);
  const [apiData, setApiData]= useState(null);
  const [cities, setCities]= useState(null);
  const [apiDataGroup, setApiDataGroup] = useState(null);
  const [apiDataPermissions, setApiDataPermissions]= useState(null);
  const [openAddAccount, setOpenAddAccount] = React.useState(false);
  const [inseeCode, setInseeCode] = useState(null);
  const [profils, setProfils] = React.useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    registrationNumber: "",
    cities: [],
    password: null,
    company: "",
    territorialUnity: "",
  });
  const [createGroup, setCreateGroup] = useState({
    Name: "",
    permissions:[],

  })
  const [permissionGroup, setPermissionGroup]= useState(null);

/** -------------------------------------------------- Questionnement de l'Api ------------------------------------------------------------ */
  const getAPIData = async () => {
    const res = await axios.get(`${api.urlGetUser}`);
    setApiData(res.data.data)
  };
  useEffect(() => {
    console.log("getApiUser");
    getAPIData();
  }, []);
  const getApiCities = async () => {
    const res = await axios.get(`${api.urlGetCities}`);
    setCities(res.data.data.cities);
  }
  useEffect(() => {
    console.log("getApiCities");
    getApiCities();
  }, []);
  const getAPIDataGroup = async () => {
    const res = await axios.get(`${api.urlGroup}`);
    setApiDataGroup(res.data.data)
  };
  useEffect(() => {
    console.log("getApiDataGroup");
    getAPIDataGroup();
  }, []);
  const getAPIDataPermissions = async () => {
    const res = await axios.get(`${api.urlGetPermissions}`);
    setApiDataPermissions(res.data.data)
  };
  useEffect(() => {
    console.log("getApiDataPermissions");
    getAPIDataPermissions();
  }, []);
console.log("permission", apiDataPermissions);
  /** -------------------------------------------------- Fin du questionnement de l'Api ------------------------------------------------------------ */
  /** -------------------------------------------------- Function pour le template addAcount ------------------------------------------------------------ */

  const handleClickSetDialog = (e, data) => {
    setOpenAccount(true);
    setSelectedRow(data);
    
  };
  const handleClickOpenAddAccount = () => {
    setOpenAddAccount(true);
  };
  const handleClose = () => {
    setOpenAccount(false);
    setOpenAddAccount(false);
    setOpenGroup(false);
  };
 
  const handleChangeProfils = ( event) => {
    if(event.target.name === "username") {
      profils.username = event.target.value;
    }else if (event.target.name === "firstName"){
      profils.firstName = event.target.value;
    }else if(event.target.name === "lastName") {
      profils.lastName = event.target.value;
    }else if(event.target.name === "email"){
      profils.email= event.target.value;
    }else if (event.target.name === "registrationNumber"){
      profils.registrationNumber = event.target.value;
    }else if (event.target.name === "password"){
      profils.password = event.target.value;
    }else if (event.target.name === "company"){
      profils.company = event.target.value;
    }else if (event.target.name === "territorialUnity"){
      profils.territorialUnity = event.target.value;
    }
    setProfils(profils);
  };
  
  const handleChangeCities =(event, value, reason) => {
      let city = value;
    setInseeCode(city);

  }
  useEffect(() => {
    console.log("getCitiesInProfils");
    let array = [];
    inseeCode && 
    inseeCode.map((d)=>array.push(d.inseeCode));
    console.log("arrayInseeCode", array);
    profils.cities= array;
    setProfils(profils);
   
  }, [inseeCode, profils]);
  const addAcount = (
    <AddAccountTemplate 
      city={cities} 
      changeProfils={handleChangeProfils} 
      changeCities={handleChangeCities}
      permissions={apiDataPermissions}
      group={apiDataGroup}
    />
  );
  const postAccount = async ()=> {
    console.log("postAccount")

    await axios.post('https://dev.geo.sdis67.com/api/v1/public/user', profils).then(res => {
      console.log(res);})
  }
  /** -------------------------------------------------- Fin des functions pour le template addAcount ------------------------------------------------------------ */
  /** ----------------------------------------------------------- Function for group create ---------------------------------------------------------------------- */
  const handleClickSetDialogGroup = ()=> {
    setOpenGroup(true);

  };
  const handleChangePermissionsGroup = (event, value, reason)=>{
    let permissions = value;
    setPermissionGroup(permissions);

  };
  useEffect(() => {
    console.log("getPermissionGroup");
    let array = [];
    permissionGroup && 
    permissionGroup.map((d)=>array.push(d.id));
    createGroup.permissions = array;
    setCreateGroup(createGroup);
   
  }, [permissionGroup, createGroup]);

  const handleChangeGroup =(event)=> {
    if (event.target.name === "Name") {
      createGroup.Name = event.target.value;
    }
    setCreateGroup(createGroup);
  };
const handleSubmitGroup =async ()=>{
  console.log("postGroupe")

    await axios.post('https://dev.geo.sdis67.com/api/v1/public/group', createGroup).then(res => {
      console.log(res);})
};
  /** ---------------------------------------------------Fin des functions for group create ---------------------------------------------------------------------- */
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
            open={openAccount}
            onClickClose={handleClose}
            city={cities}
            setOpen={setOpenAccount}
            permissions={apiDataPermissions}
            group={apiDataGroup}
          />
        </div>
      )}
      <Box display="flex">
        <Box mt={5} mb={5}>
          <Button variant="outlined" color="primary" onClick={handleClickSetDialogGroup}>
          Creation de groupe
          </Button>
        </Box>
          <GroupTemplate
            open={openGroup}
            onClickClose={handleClose}
            permissions={apiDataPermissions}
            onChangeGroupe = {handleChangeGroup}
            onChangePermissionsGroup={handleChangePermissionsGroup}
            onSubmitGroup={handleSubmitGroup}
          />
        <Box ml={5} mt={5}>
          <Button variant="outlined" color="primary" onClick={handleClickOpenAddAccount}>
            Ajouter un profil
          </Button>
        </Box>
        <Dialog fullScreen open={openAddAccount} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Ajout d'un profil
              </Typography>
              <Button autoFocus color="inherit" onClick={postAccount} edge="endpoint">
                Sauvegarder
              </Button>
            </Toolbar>
          </AppBar>
          {addAcount}
        </Dialog>
      </Box>
    </div>
  );
}