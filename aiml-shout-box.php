<?php
/*
 * Plugin Name: AIML Shout box
 * Version: 1.0
 * Plugin URI: https://github.com/fullbright/aiml-shout-box/
 * Description: This plugin provides a shoutbox on the wordpress website to discuss with a pandoratbot.
 * Author: Sergio AFANOU
 * Author URI: http://sergio.afanou.com/
 * Requires at least: 4.0
 * Tested up to: 4.0
 *
 * Text Domain: aiml-shout-box
 * Domain Path: /lang/
 *
 * @package WordPress
 * @author Sergio AFANOU
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

//AIML_Shout_box();
//
function aiml_shout_box_show()
{

?>

    <!-- shoutbox -->
        <div class="shout_box">
                <div class="header">Shout Box <div class="close_btn">&nbsp;</div></div>
                <div id="post_url" style="display:none;"><?php echo plugins_url('shout.php', __FILE__); ?></div>
                <div class="toggle_chat">
                        <div class="message_box">
                </div>
                <div class="user_info">
                        <input name="shout_username" id="shout_username" type="text" placeholder="Your Name" maxlength="15" />
                        <input name="shout_custid" id="shout_custid" type="text" placeholder="Your customer ID" maxlength="15" />
                                <input name="shout_message" id="shout_message" type="text" placeholder="Type Message Hit Enter" maxlength="100" />
                </div>
            </div>
        </div><!-- shoutbox end -->

    <?php
}

function aiml_shout_box_scripts()
{
    wp_enqueue_style( 'aiml_shout_box_css', plugins_url('assets/css/aiml_shout_box.css', __FILE__), array(), '1.0.0', 'all' );
    wp_enqueue_script( 'aiml_shout_box', plugins_url('assets/js/aiml_shout_box.js', __FILE__), array('jquery'), '1.0.0', true );
}

add_action('wp_enqueue_scripts', aiml_shout_box_scripts);
