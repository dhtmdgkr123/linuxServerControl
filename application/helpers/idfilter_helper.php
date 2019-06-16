<?php
if ( ! function_exists('isRoot') ) {
    function isRoot(String $userId): bool {
        return strtolower($userId) === 'root';
    }
}

?>