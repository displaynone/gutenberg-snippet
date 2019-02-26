<?php
/**
 * Block
 *
 * This is where we load all the PHP from the blocks.
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

// Require Classes.
require_once 'data/rest-api-options/php/class-rest-api-options.php';
require_once 'starter-google-map/php/class-enqueue-google-map.php';

// Instantiate Classes.
$rest_api_options   = new REST_API_Options();
$enqueue_google_map = new Enqueue_Google_Map();

// Run Code.
$rest_api_options->run();   // Register REST API Endpoints.
$enqueue_google_map->run(); // Enqueue Google Map Script.
