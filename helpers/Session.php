<?php 

namespace Helpers;

class Session
{
    public static function _start()
    {
        session_start();
    }

    public static function _status()
    {
        dd(session_status());
    }
}

?>

