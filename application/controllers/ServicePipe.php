<?php
defined('BASEPATH') OR exit('No direct script access allowed');
if ( ! class_exists('ServicePipe') ) {
    
    class ServicePipe extends CI_Controller {
        
        function __construct() {
            parent::__construct();
            $this->load->library('session');
            $this->load->helper('ajax');
            $this->load->helper('file');
        }


        public function getServiceName() {
            $service = trimPost('');

            
        }


    }
}
?>