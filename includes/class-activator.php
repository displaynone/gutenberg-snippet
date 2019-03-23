<?php
/**
 * Activator
 *
 * @since 1.0.0
 *
 * @package SentidoWeb\Blocks
 */

namespace SentidoWeb\Blocks\Snippet;

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
		register_activation_hook( SENTIDOWEB_SNIPPET_BLOCK_ROOT, array( $this, 'activate' ) );
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
		set_transient( SENTIDOWEB_SNIPPET_BLOCK_PREFIX . '_activated', true );
	}
}
