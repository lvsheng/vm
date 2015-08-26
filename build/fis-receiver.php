<?php

@error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);

function mkdirs($path, $mod = 0777)
{
    if (is_dir($path)) {
        return chmod($path, $mod);
    } else {
        $old = umask(0);
        if (mkdir($path, $mod, true) && is_dir($path)) {
            umask($old);
            return true;
        } else {
            umask($old);
        }
    }
    return false;
}

function checkFile($path)
{
    if (file_exists($path)) {
        unlink($path);
    } else {
        $dir = dirname($path);
        if (!file_exists($dir)) {
            mkdirs($dir);
        }
    }
}


if ($_POST['to']) {
    $to = urldecode($_POST['to']);
    if (is_dir($to) || $_FILES["file"]["error"] > 0) {
        if ($_FILES['file']['size'] == 0) {
            checkFile($to);
            echo touch($to) ? 0 : 1;
            exit;
        }
        header("Status: 500 Internal Server Error");
    } else {
        checkFile($to);
        echo move_uploaded_file($_FILES["file"]["tmp_name"], $to) ? 0 : 1;
    }
} else {
    echo 'I\'m ready for that, you know.';
}
