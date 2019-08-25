<?php

class CI_TestConfig extends CI_Config
{
    public $config = [];
    public $_config_paths = [APPPATH];
    public $loaded = [];

    public function item($key, $index = '')
    {
        return isset($this->config[$key]) ? $this->config[$key] : false;
    }

    public function load($file = '', $use_sections = false, $fail_gracefully = false)
    {
        $this->loaded[] = $file;

        return true;
    }
}
