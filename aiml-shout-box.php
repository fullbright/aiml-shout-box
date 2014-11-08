<?php
/*
 * Plugin Name: AIML Shout box
 * Version: 1.0
 * Plugin URI: http://www.hughlashbrooke.com/
 * Description: This is your starter template for your next WordPress plugin.
 * Author: Hugh Lashbrooke
 * Author URI: http://www.hughlashbrooke.com/
 * Requires at least: 4.0
 * Tested up to: 4.0
 *
 * Text Domain: aiml-shout-box
 * Domain Path: /lang/
 *
 * @package WordPress
 * @author Hugh Lashbrooke
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// Load plugin class files
require_once( 'includes/class-aiml-shout-box.php' );
require_once( 'includes/class-aiml-shout-box-settings.php' );

// Load plugin libraries
require_once( 'includes/lib/class-aiml-shout-box-admin-api.php' );
require_once( 'includes/lib/class-aiml-shout-box-post-type.php' );
require_once( 'includes/lib/class-aiml-shout-box-taxonomy.php' );

/**
 * Returns the main instance of AIML_Shout_box to prevent the need to use globals.
 *
 * @since  1.0.0
 * @return object AIML_Shout_box
 */
function AIML_Shout_box () {
	$instance = AIML_Shout_box::instance( __FILE__, '1.0.0' );

	if ( is_null( $instance->settings ) ) {
		$instance->settings = AIML_Shout_box_Settings::instance( $instance );
	}

	return $instance;
}

AIML_Shout_box();
