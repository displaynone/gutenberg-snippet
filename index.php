<?php //@codingStandardsIgnoreLine
/**
 * Snippets Block
 *
 * @package SentidoWeb/Blocks/Snippet
 *
 * Plugin Name: Snippets Block
 * Plugin URI: https://github.com/displaynone/
 * Description: Allows to add snippets blocks to your content: Javascript, CSS, HTML...
 * Author: Luis Sacristán
 * Author URI: https://sentidoweb.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: sw-snippet
 * Domain Path: /languages
 */

/**
 * Copyright (C) 2019  Luis Sacristán
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 3, as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

namespace SentidoWeb\Blocks\Snippet;

// Abort if this file is called directly.
if ( ! defined( 'WPINC' ) ) {
	die;
}

// Constants.
define( 'SENTIDOWEB_SNIPPET_BLOCK_ROOT', __FILE__ );
define( 'SENTIDOWEB_SNIPPET_BLOCK_DIR', __DIR__ );
define( 'SENTIDOWEB_SNIPPET_BLOCK_PREFIX', 'snippet_block' );

require __DIR__ . '/includes/class-autoloader.php';

use SentidoWeb\Blocks\Snippet\Blocks\Main as MainBlock;

/**
 * The main loader for this plugin
 */
class Main {

	/**
	 * Run all of the plugin functions.
	 *
	 * @since 1.0.0
	 */
	public function run() {

		/**
		 * Load Text Domain
		 */
		load_plugin_textdomain( 'snippet-block', false, SENTIDOWEB_SNIPPET_BLOCK_ROOT . '\languages' );

		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ) );
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_block_assets' ) );

		/**
		 * Load Classes
		 *
		 * Load all the other classes that this plugin needs to run.
		 */
		$this->includes();
	}

	/**
	 * Block Assets.
	 *
	 * Assets that load on on the Gutenberg 'Save' and Admin view. If you want
	 * certain assets to only load on the front end, wrap them in a `is_admin` conditional.
	 *
	 * @since 1.0.0
	 */
	public function enqueue_block_editor_assets() {

		$scripts    = 'assets/js/blocks.js';
		$hightlight = 'assets/libraries/js/highlight.min.js';
		$styles     = 'assets/css/blocks.css';

		$webpack_server_http_scripts_root   = 'http://localhost:3000';
		$webpack_server_http_scripts_a_file = $webpack_server_http_scripts_root . '/blocks.js';

		// phpcs:disable
		if ( @file_get_contents( $webpack_server_http_scripts_a_file ) !== false ) {
			wp_enqueue_script( 'webpack_hmr', $webpack_server_http_scripts_a_file, [], 1, true );
		}
		// phpcs:enable

		wp_enqueue_script(
			'snippet-block-block',
			plugins_url( $scripts, __FILE__ ),
			[ 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ],
			filemtime( plugin_dir_path( __FILE__ ) . $scripts ),
			true
		);

		// Enqueue Styles.
		wp_enqueue_style(
			'snippet-block-block',
			plugins_url( $styles, __FILE__ ),
			[],
			filemtime( plugin_dir_path( __FILE__ ) . $styles )
		);
	}

	/**
	 * Loads frontend and backend scripts
	 */
	public function enqueue_block_assets() {
		$scripts = 'assets/js/frontend.js';
		wp_enqueue_script(
			'sw-hightlight',
			plugins_url( $hightlight, __FILE__ ),
			[],
			'9.15.6',
			true
		);
		wp_enqueue_style(
			'sw-hightlight',
			'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/dark.min.css',
			[],
			'9.15.6'
		);
		wp_enqueue_script(
			'snippet-block-block',
			plugins_url( $scripts, __FILE__ ),
			[],
			filemtime( plugin_dir_path( __FILE__ ) . $scripts ),
			true
		);
	}

	/**
	 * Include Classes
	 */
	public function includes() {

		// Instantiate Classes.
		$activator   = new Activator();
		$deactivator = new Deactivator();
		$uninstaller = new Uninstaller();

		// Run Code.
		$activator->run();   // Run code on activation.
		$deactivator->run(); // Run code on deactivation.
		$uninstaller->run(); // Run code on uninstallation.

		// PHP in Blocks.
		new MainBlock();
	}
}

$main = new Main();
$main->run();
