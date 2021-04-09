import React , { useState, useContext}from 'react';
import { DataContext } from "../../../context/DataContext";
import UpdatedGroupTemplate from "./updateGroupTemplate";
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Paper,
 
  Typography, 
} from "@material-ui/core";
import { Link } from "react-router-dom";

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
    const { apiDataGroup, apiDataPermissions, urlPostGroup } = useContext(DataContext);
    const classes = useStyles();
    const [openGroup, setOpenGroup] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const handleClickSetDialogGroup = (data)=> {
        setOpenGroup(true);
        setSelectedGroup(data); 
    };
    const handleClose = () => {
        setOpenGroup(false);
      };
  return (
    <div>
        <Typography variant="subtitle1" className={classes.title}>
            Liste des Groupes
        </Typography>
        {apiDataGroup &&
            apiDataGroup.map((data) => {
                return (
                  <div key={data.id}>
                    <Button
                      onClick={(e) => {
                      handleClickSetDialogGroup(data);
                      }}
                    >
                      <Paper variant="outlined">
                        <List dense>
                          <ListItem >
                            <ListItemAvatar>
                              <Avatar>Nom</Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={data.name} />
                            </ListItem>
                          </List>
                      </Paper>
                    </Button>
                  </div>
                );
            })
        }
        <Link to="/groups" style={{ textDecoration: "none", color: "black"  }}>
            Ajouter un Groupe
        </Link>
        {selectedGroup &&
            <UpdatedGroupTemplate
                open={openGroup}
                permissions={apiDataPermissions}
                urlPostGroup={urlPostGroup}
                selectedRow={selectedGroup}
                close={handleClose}
                setOpenGroup={setOpenGroup}
            />
        }       
    </div>
  );
}