import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import StaticSelect from "components/core/StaticSelect";
import StaticTextField from "components/core/StaticTextField";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "20px",
  },
  card: {
    width: "300px",
  },
}));

export default function StyleGuide() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h2" gutterBottom>
        Style Guide
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Fields
          </Typography>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5">Static</Typography>
              <StaticTextField
                label="Label"
                id="static_text_field1"
                placeholder="Placeholder"
                fullWidth
                margin="normal"
                helperText="Incorrect entry."
              />
              <StaticTextField
                label="Label"
                id="static_text_field2"
                placeholder="Placeholder"
                fullWidth
                margin="normal"
                helperText="Incorrect entry."
                error
              />

              <StaticTextField
                label="textarea"
                id="static_text_field3"
                placeholder="Placeholder"
                fullWidth
                margin="normal"
                rows="4"
                multiline
              />

              <StaticTextField
                label="textarea"
                id="static_text_field4"
                placeholder="Placeholder"
                fullWidth
                margin="normal"
                rows="4"
                multiline
                error
                helperText="Error"
              />

              <StaticTextField
                id="static_text_field4"
                placeholder="Placeholder"
                fullWidth
                margin="normal"
                rows="4"
                multiline
                error
                helperText="Error"
              />

              <Typography variant="h5">Basic</Typography>
              <StaticTextField id="basic_text_field1" placeholder="Placeholder" fullWidth margin="normal" />
              <StaticTextField
                id="basic_text_field2"
                placeholder="Placeholder"
                defaultValue="Input text"
                fullWidth
                margin="normal"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item>
          <Typography variant="h4" gutterBottom>
            Select
          </Typography>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5">Static</Typography>
              <StaticSelect label="Label" placeholder="Placeholder" margin="normal" fullWidth>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                <MenuItem value={40}>Forty</MenuItem>
              </StaticSelect>

              <StaticSelect
                label="Label"
                placeholder="Placeholder"
                margin="normal"
                error
                helperText="Not valid"
                fullWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                <MenuItem value={40}>Forty</MenuItem>
              </StaticSelect>

              <Typography variant="h5">Basic</Typography>

              <StaticSelect placeholder="Placeholder" margin="normal" fullWidth>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                <MenuItem value={40}>Forty</MenuItem>
              </StaticSelect>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
