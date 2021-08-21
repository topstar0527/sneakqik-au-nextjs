import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'

import API from "api";
import MobileStepper from "components/shared/MobileStepper";
import Stepper from "components/shared/Stepper";
import { monthlyPlans, yearlyPlans } from "data/demo";
import { Plan } from "types";

const BusinessDetailForm = dynamic(() => import('features/Merchant/AuthenticationForm/BusinessDetailForm'));
const ContactDetailForm = dynamic(() => import('features/Merchant/AuthenticationForm/ContactDetailForm'));
const PlanForm = dynamic(() => import('features/Merchant/AuthenticationForm/PlanForm'));

const useStyles = makeStyles(() => ({
  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  paper: {
    width: "calc(100% - 24px)",
    marginLeft: "12px",
    marginRight: "12px",
    maxWidth: "1071px",
    minHeight: "555px",
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  form: {
    margin: "24px",
    marginBottom: 0,
  },

  title: {
    fontSize: "25px",
    fontWeight: "bold",
    lineHeight: "31px",
  },
}));

const steps = [
  {
    step: 1,
    value: 25,
    curLabel: "Choose plan",
    nextLabel: "Business details",
  },
  {
    step: 2,
    value: 50,
    curLabel: "Business details",
    nextLabel: "Contact details",
  },
  {
    step: 3,
    value: 75,
    curLabel: "Contact details",
    nextLabel: "",
  },
];

const INITIAL_STATE: StateType = {
  token: "",
  user: null,
  status: "success",
  errors: null,
  step: 0,
  info: {},
};

type StateType = {
  errors: any;
  info: any;
  plan?: Plan;
  status: string;
  step: number;
  token: string;
  user: any;
};

type ActionType = {
  errors?: any;
  payload?: any;
  type: string;
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "NEXT_STEP": {
      return {
        ...state,
        step: action.payload.step,
        status: "none",
      };
    }

    case "BUSINESS_REGISTER_REQUEST": {
      return {
        ...state,
        status: "pending",
        errors: null,
      };
    }

    case "BUSINESS_REGISTER_SUCCESS": {
      return {
        ...state,
        status: "success",
        token: action.payload.data.access,
        user: action.payload.data.user,
        info: action.payload.params,
      };
    }

    case "BUSINESS_REGISTER_FAILURE": {
      return {
        ...state,
        status: "error",
        errors: action.errors,
      };
    }

    case "BUSINESS_SETUP_REQUEST": {
      return {
        ...state,
        status: "pending",
        errors: null,
      };
    }

    case "BUSINESS_SETUP_SUCCESS": {
      return {
        ...state,
        status: "success",
        info: {
          ...state.info,
          ...action.payload,
        },
      };
    }

    case "BUSINESS_SETUP_FAILURE": {
      return {
        ...state,
        status: "error",
        errors: action.errors,
      };
    }

    case "SET_PLAN": {
      return {
        ...state,
        plan: action.payload,
      };
    }

    default:
      return state;
  }
}

const MerchantRegisterForm: React.FunctionComponent = () => {
  const classes = useStyles();

  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  const router = useRouter();

  const registerBusiness = React.useCallback(async (params) => {
    dispatch({ type: "BUSINESS_REGISTER_REQUEST" });
    try {
      const { data } = await API.auth.registerBusiness(params);
      dispatch({ type: "BUSINESS_REGISTER_SUCCESS", payload: { params, data } });
    } catch (e) {
      dispatch({ type: "BUSINESS_REGISTER_FAILURE", errors: e.response?.data });
    }
  }, []);

  const setupBusiness = React.useCallback(
    async (params) => {
      dispatch({ type: "BUSINESS_SETUP_REQUEST" });
      try {
        const { data } = await API.auth.setupBusiness(params, state.token);
        dispatch({ type: "BUSINESS_SETUP_SUCCESS", payload: data });
      } catch (e) {
        dispatch({ type: "BUSINESS_SETUP_FAILURE", errors: e.response?.data });
      }
    },
    [state.token]
  );

  const saveChargeBeeToken = React.useCallback(
    async (params) => {
      try {
        await API.auth.setupPayment(params, state.token);
        await API.auth.sendVerificationEmail(state.token);
        router.push(`/merchant/verify-email?email=${state.info.email}&token=${state.token}`);
      } catch (e) {
        console.error(e);
      }
    },
    [state.token]
  );

  const goNext = (plan) => {
    if (plan) {
      dispatch({ type: "SET_PLAN", payload: plan });
    }
    dispatch({ type: "NEXT_STEP", payload: { step: (state.step + 1) % 3 } });
  };

  const goToStep = (step) => {
    dispatch({ type: "NEXT_STEP", payload: { step } });
  };

  const actions = {
    registerBusiness,
    setupBusiness,
    saveChargeBeeToken,
    goNext,
    goToStep,
  };

  React.useEffect(() => {
    const { plan: planId = "" } = router.query;

    let plan: undefined | Plan;
    plan = plan ?? yearlyPlans.find((p) => p.id === planId);
    plan = plan ?? monthlyPlans.find((p) => p.id === planId);

    if (plan && state.step === 0) {
      actions.goNext(plan);
    }
  }, [router]);

  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <main className={classes.main}>
      <div className={classes.paper}>
        <div className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className={classes.title} variant="h5" component="h5" align="center">
                New Business Sign Up
              </Typography>
            </Grid>

            <Grid item xs={12} container alignItems="center" justify="center">
              {matches ? (
                <Stepper {...steps[state.step]} actions={actions} />
              ) : (
                <MobileStepper {...steps[state.step]} />
              )}
            </Grid>
          </Grid>
        </div>

        {state.step === 0 && <PlanForm state={state} actions={actions} />}
        {state.step === 1 && <BusinessDetailForm state={state} actions={actions} />}
        {state.step === 2 && <ContactDetailForm state={state} actions={actions} />}
      </div>
    </main>
  );
};

export default MerchantRegisterForm;
