import React, {useState} from "react";
import axios from "axios";
import {
    Dialog,
    DialogActions,
    Grid,
    DialogContent,
    Button,
    TextField,
    Slide,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Container,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import TransferList from "../addTranferListTemplate";
import { Link } from "react-router-dom";

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

export default function DuplicateGroupTemplate(props) {
  const classes = useStyles();
  const{permissions, urlPostGroup, selectedRow, open, setOpenGroup, close }= props;
  const [duplicateGroup, setDuplicateGroup] = useState({
    name: "",
    permissions: selectedRow.permissions,
})
  /** ----------------------------------------------------------- Function for group create ---------------------------------------------------------------------- */
  const handleChangePermissionsGroup = (perm)=>{
    let array = [];
    perm && 
    perm.map((d)=>array.push(d.id));
    duplicateGroup.permissions = array;
    setDuplicateGroup({...duplicateGroup})
  };
  const handleModificateGroup =(event)=> {
    if (event.target.name === "name") {
      duplicateGroup.name = event.target.value;
    }
    setDuplicateGroup({...duplicateGroup});
  };
  const handleSaveGroup =async ()=>{
    console.log("postGroupe")
    await axios.post(urlPostGroup, duplicateGroup)
    setOpenGroup(false);
    };
  /** ---------------------------------------------------Fin des functions for group create ---------------------------------------------------------------------- */
  return (
    <div style={{ maxWidth: "100%" }}>
      <Dialog
        fullScreen
        open={open}
        onClose={close}
        TransitionComponent={Transition}
        fullWidth
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <DialogActions>
              <IconButton edge="start" color="inherit" onClick={close} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Modification d'un groupe
              </Typography>
              <Link to="/groups" style={{ textDecoration: "none", color: "white" }}>
                <Button autoFocus color="inherit" onClick={handleSaveGroup} >
                  Sauvegarder le groupe
                </Button>
              </Link>
            </DialogActions>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Container maxWidth="xl">
            < Typography variant="subtitle1" className={classes.title}>
              Modifications du groupe
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="GroupName"
                  name="name"
                  label="Nom du groupe"
                  fullWidth
                  variant="outlined"
                  onChange={(event )=>{handleModificateGroup( event)}}
                />
              </Grid>
              <TransferList
                title="permissions"
                value={permissions}
                onChangeValue={handleChangePermissionsGroup}
                userValue={[]}
              />    
            </Grid>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
}