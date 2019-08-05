<?php

if (!function_exists('getModifyTime')) {
    function getModifyTime(string $path, string $fileName): string
    {
        return 'lastModify='.date('Y-m-d', filemtime($path.$fileName));
    }
}
