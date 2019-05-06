<?php

if ( ! function_exists('getModifyTime') ) {
    function getModifyTime(String $path, String $fileName) {
        return 'lastModify='.date('Y-m-d', filemtime($path.$fileName));
    }
}

?>