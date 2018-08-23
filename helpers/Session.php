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

    public static function _set($name, $data)
    {
        $_SESSION[$name] = $data;
    }

    public static function _get($name)
    {
        return $_SESSION[$name];
    }

    public static function _user($var, $field)
    {
        if (count($_SESSION) !== 0 && $_SESSION[$var]) {
            return $_SESSION[$var][$field];
        }

    }

    public static function _unset($name)
    {
        unset($_SESSION[$name]);
    }
}

?>

