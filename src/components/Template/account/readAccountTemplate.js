import React , {useContext, useState}from 'react';
import { DataContext } from "../../../context/DataContext";
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Paper,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";
import UpdatedAccountTemplate from "./updateAccountTemplate";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function DashBoard(props) {
    const classes = useStyles();
    const [selectedRow, setSelectedRow] = useState(null);
    const [openUpdatedUser, setOpenUpdatedUser] = useState(false);
    const {apiData, apiCities, apiDataGroup, apiDataPermissions, urlPostUser, urlPostRelations} = useContext(DataContext);
    const handleClickSetDialog = (e, data) => {
        setOpenUpdatedUser(true);
        setSelectedRow(data);
        
    };
    const handleClose = () => {
        setOpenUpdatedUser(false);
    };

    return (
        <div> 
            <Typography variant="subtitle1" className={classes.title}>
                Liste des Utilisateurs
            </Typography>
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
                                <ListItemText primary={`${data.lastName}  ${data.firstName}`} />
                            </ListItem>
                            </List>
                        </Paper>
                        </Button>
                        <br/>
                    </div>
                    );
                }
            )} 
            {selectedRow && (
                <div>
                <UpdatedAccountTemplate
                    selectedRow={selectedRow}
                    open={openUpdatedUser}
                    onClickClose={handleClose}
                    city={apiCities}
                    setOpen={setOpenUpdatedUser}
                    permissions={apiDataPermissions}
                    group={apiDataGroup}
                    urlPostUser={urlPostUser}
                    urlPostRelations={urlPostRelations}
                />
                </div>
            )}
            <Link to="/addUsers" style={{ textDecoration: "none", color: "black" }}>
                Ajouter un utilisateur
            </Link>
        </div>
    );
}