<<<<<<< HEAD
<?php

if ( ! function_exists('getModifyTime') ) {
    function getModifyTime(String $path, String $fileName): String {
        return 'lastModify='.date('Y-m-d', filemtime($path.$fileName));
    }
}

=======
<?php

if ( ! function_exists('getModifyTime') ) {
    function getModifyTime(String $path, String $fileName): String {
        return 'lastModify='.date('Y-m-d', filemtime($path.$fileName));
    }
}

>>>>>>> refector
?>