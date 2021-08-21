import React from "react";

import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";

import { GradientButton } from "components/Buttons";
import Link from "components/core/Link";
import BrandEditorDialog from "features/BrandEditorDialog";
import SettingsLayout from "layouts/SettingsLayout";
import { getBrands } from "store/entities/reducer";
import actions from "store/merchant/brands/actions";
import { MerchantBrand } from "types";

const useStyles = makeStyles(() => ({
  addNewBrand: {
    textTransform: "inherit",
    width: 159,
    height: 40,
    fontSize: 14,
    marginBottom: 20,
  },
  brandAvatar: {
    width: 115,
    height: 115,
    margin: 12,
    border: "1px solid",
  },
}));

export default function BrandInfo() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleAddNewBrand = () => {
    dispatch(
      actions.initDraftEditor({
        open: true,
        closable: true,
      })
    );
  };

  const brandSlugs = useSelector((state: any) => state.auth.user?.brands) || [];

  const brands = useSelector(getBrands(brandSlugs));

  const plan = useSelector((state: any) => state.auth.user?.plan) || "";

  React.useEffect(() => {
    dispatch(
      actions.initDraftEditor({
        open: false,
      })
    );
  }, []);

  return (
    <SettingsLayout>
      <Head>
        <title>Settings - Your brand/store page info</title>
      </Head>

      <div className="m-5">
        <div className="flex flex-wrap items-center mb-6">
          <Typography className="text-base font-bold mr-14">Your brand/store page info</Typography>
          {plan === "multi" && (
            <GradientButton
              variant="contained" //
              disableElevation
              color="primary"
              className={classes.addNewBrand}
              onClick={handleAddNewBrand}
            >
              + Add a new brand
            </GradientButton>
          )}
        </div>

        <div className="flex flex-wrap">
          {brands.map((brand: MerchantBrand) => (
            <Link
              key={brand.id} //
              href={`/merchant/settings/brands/[brandSlug]`}
              as={`/merchant/settings/brands/${brand.slug}`}
              passHref
            >
              <Avatar
                key={brand.id} //
                className={classes.brandAvatar}
                alt={brand.name}
                src={brand.image}
                component="a"
              >
                {brand.name && brand.name.charAt(0)}
              </Avatar>
            </Link>
          ))}
        </div>
      </div>
      <BrandEditorDialog />
    </SettingsLayout>
  );
}
