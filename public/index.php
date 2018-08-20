<?php 

use Helpers\Session;

/** Load Bootstrap File */
require '../bootstrap/Bootstrap.php';

Session::_start();

/** Start the Slim Application  */
$app->run();
?>