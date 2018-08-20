<?php
function dd($data)
{
    echo " <style>
                pre {
                    font-size: 1.3em;
                    background: rgba(0, 150, 245, 0.4);
                    color: crimson;
                    padding: 1em;
                    font-family: 'Fira Code', sans-serif;
                    font-weight: bold;
                }
            </style> ";

    if (gettype($data) === 'object' || gettype($data) === 'array') {
        echo "<pre>";
        echo "Results\n\n";
        highlight_string("<?php\n" . var_export($data, true) . "\n?>");
        echo "</pre>";
    } else {
        echo "<pre>";
        echo "Results\n\n";
        var_export($data);
        echo "</pre>";
    }

    die();
}

function env($envVariable)
{
    return Environment::env($envVariable);
}

?>