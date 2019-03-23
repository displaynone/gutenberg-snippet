<?php
/**
 * Autoloader class
 *
 * @package SentidoWeb/Blocks/Snippets
 */

namespace SentidoWeb\Blocks\Snippets;

defined( 'ABSPATH' ) || exit;

/**
 * Autoloader class
 *
 * @since 1.0.0
 */
class Autoloader {

	/**
	 * The Constructor.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		spl_autoload_register( array( $this, 'autoload' ) );
	}

	/**
	 * Autoload classes
	 *
	 * @param string $class Class name.
	 * @since 1.0.0
	 */
	public function autoload( $class ) {
		if ( ! preg_match( '/^SentidoWeb\\\\Blocks\\\\Snippet/', $class ) ) {
			return;
		}
		$path = 'includes';
		$file = SENTIDOWEB_SNIPPET_BLOCK_DIR . strtolower( str_replace( [ 'SentidoWeb\\Blocks\\Snippet\\', '/', '\\' ], [ '\\' . $path . '\\', DIRECTORY_SEPARATOR, DIRECTORY_SEPARATOR ], $class ) . '.php' );
		$file = preg_replace( '/([\w]+)\.php/', 'class-$1.php', $file );
		include $file;
	}
}

new Autoloader();
