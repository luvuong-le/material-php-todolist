<?php 

/** Start Session */
session_start();

/** Load Bootstrap File */
require '../bootstrap/Bootstrap.php';

/** Start the Slim Application  */
$app->run();
?>