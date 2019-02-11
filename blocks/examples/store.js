/**
 * Store.
 * 
 * This is a Redux store interface. It is where we make calls to and from the API.
 */

/**
 * Internal Block Libraries
 */
const { apiFetch }      = wp;
const { registerStore } = wp.data;

/**
 * Actions
 * 
 * These are the actions that are called with dispatch or select.
 * 
 * Select actions (calling data from the API) are passed through the selectors, resolvers and then the controls
 * and finally to the reducer.
 * 
 * Dispatch actions (passing data to the API) are passed directly to the reducer.
 * 
 * IMPORTANT TIP: If you need to resolve a promise for a dispatch, do it before you 
 * call the dispatch function.
 * 
 * These functions will be registered in the index file with `withSelect` and `withDispatch`.
 */
const actions = {
	setCategories( categories ) {
		return {
			type: 'SET_CATEGORIES',
			categories,
		};
	},
	receiveCategories( path ) {
		return {
			type: 'RECEIVE_CATEGORIES',
			path,
		};
	},
};

/**
 * Register the store
 * 
 * Define the namespace of the store, and then define how the reducer sets state, 
 * pass in the actions and setup your selectors, controls and reducers.
 */
const store = registerStore( 'plugin-name/starter-card', {
	reducer( state = { categories: {} }, action ) {

		switch ( action.type ) {
			case 'SET_CATEGORIES':
				return {
					...state,
					categories: action.categories,
				};
		}

		return state;
	},

	actions,

	selectors: {
		receiveCategories( state ) {
			const { categories } = state;
			return categories;
		},
	},

	controls: {
		RECEIVE_CATEGORIES( action ) {
			return apiFetch( { path: action.path } );
		},
	},

	resolvers: {
		* receiveCategories( state ) {
			const categories = yield actions.receiveCategories( '/wp/v2/categories?per_page=-1' );
			return actions.setCategories( categories );
		},
	},
} );

export default store;