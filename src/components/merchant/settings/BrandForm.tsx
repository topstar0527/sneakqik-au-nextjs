import React from "react";

import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { normalize } from "normalizr";
import { useSelector, useDispatch } from "react-redux";
import useSWR from "swr";
import { object, string, mixed } from "yup";

import API from "api";
import { GradientButton } from "components/Buttons";
import CustomInputLabel from "components/core/CustomInputLabel";
import StaticSelect from "components/core/StaticSelect";
import StaticTextField from "components/core/StaticTextField";
import UploadFile from "components/merchant/settings/UploadFile";
import DeactivateAccount from "components/settings/DeactivateAccount";
import { brand as BrandSchema } from "schema";
import { authActions } from "store/actions";
import { getBrandBySlug } from "store/entities/reducer";
import { showMessage } from "store/message/actions";
import { BrandBase } from "types";
import { clean, slugify, generateBrandUrl } from "utils";

const useStyles = makeStyles({
  label: {
    marginTop: 6,
  },
  divider: {
    margin: "30px 0",
    borderColor: "#000000",
    opacity: 0.1,
  },
  updateBtn: {
    fontSize: 14,
    fontWeight: "bold",
    height: 40,
    width: 117,
  },
  socialMediaSection: {
    "& .MuiGrid-container": {
      marginBottom: 10,
    },
  },
});

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

type BrandFormType = Overwrite<Partial<BrandBase>, { headerImage?: string | File; image?: string | File }>;

const initialValues: BrandFormType = {
  name: "",
  slug: "",
  tagline: "",
  category: "",
  description: "",
  publicPhoneNumber: "",
  publicEmail: "",
  facebookUrl: "",
  twitterUrl: "",
  instagramUrl: "",
  image: "",
  headerImage: "",
  primaryWebsite: "",
};

const validationSchema = object({
  name: string().required("Merchant/brand name is required"),
  slug: string(),
  tagline: string().max(50, "Maximum 50 characters"),
  category: string().required("Select a category"),
  description: string().nullable(),
  publicPhoneNumber: string().nullable(),
  publicEmail: string().email("Please input valid email address").nullable(),
  facebookUrl: string().url("Please enter a valid facebook url.").nullable(),
  twitterUrl: string().url("Please enter a valid twitter url.").nullable(),
  instagramUrl: string().url("Please enter a valid instagram url.").nullable(),
  image: mixed(),
  headerImage: mixed(),
}).required();

const fetcher = (url: string) => API.instance.get(url).then((res) => res.data);

