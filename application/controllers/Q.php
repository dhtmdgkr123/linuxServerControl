<?php
if(! class_exists('Q')) {
    defined('BASEPATH') or exit('No direct script access allowed');
    class Q extends CI_Controller
    {
        public function __construct()
        {
            parent::__construct();
            $this->load->library('Queue');
        }
        
    }
}