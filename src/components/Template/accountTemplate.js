import React from "react";
import {
  Dialog,
  DialogActions,
  Grid,
  DialogContent,
  Button,
  TextField,
  Modal,
  Slide,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Container
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
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

export default function DialogTable(props) {
  const { selectedRow, open, city , onClickClose, setOpen, permissions, group } = props;
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalDelete, setOpenModalDelete] = React.useState(false);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [identity, setIdentity] = React.useState({
    id: selectedRow.id,
    firstName: selectedRow.firstName,
    lastName: selectedRow.lastName,
    email: selectedRow.email,
    registrationNumber: selectedRow.registrationNumber,
    cities: selectedRow.cities,
  });
  const [password, setPassword] = React.useState({
    id: selectedRow.id,
    oldPassword:null ,
    password: null,
  })

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setOpenModalDelete(false);
  };
  const handleChangePasswords = (event) => {
    if (event.target.name === "oldPassword") {
      password.oldPassword = event.target.value;
      
    } else {
      password.password = event.target.value;
      
    }
    setPassword(password);
  };
  const handleChangeIdentity = ( event) => {
    if(event.target.name === "firstName") {
      identity.firstName = event.target.value;
    } else if(event.target.name === "lastName") {
      identity.lastName = event.target.value;
    }else if(event.target.name === "email"){
      identity.email= event.target.value;
    }else if (event.target.name === "registrationNumber"){
      identity.registrationNumber = event.target.value;
    }
    setIdentity(identity);
  };
  const handleChangeCities =(event, value, reason) => {
    identity.cities = value;
    setIdentity(identity);

  }
  const putPasswordsApi = async ()=>{
    console.log("putPassword")
    await axios.put('https://dev.geo.sdis67.com/api/v1/public/user', password);
    setOpenModal(false)
  };
  const putIdentityApi = async ()=>{
    console.log("putIdentity")
     await axios.put('https://dev.geo.sdis67.com/api/v1/public/user', identity);
     setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <TextField
            id="PWD"
            name="oldPassword"
            label="Ancien mot de passe"
            variant="outlined"
            onChange={(event )=>{handleChangePasswords(event)}}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            id="PWD1"
            name="password"
            label="changer de mot de passe"
            variant="outlined"
            onChange={( event )=>{handleChangePasswords(event)}}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            id="PWD2"
            name="PWD2"
            label="confirme nouveau mot de passe"
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
      </Grid>
      <Button autoFocus color="primary" onClick={putPasswordsApi}>
        Sauvegarder
      </Button>
    </div>
  );
 const handleDeleteProfile = ()=> {
   setOpenModalDelete(true);
 };
 const deleteProfile = async ()=> { 
  alert("profil supprimé !!");
  setOpenModalDelete(false);
  setOpen(false);
};
 const bodyDelete = (
    <div style={modalStyle} className={classes.paper}>
      <p>Attention voulez vous vraiment supprimer ce compte ?</p>
      <Button autoFocus color="primary" onClick={deleteProfile}>
        Suppression
      </Button>
    </div>
  );
  
  return (
    <div style={{ maxWidth: "100%" }}>
      {selectedRow && (
        <Dialog
          fullScreen
          open={open}
          onClose={onClickClose}
          TransitionComponent={Transition}
          fullWidth
        >
          <AppBar className={classes.appBar}>
          <Toolbar>
            <DialogActions>
              <IconButton edge="start" color="inherit" onClick={onClickClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6"gutterBottom className={classes.title}>Modifier un profil</Typography>
              <Button autoFocus color="inherit" onClick={putIdentityApi}>
                Sauvegarder
              </Button>
              <IconButton  color="inherit" onClick={handleDeleteProfile} aria-label="delete">
                <DeleteForeverOutlinedIcon />
              </IconButton>
            </DialogActions>
          </Toolbar>
        </AppBar>

          <DialogContent>
            <Container maxWidth="xl">
              <Typography variant="h6"gutterBottom>Informations personnelles</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="firstName"
                    name="firstName"
                    label="Prénom"
                    fullWidth
                    variant="outlined"
                    defaultValue={selectedRow.firstName}
                    onChange={(event )=>{handleChangeIdentity( event)}}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="Nom"
                    variant="outlined"
                    defaultValue={selectedRow.lastName}
                    onChange={( event )=>{handleChangeIdentity(event)}}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="eMail"
                    name="email"
                    label="Email"
                    variant="outlined"
                    defaultValue={selectedRow.email}
                    onChange={( event )=>{handleChangeIdentity( event)}}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="average"
                    name="average"
                    label="Moyenne"
                    fullWidth
                    variant="outlined"
                    defaultValue={selectedRow.average}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="registrationNumber"
                    name="registrationNumber"
                    label="Matricule"
                    variant="outlined"
                    defaultValue={selectedRow.registrationNumber}
                    onChange={( event )=>{handleChangeIdentity(event)}}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    id="cities"
                    name="cities"
                    options={city}
                    getOptionLabel={(option) => option.name}
                    defaultValue={selectedRow.cities[0] &&[selectedRow.cities[0]]}
                    onChange={(event, value, reason)=>{handleChangeCities(event, value, reason)}}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Villes"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <button type="button" onClick={handleOpen}>
                    changer de Mot de passe
                  </button>
                </Grid>
              </Grid>
              <Modal
                  open={openModal}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {body}
                </Modal>
                <Modal
                  open={openModalDelete}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {bodyDelete}
                </Modal>
            </Container>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
