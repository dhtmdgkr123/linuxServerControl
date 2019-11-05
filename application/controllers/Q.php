<?php
use GuzzleHttp\Client;
if(! class_exists('Q')) {
    defined('BASEPATH') or exit('No direct script access allowed');
    class Q extends CI_Controller
    {
        public function __construct()
        {
            parent::__construct();
            $this->load->library('Queue');
        }
        public function index()
        {
            $client = new Client();
            
            $r = $client->request('GET', 'http://172.30.0.7:81/Exec/execCommand')
                        ->getBody();
            var_dump($r);
        }
    }
}