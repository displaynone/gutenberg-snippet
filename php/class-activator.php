<?php
/**
 * Activator
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
 * Class Activator.
 *
 * Runs when the plugin is activated.
 */
class Activator {

	/**
	 * Run Code.
	 *
	 * @since 1.0.0
	 */
	public function run() {
		register_activation_hook( COMPANY_NAME_PLUGIN_NAME_ROOT, array( $this, 'activate' ) );
	}

	/**
	 * Activate
	 *
	 * Runs code on activation.
	 *
	 * @since 1.0.0
	 */
	public function activate() {
		// Set a transient to confirm activation.
		set_transient( COMPANY_NAME_PLUGIN_NAME_PREFIX . '_activated', true );
	}
}
