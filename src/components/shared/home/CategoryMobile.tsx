import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import useSWR from "swr";

import API from "api";

import CategoryMobileItem from "./CategoryMobileItem";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 10,
  },
}));

const fetcher = (url: string) => API.instance.get(url).then((res) => res.data);
type Category = {
  id: string;
  image: string;
  name: string;
};

type Props = {
  categories: string[];
  onChange: (categories: string[]) => void;
};

const CategoryMobile: React.FC<Props> = (props) => {
  const classes = useStyles();

  const { data: cats = [] } = useSWR("/categories/", fetcher);
  const { categories = [], onChange } = props;

  const handleChange = (checked, category) => {
    if (checked) {
      onChange([...categories, category.id]);
    } else {
      onChange(categories.filter((item) => item !== category.id));
    }
  };

  return (
    <Grid container spacing={2} className={classes.root}>
      {cats.map((category: Category) => (
        <Grid key={category.id} item xs={6} sm={6} md={6}>
          <CategoryMobileItem
            category={category}
            onChangeCheck={handleChange}
            checked={categories.indexOf(category.id) > -1}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryMobile;
