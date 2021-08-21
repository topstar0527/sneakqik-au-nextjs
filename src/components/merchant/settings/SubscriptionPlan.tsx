import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

import API from "api";
import SubscriptionPlanForm from "components/merchant/settings/SubscriptionPlanForm";

const useStyles = makeStyles(() => ({
  main: {
    flex: 1,
    display: "flex",
  },

  paper: {
    width: "100%",
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  title: {
    fontSize: "25px",
    fontWeight: "bold",
    lineHeight: "31px",
  },
}));

const INITIAL_STATE: StateType = {
  token: "",
  status: "success",
  errors: null,
  step: 0,
  info: {},
};

type StateType = {
  errors: any;
  info: any;
  status: string;
  step: number;
  token: string;
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
      };
    }

    case "BUSINESS_SETUP_FAILURE": {
      return {
        ...state,
        status: "error",
        errors: action.errors,
      };
    }

    default:
      return state;
  }
}

const SubscriptionPlan: React.FunctionComponent = () => {
  const classes = useStyles();

  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  const router = useRouter();

  const registerBusiness = React.useCallback(async (params) => {
    dispatch({ type: "BUSINESS_REGISTER_REQUEST" });
    try {
      const { data } = await API.auth.registerBusiness(params);
      dispatch({ type: "BUSINESS_REGISTER_SUCCESS", payload: { params, data } });
    } catch (e) {
      dispatch({ type: "BUSINESS_REGISTER_FAILURE", errors: e.response.data });
    }
  }, []);

  const setupBusiness = React.useCallback(
    async (params) => {
      dispatch({ type: "BUSINESS_SETUP_REQUEST" });
      try {
        const params1 = {
          ...params,
          contactPersonName: `${params.firstName} ${params.lastName}`,
          country: params.country.label,
          state: params.state.name,
        };

        const { data } = await API.auth.setupBusiness(params1, state.token);
        dispatch({ type: "BUSINESS_SETUP_SUCCESS", payload: data });
      } catch (e) {
        dispatch({ type: "BUSINESS_SETUP_FAILURE", errors: e.response.data });
      }
    },
    [state.token]
  );

  const saveChargeBeeToken = React.useCallback(
    async (params) => {
      try {
        await API.auth.setupPayment(params, state.token);
        await API.auth.sendVerificationEmail(state.token);
        router.push("/merchant/verify-email");
      } catch (e) {
        console.error(e);
      }
    },
    [state.token]
  );

  const goNext = () => {
    dispatch({ type: "NEXT_STEP", payload: { step: (state.step + 1) % 3 } });
  };

  const actions = {
    registerBusiness,
    setupBusiness,
    saveChargeBeeToken,
    goNext,
  };

  return (
    <main className={classes.main}>
      <div className={classes.paper}>
        <SubscriptionPlanForm state={state} actions={actions} />
      </div>
    </main>
  );
};

export default SubscriptionPlan;
