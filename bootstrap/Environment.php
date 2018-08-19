<?php 
    class Environment {

        private static $loaded;

        public static function _load() {
            $envPath = realpath(__DIR__. "../../.env");
            $envContents = file_get_contents($envPath);

            $data = explode("\n", $envContents);

            $envObj = array();

            foreach ($data as $d) {
                // Explode the array further
                $arr = explode("=", trim($d));

                // Put it as an environment variable 
                // $envObj[$arr[0]] = $arr[1];
                putenv(sprintf('%s=%s', $arr[0], $arr[1]));
            }

            return $loaded = true;
        }

        public static function env($envVariable) {
            return getenv($envVariable);
        }
    }
?>