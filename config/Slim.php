<?php
$config = ['settings' => [
    'addContentLengthHeader' => false,
    'displayErrorDetails' => true, // set to false in production

        // Monolog settings
    'logger' => [
        'name' => 'MList',
        'path' => APP_ROOT . '/logs/app.log',
    ],
]];

$app = new \Slim\App($config);

$container = $app->getContainer();

    // Register component on container
$container['view'] = function ($container) {
    $view = new \Slim\Views\Twig(APP_ROOT . '/templates', [
            // 'cache' => APP_ROOT . '/bootstrap/cache'
        'cache' => false,
        'auto_reload' => true
    ]);

        // Instantiate and add Slim specific extension
    $basePath = rtrim(str_ireplace('index.php', '', $container->get('request')->getUri()->getBasePath()), '/');
    $view->addExtension(new Slim\Views\TwigExtension($container->get('router'), $basePath));

    return $view;
};

$container['db'] = function ($c) {
    $db = DatabaseHandler::getInstance();
    $dbConnection = DatabaseHandler::getConnection();
    return $dbConnection;
};

$container['model'] = function ($c) {
    $User = new User();
    return [
        'User' => $User
    ];
};

$container['UserController'] = function ($c) {
    return new app\controllers\UserController($c);
}
?>