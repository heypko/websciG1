<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'ncspcastatutereference');

/** MySQL database username */
define('DB_USER', 'statute_admin');

/** MySQL database password */
define('DB_PASSWORD', 'NCSPCAadmin38!');

/** MySQL hostname */
define('DB_HOST', 'mysqlcluster8.registeredsite.com');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         't^^^u/y2JQ(A({_rg2$~B5C6L&vE.pv_n3W fb->?C!JE5i$Y?#qf0[)fz]m9 bV');
define('SECURE_AUTH_KEY',  '+7)Yi]gy^x.+vjz&J4Qufv@+kJUj*A 96}m!g)<.W{1Jq2$<$wFH~l$zYx1-a.+|');
define('LOGGED_IN_KEY',    '5X==)UOPz|}>XJ4xkm~V&G{hm3%W6?x}t!tU$D5wQ!S;`)^pa.)p$#M={wlL|OWE');
define('NONCE_KEY',        'SLZs_DB!WK?j`9-XpLSQ Ibv$[f8u7`<hWx|E&[eM!pd0.&^!!MY#ghoUo[qpJ4.');
define('AUTH_SALT',        ':q>n2^*cNj%w,t@Kjl|+0K!GBwFb61[`i)yz94};Ad3#|B?wR*~<=XYulKy8Y6HV');
define('SECURE_AUTH_SALT', 'h|wgIA]}iE<s<Lo9%<Kl+#<1#7`j!L)@}VVkd@YVM-+9Z?1P/HI[|p{T/Z$wbfT6');
define('LOGGED_IN_SALT',   '^>j/FP_n*?D<+5MDKwbRn@-C1Z/S1np%T/)AJ%CL(i.1-&{6rF%u0:62V&muEp?>');
define('NONCE_SALT',       'FcHm#PEUH^mYngYxi3b$53ibt[k&luOYj&FkgEpG-0(ib9c`k_A@5thlvB{Wq&<M');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
