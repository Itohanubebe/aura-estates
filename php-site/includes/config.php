<?php
declare(strict_types=1);

// Copy this file's values to match your hosting environment.
// Never commit real credentials to a public repository.

define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'aurelis');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '');
define('DB_CHARSET', 'utf8mb4');

// Public base URL of the /public folder, no trailing slash.
define('SITE_URL', getenv('SITE_URL') ?: '');
define('SITE_NAME', 'Aurelis');

// Absolute paths
define('APP_ROOT', dirname(__DIR__));
define('UPLOAD_DIR', APP_ROOT . '/public/uploads');
define('UPLOAD_URL', SITE_URL . '/uploads');

define('MAX_UPLOAD_BYTES', 6 * 1024 * 1024);
define('ITEMS_PER_PAGE', 9);

date_default_timezone_set('UTC');
