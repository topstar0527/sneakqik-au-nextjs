import { authActions as auth } from "./auth/actions";
import customerActions from "./customer/actions";
import merchantActions from "./merchant/actions";

export const authActions = auth;

export default {
  auth: authActions,
  merchant: merchantActions,
  customer: customerActions,
};
