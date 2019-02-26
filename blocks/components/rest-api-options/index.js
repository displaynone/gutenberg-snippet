/**
 * REST API Options
 * 
 * Registeres a store that allows us to update and recieve WordPress options.
 * 
 * Dependant on the ./php/class-rest-api-options.php class.
 */

/**
 * Internal dependencies
 */
const { apiFetch }      = wp;
const { registerStore } = wp.data;

/**
 * Actions
 */
const actions = {
	setOption( option ) {
		return {
			type: 'SET_OPTION',
			option,
		};
	},
	receiveOption( path ) {
		return {
			type: 'RECEIVE_OPTION',
			path,
		};
	},
	updateOption( option ) {
		return {
			type: 'UPDATE_OPTION',
			option,
		};
	},
};

/**
 * Register Store
 */
const store = registerStore( 'company-name/plugin-name', {
	reducer( state = { option: {} }, action ) {

		switch ( action.type ) {
			case 'SET_OPTION':
				return {
					...state,
					option: action.option,
				};
			case 'UPDATE_OPTION':
				return {
					...state,
					option: action.option,
				};
		}

		return state;
	},

	actions,

	selectors: {
		receiveOption( state, item ) {
			const { option } = state;
			return option;
		},
	},

	controls: {
		RECEIVE_OPTION( action ) {
			return apiFetch( { path: action.path } );
		},
	},

	resolvers: {
		* receiveOption( item ) {
			const option = yield actions.receiveOption( '/company-name/plugin-name/v1/get/option/' + item + '/' );
			return actions.setOption( option );
		},
	},
} );

export default store;