<?php

defined('BASEPATH') or exit('No direct script access allowed');
if (!class_exists('ServicePipe')) {
    class ServicePipe extends CI_Controller
    {
        private $returnArray = null;

        public function __construct()
        {
            parent::__construct();
            $this->load->library('session');

            $this->load->helper('ajax');
            $this->load->helper('file');
            $this->load->helper('command');
            $this->load->helper('idfilter');
            $this->load->library('json');

            $this->returnMessage = [
                'onlyRoot', 'canNotUsedCommand',
            ];
        }

        private function checkStatus(): bool
        {
            return $this->session->isLogin && chkPostMtd($_SERVER['REQUEST_METHOD']);
        }

        private function isServerHandled(string $service) : bool
        {
            return $service === 'ServerRestart' || $service === 'ServerOff';
        }

        public function getServiceName()
        {
            // setJsonHeader();
            $this->json->header();

            $service = trimPost('pipeCommand');

            $filterObject = new serviceFilter($service);

            $returnMessage = [
                'status'  => false,
                'code'    => false,
                'message' => null,
                'isUrl'   => false,
            ];

            if ($filterObject->filterMain()) {
                $this->load->model('ExecCommand');
                $command = $filterObject->generateCommand();

                if (isStatus($service) || isShell($service)) {
                    if (filter_var($command, FILTER_VALIDATE_URL)) {
                        $returnMessage['message'] = $command;
                        $returnMessage['status'] = true;
                        $returnMessage['code'] = true;
                        $returnMessage['isUrl'] = true;
                    } else {
                        $returnMessage = $this->ExecCommand->execUserCommand($command);
                    }
                } else {
                    if (isRoot($this->session->userId)) {
                        $returnMessage = $this->ExecCommand->execUserCommand($command);
                        if ($this->isServerHandled($service)) {
                            $returnMessage['message'] = $this->config->site_url('Command/logout');
                            $returnMessage['isUrl'] = true;
                        }
                    } else {
                        $returnMessage['message'] = $this->returnMessage[0];
                    }
                }
            } else {
                $returnMessage = $this->returnMessage[1];
            }
            $this->json->echo($returnMessage);
        }
    }
}
