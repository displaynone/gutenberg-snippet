<?php
/**
 * Enqueue_Google_Map
 *
 * @since 1.0.0
 *
 * @package company_name\plugin_name
 */

namespace company_name\plugin_name;

// Abort if this file is called directly.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Class Enqueue Google Map.
 *
 * Enqueues the Google Map <script>
 */
class Enqueue_Google_Map {

	/**
	 * Run Code.
	 *
	 * @since 1.0.0
	 */
	public function run() {
		// Load Block Front and Back End Assets (can use a conditional to restrict load).
		add_action( 'enqueue_block_assets', array( $this, 'block_assets' ), 9999 );
	}

	/**
	 * Block Assets.
	 *
	 * Assets that load on on the Gutenberg 'Save' and Admin view. If you want
	 * certain assets to only load on the front end, wrap them in a `is_admin` conditional.
	 *
	 * @since 1.0.0
	 */
	public function block_assets() {

		$key = get_option( 'gMapEmbedAPIKey', false );

		if ( $key ) {
			// Enqueue JS.
			// @codingStandardsIgnoreLine.
			wp_enqueue_script(
				'google-maps',
				'//maps.googleapis.com/maps/api/js?key=' . $key,
				array(),
				null,
				true
			);
		}
	}
}
