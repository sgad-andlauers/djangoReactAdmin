import React from "react";
import {
  Dialog,
  Grid,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Modal
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 90 + rand();
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
}));
export default function DialogTable(props) {
  const { selectedRow, open, onClickClose, fullScreen } = props;
  console.warn("selectrow", selectedRow);
  const [openModal, setOpenModal] = React.useState(false);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [identity, setIdentity] = React.useState([{
    id: selectedRow.id,
    firstName: "",
    lastName: "",
    email: "",
  }]);
  const [password, setPassword] = React.useState([{
    id: selectedRow.id,
    oldPassword: "",
    password: "",
  }])

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleChangePasswords = (event) => {
    if (event.target.name === "oldPassword") {
      setPassword({oldPassword: event.target.value});
    } else {
      setPassword({password: event.target.value});
    }
  };
  const handleChangeIdentity = (index, event) => {
    const values = [...identity];
    if (event.target.name === "firstName") {
      values[index].firstName = event.target.value;
    } else if(event.target.name === "lastName") {
      values[index].lastName = event.target.value;
    }else{
      values[index].email= event.target.value;
    }

    setIdentity(values);
  };
  console.warn("Identity", identity);
  console.warn("password", password);
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <TextField
            id="PWD"
            name="oldPassword"
            label="Ancien mot de passe"
            variant="outlined"
            onChange={(index, event )=>{handleChangePasswords(index, event)}}
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
            onChange={(index, event )=>{handleChangePasswords(index, event)}}
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
      <Button autoFocus color="primary">
        Sauvegarder
      </Button>
    </div>
  );
  return (
    <div style={{ maxWidth: "100%" }}>
      {selectedRow && (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={onClickClose}
          aria-labelledby="responsive-dialog-title"
          size="xl"
          fullWidth
          maxWidth="xl"
        >
          <DialogTitle id="responsive-dialog-title">
            {`profil && id:  ${selectedRow.id}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="firstName"
                    name="fistName"
                    label="Prénom"
                    fullWidth
                    variant="outlined"
                    onChange={(index, event )=>{handleChangeIdentity(index, event)}}
                    value={selectedRow.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="Nom"
                    variant="outlined"
                    onChange={(index, event )=>{handleChangeIdentity(index, event)}}
                    value={selectedRow.lastName}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="eMail"
                    name="eMail"
                    label="Email"
                    variant="outlined"
                    onChange={(index, event )=>{handleChangeIdentity(index, event)}}
                    value={selectedRow.email}
                    fullWidth
                  />
                </Grid>
                <button type="button" onClick={handleOpen}>
                  changer de Mot de passe
                </button>
                <Modal
                  open={openModal}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {body}
                </Modal>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={onClickClose} color="primary">
              Close
            </Button>
            <Button autoFocus color="primary">
              Sauvegarder
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
