<?php
/**
 * REST_API_Options
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
class REST_API_Options {

	/**
	 * API Version.
	 *
	 * @var string
	 */
	private $version;

	/**
	 * API Namespace.
	 *
	 * @var string
	 */
	private $namespace;

	/**
	 * Constructor.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		$this->version   = '1';
		$this->namespace = 'company-name/plugin-name/v' . $this->version;
	}

	/**
	 * Run Code.
	 *
	 * @since 1.0.0
	 */
	public function run() {
		add_action( 'rest_api_init', array( $this, 'get_option' ) );
		add_action( 'rest_api_init', array( $this, 'update_option' ) );
	}

	/**
	 * Register REST API Get Option
	 */
	public function get_option() {
		// Register Rest Route.
		register_rest_route(
			$this->namespace,
			'/get/option/(?P<option>([A-Za-z0-9\_])+)/',
			array(
				'methods'             => 'GET',
				'callback'            => function ( $request ) {
					$option = isset( $request['option'] ) ? esc_attr( $request['option'] ) : null;
					$value  = get_option( $option );
					return $value;
				},
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}

	/**
	 * Register REST API Get Option
	 */
	public function update_option() {
		// Register Rest Route.
		register_rest_route(
			$this->namespace,
			'/update/option/(?P<option>([A-Za-z0-9\_])+)/',
			array(
				'methods'             => 'POST',
				'callback'            => function ( $request ) {
					$option = isset( $request['option'] ) ? esc_attr( $request['option'] ) : null;
					$value  = $request->get_param( 'value' );
					update_option( $option, $value );
					return $value;
				},
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}
}
