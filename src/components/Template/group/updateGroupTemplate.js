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
  import DuplicateGroupTemplate from "./duplicateGroupTemplate";
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

export default function UpdateGroupTemplate(props) {
  const classes = useStyles();
  const {open, permissions, urlPostGroup, selectedRow, close, setOpenGroup}= props;
  const [modificatedGroup, setModificatedGroup] = useState({
    id: selectedRow.id,
    name: selectedRow.name,
    permissions:selectedRow.permissions,
  });
  const [openDuplicate, setOpenDuplicate] = useState(false);

  const handleClickSetDialogGroup = ()=> {
      setOpenDuplicate(true); 
  };
  const handleClose = () => {
      setOpenDuplicate(false);
    };
  /** ----------------------------------------------------------- Function for group create ---------------------------------------------------------------------- */
  const handleChangePermissionsGroup = (perm)=>{
    let array = [];
    perm && 
    perm.map((d)=>array.push(d.id));
    modificatedGroup.permissions = array;
    setModificatedGroup({...modificatedGroup})
  };
  const handleModificateGroup =(event)=> {
    if (event.target.name === "name") {
      modificatedGroup.name = event.target.value;
    }
    setModificatedGroup({...modificatedGroup});
  };
  const handleSaveGroup =async ()=>{
    console.log("putGroupe")
    await axios.put(urlPostGroup, modificatedGroup)
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
              <Button autoFocus color="inherit" onClick={handleClickSetDialogGroup} >
                Dupliquer le groupe
              </Button>
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
                  defaultValue={selectedRow.name}
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
            <DuplicateGroupTemplate
                open={openDuplicate}
                permissions={permissions}
                urlPostGroup={urlPostGroup}
                selectedRow={selectedRow}
                close={handleClose}
                setOpenGroup={setOpenDuplicate}
            />
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
}
