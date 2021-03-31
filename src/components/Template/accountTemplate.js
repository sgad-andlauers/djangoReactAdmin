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
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
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
  const { selectedRow, open, city , onClickClose} = props;
  const [openModal, setOpenModal] = React.useState(false);
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
  };
  const handleChangePasswords = (event) => {
    if (event.target.name === "oldPassword") {
      password.oldPassword = event.target.value;
      
    } else {
      password.password = event.target.value;
      
    }
    setPassword(password);
  };
  const handleChangeIdentity = ( event, value, reason) => {
    
    if(event.target.name === "firstName") {
      identity.firstName = event.target.value;
    } else if(event.target.name === "lastName") {
      identity.lastName = event.target.value;
    }else if(event.target.name === "email"){
      identity.email= event.target.value;
    }else if (event.target.name === "registrationNumber"){
      identity.registrationNumber = event.target.value;
    }else if (event.target.name === "cities"){
      console.log(value)
      identity.cities = value
    }
    setIdentity(identity);
  };
  console.warn("identity", identity)
  const putPasswordsApi = ()=>{

  };
  const putIdentityApi = ()=>{
  
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
              <Button autoFocus color="inherit" onClick={putIdentityApi}>
                Sauvegarder
              </Button>
            </DialogActions>
          </Toolbar>
        </AppBar>

          <DialogContent>
            <Container maxWidth="xl">
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
                    name="eMail"
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
                    onChange={(event, value, reason)=>{handleChangeIdentity(event, value, reason)}}
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
            </Container>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
