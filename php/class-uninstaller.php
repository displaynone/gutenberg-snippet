<?php
/**
 * Uninstaller
 *
 * @since 1.0.0
 */

namespace company_name\plugin_name;

// Abort if this file is called directly.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Class Uninstaller.
 * 
 * Runs when the plugin is uninstalled.
 */
class Uninstaller {

	/**
	 * Run Code.
	 *
	 * @since 1.0.0
	 */
	public function run() {
        register_uninstall_hook( COMPANY_NAME_PLUGIN_NAME_ROOT, array( $this, 'uninstall' ) );
    }

    /**
	 * Uninstall
     * 
     * Runs code on uninstall.
	 *
	 * @since 1.0.0
	 */
	public function uninstall() {
		// Remove a transient to confirm uninstallation.
		remove_transient( COMPANY_NAME_PLUGIN_NAME_PREFIX . '_activated' );
	}
}