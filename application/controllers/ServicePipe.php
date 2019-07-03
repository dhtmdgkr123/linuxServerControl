<?php
defined('BASEPATH') OR exit('No direct script access allowed');
if ( ! class_exists('ServicePipe') ) {
    class ServicePipe extends CI_Controller {

        private $returnArray = NULL;

        function __construct() {
            parent::__construct();
            $this->load->library('session');

            
            $this->load->helper('ajax');
            $this->load->helper('file');
            $this->load->helper('command');
            $this->load->helper('idfilter');

            $this->returnMessage = [
                'onlyRoot', 'canNotUsedCommand'
            ];
        }
        
        
        private function checkStatus(): bool {
            return $this->session->isLogin && chkPostMtd($_SERVER['REQUEST_METHOD']);
        }

        private function isServerHandled(String $service) : bool {
            return $service === 'ServerRestart' || $service === 'ServerOff';
        }
        
        public function getServiceName() {
            setJsonHeader();
            $service = trimPost('test');

            $filterObject = new serviceFilter($service);
            
            $returnMessage = [
                'status' => FALSE,
                'code' => FALSE,
                'message' => NULL,
                'isUrl' => FALSE
            ];
            
            if ( $filterObject->filterMain() ) {
                $this->load->model('ExecCommand');
                $command = $filterObject->generateCommand();
                if (isStatus($service)) {
                    
                    if (filter_var($command, FILTER_VALIDATE_URL)) {
                        $returnMessage['message'] = $command;
                        $returnMessage['status'] = TRUE;
                        $returnMessage['code'] = TRUE;
                        $returnMessage['isUrl'] = TRUE;
                    } else {
                        $returnMessage = $this->ExecCommand->execUserCommand($command);
                    }
                } else {
                    if ( isRoot($this->session->userId) ) {
                        $returnMessage = $this->ExecCommand->execUserCommand($command);
                        if ($this->isServerHandled($service)) {
                            $returnMessage['message'] = $this->config->site_url('Command/logout');
                            $returnMessage['isUrl'] = TRUE;
                        }
                    } else {
                        $returnMessage['message'] = $this->returnMessage[0];
                    }
                }
            } else {
                $returnMessage = $this->returnMessage[1];
            }
            jsonEcho($returnMessage);
        }
    }
}
?>