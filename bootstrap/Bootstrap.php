<?php 

/** Define constants with paths */
DEFINE("APP_ROOT", realpath(__DIR__ . '/../'));
DEFINE("MODELS_PATH", realpath(APP_ROOT . '/models'));

/** Import Utility Functions */
require_once APP_ROOT . '/vendor/autoload.php';

require_once APP_ROOT . '/helpers/utils.php';

/** Initialize Classes */
require_once APP_ROOT . '/config/Environment.php';
Environment::_load();

/** Initialize Session */
require_once APP_ROOT . '/helpers/Session.php';

/** Initialize Database */
require_once APP_ROOT . '/database/Database.php';
DatabaseHandler::getInstance();

/** Initialize Models */
require_once MODELS_PATH . '/User.php';
require_once MODELS_PATH . '/Todo.php';

require_once APP_ROOT . '/app/controllers/BaseController.php';
require_once APP_ROOT . '/app/controllers/UserController.php';

/** Initialize Twig Templating Engine */
require_once APP_ROOT . '/config/Slim.php';
require_once APP_ROOT . '/routes/web.php';
require_once APP_ROOT . '/routes/api.php';

?>