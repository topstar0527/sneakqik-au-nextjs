import produce from "immer";
import _ from "lodash";
import reduceReducers from "reduce-reducers";

import * as Actions from "store/entities/actions";
import brandActions from "store/merchant/brands/actions";

const initialState = {
  offers: {},
  brands: {},
  comments: {},
  users: {},
};

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    // eslint-disable-next-line no-prototype-builtins
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

const createComment = (state, action) => {
  const offerSlug = action.payload.offer.slug;
  const normalizedData = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.offers[offerSlug].comments = draftState.offers[offerSlug].comments || [];
    draftState.offers[offerSlug].comments.unshift(normalizedData.result);
    draftState.offers[offerSlug].commentsCount += 1;
  });

  return nextState;
};

const readComments = (state, action) => {
  const offerSlug = action.payload.offer.slug;
  const normalizedData = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.offers[offerSlug].comments = normalizedData.result;
  });

  return nextState;
};

const deleteComment = (state, action) => {
  const offerSlug = action.payload.offer.slug;

  const comment = action.payload.data;

  const nextState = produce(state, (draftState) => {
    draftState.offers[offerSlug].comments = draftState.offers[offerSlug].comments.filter(
      (commentId) => commentId !== comment.id
    );
    draftState.offers[offerSlug].commentsCount -= 1;
  });

  return nextState;
};

const toggleLike = (state, action) => {
  const nextState = produce(state, (draftState) => {
    const offer = draftState.offers[action.payload.slug];
    offer.likesCount = offer.likesCount + (offer.isLiked ? -1 : +1);
    offer.isLiked = !offer.isLiked;
  });

  return nextState;
};

const toggleSave = (state, action) => {
  const nextState = produce(state, (draftState) => {
    const offer = draftState.offers[action.payload.slug];
    offer.savesCount = offer.savesCount + (offer.isSaved ? -1 : +1);
    offer.isSaved = !offer.isSaved;
  });

  return nextState;
};

const toggleFollow = (state, action) => {
  const nextState = produce(state, (draftState) => {
    const brand = draftState.brands[action.payload.slug];
    brand.totalFollowers = brand.totalFollowers + (brand.isFollowed ? -1 : +1);
    brand.isFollowed = !brand.isFollowed;
  });

  return nextState;
};

const shareOffer = (state, action) => {
  const nextState = produce(state, (draftState) => {
    const offer = draftState.offers[action.payload.slug];
    offer.sharesCount += 1;
  });

  return nextState;
};

const createOffer = (state, action) => {
  const data = action.payload;
  const offer = data.entities.offers[data.result];
  const nextState = produce(state, (draftState) => {
    const brand = draftState.brands[offer.brand];
    brand.offersCountThisMonth += 1;
  });

  return nextState;
};

const featureReducers = createReducer(initialState, {
  [Actions.createCommentSuccess.toString()]: createComment,
  [Actions.readCommentsSuccess.toString()]: readComments,
  [Actions.deleteCommentSuccess.toString()]: deleteComment,
  [Actions.shareOffer.toString()]: shareOffer,
  [Actions.toggleFollow.toString()]: toggleFollow,
  [Actions.toggleSave.toString()]: toggleSave,
  [Actions.toggleLike.toString()]: toggleLike,
  [brandActions.createOfferSuccess.toString()]: createOffer,
});

function mergeReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.mergeEntities.toString(): {
      return _.merge({}, state, action.payload.entities);
    }
    default: {
      if (action.payload && action.payload.entities) {
        return _.merge({}, state, action.payload.entities);
      }
      return state;
    }
  }
}

const reducer = reduceReducers(mergeReducer, featureReducers);

export default reducer;

export const getBrandBySlug = (slug) => (state) => {
  return state.entities.brands[slug];
};

export const getEntities = (state) => {
  return state.entities;
};

export const getOfferBySlug = (slug) => (state) => {
  return state.entities.offers[slug];
};

export const getBrandLogoBySlug = (slug) => (state) => {
  const entities = state.entities;
  if (entities.brands[slug]) return entities.brands[slug].image;
};

export const getBrandNameBySlug = (slug) => (state) => {
  const entities = state.entities;
  if (entities.brands[slug]) return entities.brands[slug].name;
};

export const getCommentById = (id) => (state) => {
  return state.entities.comments[id];
};

export const getAuthorById = (id) => (state) => {
  return state.entities.users[id];
};

export const getBrandById = (id) => (state) => {
  return Object.values(state.entities.brands).find((b) => b.id === id);
};

export const getOfferById = (id) => (state) => {
  return Object.values(state.entities.offers).find((b) => b.id === id);
};

export const getOffersByBrandSlug = (brandSlug) => (state) => {
  return Object.values(state.entities.offers)
    .filter((offer) => offer.brand === brandSlug)
    .map((offer) => offer.slug);
};

export const getOffersObjectsByBrandSlug = (brandSlug) => (state) => {
  return Object.values(state.entities.offers)
    .filter((offer) => offer.brand === brandSlug)
    .filter((offer) => offer.status === "published");
};

export const getOffers = (offerSlugs) => (state) => {
  return offerSlugs.map((slug) => state.entities.offers[slug]);
};

export const getBrands = (slugs) => (state) => {
  return slugs.map((slug) => state.entities.brands[slug]);
};
