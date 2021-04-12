import React, { useEffect, useState } from "react";
import { cardsData } from "../data/cardsData";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 300,
    height: 300,
    boxShadow: "0px 0px 2px 0.1px rgba(0,0,0,0.75)",
    "&:hover": {
      backgroundColor: "#eeeeee",
      cursor: "pointer",
      transition: "all 0.5s",
    },
  },
  media: {
    height: 200,
    objectFit: "contain",
  },
  mainContainer: {
    marginTop: 30,
    marginBottom: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    maxWidth: "100%",
    listStyle: "none",
  },
  noDataFound: {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#002203",
  },
});

export default function AllApp({ search }) {
  const [data, setData] = useState(cardsData);

  const classes = useStyles();

  const filteredCards = data.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key].toLowerCase().includes(search)
    );
  });

  useEffect(() => {
    setData(cardsData);
  }, [cardsData]);

  return (
    <div>
      <Grid
        container
        spacing={24}
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        {filteredCards.length === 0 ? (
          <h1 className={classes.noDataFound}>No Data Found!</h1>
        ) : (
          filteredCards.map((value, index) => (
            <Grid
              key={value.name}
              item
              xl={2}
              lg={4}
              md={6}
              sm={12}
              className={classes.mainContainer}
            >
              <ImagesCard
                name={value.name}
                description={value.description}
                image={value.image}
              />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
}

function ImagesCard({ name, description, image }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={image} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
