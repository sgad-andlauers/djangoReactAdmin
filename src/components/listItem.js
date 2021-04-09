import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <Link to="/" style={{ textDecoration: "none" }}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText
          primary="Tableau de bord"
          style={{
            color: "black"
          }}
        />
      </ListItem>
    </Link>
    <Link to="/users" style={{ textDecoration: "none" }}>
        <ListItem button>
            <ListItemText
            primary="Utilisateurs"
            style={{
                color: "black"
            }}
            />
        </ListItem>
    </Link>
    <Link to="/groups" style={{ textDecoration: "none" }}>
      <ListItem button>
        <ListItemText
          primary="Groupes"
          style={{
            color: "black"
          }}
        />
      </ListItem>
    </Link>
  </div>
);
