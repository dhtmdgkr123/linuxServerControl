<?php

if (!function_exists('isRoot')) {
    function isRoot(string $userId) :bool
    {
        return strtolower($userId) === 'root';
    }
}
