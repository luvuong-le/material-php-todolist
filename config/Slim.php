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

// Register provider
$container['flash'] = function () {
    return new \Slim\Flash\Messages();
};
?>