export default function BrandForm() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSubmit: async (values) => {
      try {
        if (!(values.image instanceof File)) delete values.image;
        if (!(values.headerImage instanceof File)) delete values.headerImage;

        const { data } = await API.merchant.updateBrand(clean(values));
        //set store data
        const normalizedData = normalize(data, BrandSchema);
        dispatch(authActions.updateBrand(normalizedData));
        dispatch(showMessage({ message: "Update Brand Info Successfully.", variant: "success" }));
      } catch (e) {
        if (e.response && e.response.data) {
          formik.setErrors(e.response.data);
        }
      }
    },
  });

  const { data: categories = [] } = useSWR("/categories/", fetcher);

  const router = useRouter();

  const { brandSlug = "" }: { brandSlug?: string } = router.query;

  const brand = useSelector(getBrandBySlug(brandSlug));

  React.useEffect(() => {
    if (brandSlug && brand) {
      formik.resetForm({
        values: { ...brand, category: brand.category.id },
      });
    } else {
      router.push("/merchant/settings/brands/");
    }
  }, [brandSlug, brand]);

  return (
    <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
      <Typography className="mb-8 text-base font-bold">Your brand/store page info</Typography>
      <Grid container spacing={1}>
        <Grid container item>
          <Grid item xs={12} sm={4} className={classes.label}>
            <CustomInputLabel required>Merchant/brand name</CustomInputLabel>
          </Grid>
          <Grid item xs={12} sm={8}>
            <StaticTextField
              required
              id="name"
              name="name"
              placeholder="E.g. Kmart"
              fullWidth
              value={formik.values.name || ""}
              onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldValue("slug", slugify(e.target.value || ""));
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={12} sm={4} className={classes.label}>
            <CustomInputLabel>Page link on SneakQIK</CustomInputLabel>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography>{generateBrandUrl(formik.values.slug)}</Typography>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={12} sm={4} className={classes.label}>
            <CustomInputLabel>Tagline</CustomInputLabel>
          </Grid>
          <Grid item xs={12} sm={8}>
            <StaticTextField
              id="tagline"
              name="tagline"
              placeholder="Australia’s no 1 fashion store"
              fullWidth
              value={formik.values.tagline || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              //error={formik.touched.tagline && Boolean(formik.errors.tagline)}
              //helperText={formik.touched.tagline && formik.errors.tagline}
            />

            {!formik.values.tagline && (
              <FormHelperText error={formik.touched.tagline && Boolean(formik.errors.tagline)}>
                {formik.touched.tagline && formik.errors.tagline}
              </FormHelperText>
            )}

            {formik.values.tagline && (
              <FormHelperText error={Boolean(formik.errors.tagline)}>
                {50 - formik.values.tagline.length >= 0
                  ? `Maximum 50 characters: ${50 - formik.values.tagline.length} remaining`
                  : `Maximum 50 characters: ${formik.values.tagline.length - 50} too many`}
              </FormHelperText>
            )}
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={12} sm={4} className={classes.label}>
            <CustomInputLabel required>Category</CustomInputLabel>
          </Grid>
          <Grid item xs={12} sm={8}>
            <StaticSelect
              required
              fullWidth
              id="category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
            >
              <MenuItem value="">
                <em>Select a Category</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </StaticSelect>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={12} sm={4} className={classes.label}>
            <CustomInputLabel>Brand description</CustomInputLabel>
          </Grid>
          <Grid item xs={12} sm={8}>
            <StaticTextField
              id="description"
              name="description"
              placeholder="xxxxx"
              fullWidth
              rows="6"
              multiline
              value={formik.values.description || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={1}>
          <Grid item xs={12} sm={4} className={classes.label}>
            <CustomInputLabel>Phone number</CustomInputLabel>
            <CustomInputLabel>(publicly shown)</CustomInputLabel>
          </Grid>
          <Grid item xs={12} sm={8}>
            <StaticTextField
              id="publicPhoneNumber"
              name="publicPhoneNumber"
              fullWidth
              value={formik.values.publicPhoneNumber || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.publicPhoneNumber && Boolean(formik.errors.publicPhoneNumber)}
              helperText={formik.touched.publicPhoneNumber && formik.errors.publicPhoneNumber}
            />
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={12} sm={4} className={classes.label}>
            <CustomInputLabel>Email</CustomInputLabel>
            <CustomInputLabel>(publicly shown)</CustomInputLabel>
          </Grid>
          <Grid item xs={12} sm={8}>
            <StaticTextField
              id="publicEmail"
              name="publicEmail"
              placeholder="xxxxx"
              fullWidth
              value={formik.values.publicEmail || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.publicEmail && Boolean(formik.errors.publicEmail)}
              helperText={formik.touched.publicEmail && formik.errors.publicEmail}
            />
          </Grid>
        </Grid>
        <Grid container item className={classes.socialMediaSection}>
          <Grid item xs={12} sm={4} className={classes.label}>
            <CustomInputLabel>Social media links</CustomInputLabel>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container>
              <Grid item xs={12} sm={5}>
                <StaticTextField
                  id="facebookUrl"
                  name="facebookUrl"
                  placeholder="Connect with Facebook"
                  fullWidth
                  value={formik.values.facebookUrl || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.facebookUrl && Boolean(formik.errors.facebookUrl)}
                  helperText={formik.touched.facebookUrl && formik.errors.facebookUrl}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={5}>
                <StaticTextField
                  id="twitterUrl"
                  name="twitterUrl"
                  placeholder="Connect with Twitter"
                  fullWidth
                  value={formik.values.twitterUrl || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.twitterUrl && Boolean(formik.errors.twitterUrl)}
                  helperText={formik.touched.twitterUrl && formik.errors.twitterUrl}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={5}>
                <StaticTextField
                  id="instagramUrl"
                  name="instagramUrl"
                  placeholder="Connect with Instagram"
                  fullWidth
                  value={formik.values.instagramUrl || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.instagramUrl && Boolean(formik.errors.instagramUrl)}
                  helperText={formik.touched.instagramUrl && formik.errors.instagramUrl}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={12} sm={4} className={classes.label}>
            <CustomInputLabel>Brand logo</CustomInputLabel>
          </Grid>
          <Grid item xs={12} sm={8}>
            <UploadFile
              image={formik.values.image}
              onChange={(file) => {
                formik.setFieldValue("image", file, false);
              }}
            />
            <FormHelperText error={formik.touched.image && Boolean(formik.errors.image)}>
              {formik.touched.image && formik.errors.image}
            </FormHelperText>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={12} sm={4} className={classes.label}>
            <CustomInputLabel>Header background image</CustomInputLabel>
          </Grid>
          <Grid item xs={12} sm={8}>
            <UploadFile
              image={formik.values.headerImage}
              onChange={(file) => {
                formik.setFieldValue("headerImage", file, false);
              }}
            />
            <FormHelperText error={formik.touched.headerImage && Boolean(formik.errors.headerImage)}>
              {formik.touched.headerImage && formik.errors.headerImage}
            </FormHelperText>
          </Grid>
        </Grid>
        <Grid container item justify="flex-end">
          <GradientButton
            type="submit"
            variant="contained"
            disableElevation
            color="primary"
            className={classes.updateBtn}
          >
            Update
          </GradientButton>
        </Grid>
        <DeactivateAccount />
      </Grid>
    </form>
  );
}
