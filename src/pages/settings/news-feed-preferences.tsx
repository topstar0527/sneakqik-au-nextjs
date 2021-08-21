import React from "react";

import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

import API from "api";
import { GradientButton } from "components/Buttons";
import SettingsLayout from "layouts/SettingsLayout";
import { authActions } from "store/auth/actions";

const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
  },
  label: {
    display: "flex",
    alignItems: "center",
  },
  subTitle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "16px",
    color: "#4A4A4A",
    marginBottom: "12px",
  },
}));

const fetcher = (url: string) => API.instance.get(url).then((res) => res.data);

const convertArrayToObjectById = (arr: any[]) => {
  const obj = {};
  arr.forEach((el) => (obj[el.id] = el));
  return obj;
};

export default function NewsFeedPreferencesPage() {
  const classes = useStyles();

  const handleCategoryChange = (_event, value) => {
    if (value) {
      if (selectedCategories.findIndex((c) => c.category === value.id) === -1)
        setSelectedCategories([...selectedCategories, { user: user.id, category: value.id }]);
    }
  };

  const handleBrandChange = (_event, value) => {
    if (value) {
      if (selectedBrands.findIndex((c) => c.brand === value.id) === -1)
        setSelectedBrands([...selectedBrands, { user: user.id, brand: value.id }]);
    }
  };

  const handleCategoryDelete = (value) => {
    setSelectedCategories(selectedCategories.filter((c) => c.category !== value.category));
  };

  const handleBrandDelete = (value) => {
    setSelectedBrands(selectedBrands.filter((b) => b.brand !== value.brand));
  };

  const { data: categories = [] } = useSWR("/categories/", fetcher);

  const categoriesById = convertArrayToObjectById(categories);

  const { data: brands = [] } = useSWR("/brands/", fetcher);

  const selectedBrandsById = convertArrayToObjectById(brands);

  const user = useSelector((state: any) => state.auth.user);

  const [selectedCategories, setSelectedCategories] = React.useState<any[]>([]);

  const [selectedBrands, setSelectedBrands] = React.useState<any[]>([]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user) {
      setSelectedCategories(user.favoriteCategories);
      setSelectedBrands(user.favoriteBrands);
    }
  }, [user]);

  const handleUpdate = () => {
    dispatch(
      authActions.updateUserRequest({
        favoriteCategories: selectedCategories,
        favoriteBrands: selectedBrands,
      })
    );
  };

  return (
    <SettingsLayout>
      <Head>
        <title>News Feed Preferences</title>
      </Head>

      <div className={classes.root}>
        <Typography className="mb-8 text-base font-bold">Preferences</Typography>

        <Typography variant="body1" className={classes.subTitle}>
          Choose your favorite categories that you want to see in your newsfeed?
        </Typography>

        <div className="mb-4">
          <div className="mb-4">
            {selectedCategories.map((option, index) => (
              <Chip
                key={index}
                label={categoriesById[option.category]?.name}
                onDelete={() => handleCategoryDelete(option)}
              />
            ))}
          </div>

          <Autocomplete
            options={categories}
            getOptionLabel={(option) => option.name}
            getOptionDisabled={(option) => selectedCategories.findIndex((c) => c.category === option.id) !== -1}
            onChange={handleCategoryChange}
            style={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} variant="outlined" placeholder="" />}
          />
        </div>

        {/* Hide  */}
        <div className="hidden">
          <Typography variant="body1" className={classes.subTitle}>
            Choose your favorite brands that you want to see in your newsfeed?
          </Typography>

          <div className="mb-4">
            <div className="mb-4">
              {selectedBrands.map((option, index) => (
                <Chip
                  key={index} //
                  label={selectedBrandsById[option.brand]?.name}
                  onDelete={() => handleBrandDelete(option)}
                />
              ))}
            </div>

            <Autocomplete
              options={brands}
              getOptionLabel={(option) => option.name}
              getOptionDisabled={(option) => selectedBrands.findIndex((b) => b.brand === option.id) !== -1}
              onChange={handleBrandChange}
              style={{ width: 500 }}
              renderInput={(params) => <TextField {...params} variant="outlined" placeholder="" />}
            />
          </div>
        </div>

        <div className="text-right mt-16 ">
          <GradientButton onClick={handleUpdate} style={{ width: 117 }}>
            UPDATE
          </GradientButton>
        </div>
      </div>
    </SettingsLayout>
  );
}
