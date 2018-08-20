<?php 

use Helpers\Session;

Session::_start();

/** Load Bootstrap File */
require '../bootstrap/Bootstrap.php';

/** Start the Slim Application  */
$app->run();
?>