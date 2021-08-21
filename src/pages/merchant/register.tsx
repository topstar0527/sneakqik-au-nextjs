import React from "react";

import Head from "next/head";

import MerchantRegisterForm from "features/Merchant/AuthenticationForm/MerchantRegisterForm";
import GradientLayout from "layouts/GradientLayout";

const chargebeeSite = process.env.NEXT_PUBLIC_CHARGEBEE_SITE;

const Register: React.FunctionComponent = () => {
  return (
    <GradientLayout>
      <Head>
        <script src="https://js.chargebee.com/v2/chargebee.js" data-cb-site={chargebeeSite}></script>
      </Head>
      <MerchantRegisterForm />
    </GradientLayout>
  );
};

export default Register;
