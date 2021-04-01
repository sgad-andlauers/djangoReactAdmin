import React from "react";
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
    Container
  } from "@material-ui/core";
  import CloseIcon from '@material-ui/icons/Close';
  import Autocomplete from '@material-ui/lab/Autocomplete';
  import { makeStyles } from '@material-ui/core/styles';

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

export default function CreateGroup(props) {
    const classes = useStyles();
    const {open, onClickClose, permissions, onChangeGroupe, onChangePermissionsGroup, onSubmitGroup} = props;

  return (
    <div style={{ maxWidth: "100%" }}>
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
                <Typography variant="h6" className={classes.title}>
                    Creation ou modification d'un groupe
                </Typography>
                <Button autoFocus color="inherit" onClick={onSubmitGroup} >
                Créer le groupe
                </Button>
            </DialogActions>
            </Toolbar>
        </AppBar>
        <DialogContent>
            <Container maxWidth="xl">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                            <TextField
                                id="GroupName"
                                name="Name"
                                label="Nom du groupe"
                                fullWidth
                                variant="outlined"
                                onChange={(event )=>{onChangeGroupe( event)}}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            multiple
                            id="cities"
                            name="cities"
                            options={permissions.permissions}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, value, reason)=>{onChangePermissionsGroup(event, value, reason)}}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Villes"
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </Container>
        </DialogContent>
    </Dialog>
  </div>
  );
}
