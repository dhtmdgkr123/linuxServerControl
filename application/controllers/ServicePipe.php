<?php
defined('BASEPATH') OR exit('No direct script access allowed');
if ( ! class_exists('ServicePipe') ) {
    
    class ServicePipe extends CI_Controller {
        
        function __construct() {

            parent::__construct();
            $this->load->library('session');
            $this->load->helper('ajax');
            $this->load->helper('file');
            $this->load->helper('command');
        }


        private function checkStatus() {
            return $this->session->isLogin && chkPostMtd($_SERVER['REQUEST_METHOD']);
        }
        
        public function getServiceName() {
            $service = trimPost('test');
            
            if ($this->checkStatus()) {
                if ( (new serviceFilter($service))->filterMain() ) {
                     
                }
            } else {

                show_404();
            }
        }
    }
}
?>