<?php 

    /** Define constants with paths */
    DEFINE("APP_ROOT", realpath(__DIR__. '/../'));
    DEFINE("MODELS_PATH", realpath(APP_ROOT. '/models'));

    /** Import Utility Functions */
    require_once APP_ROOT . '/vendor/autoload.php';
    require_once APP_ROOT . '/helpers/utils.php';

    /** Initialize Classes */
    require_once __DIR__ . '/Environment.php';

    /** Initialize Twig Templating Engine */
    require_once APP_ROOT . '/config/Slim.php';
    require_once APP_ROOT . '/routes/web.php';


    // Run Slim Application
    $app->run();
?>