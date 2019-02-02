<?php

if ( ! class_exists('ExecCommand') ) {

    class ExecCommand extends CI_Model {
        private $processType = NULL;
        private $idxErr = 'indexError';
        private $userData = NULL;
        private $connInfo = NULL;


        function __construct() {
            
            parent::__construct();
            $this->load->library('session');
            
            $this->userData = (object)[
                'serverAddress' => $this->session->serverAddress,
                'serverPort' => $this->session->serverPort,
                'userId' => $this->session->userId,
                'userPassword' => $this->session->userPassword
            ];

            

        }

        


        private function getConnect() {
            $connInfo = ssh2_connect(
                $this->userData->serverAddress,
                $this->userData->serverPort
            );
            
            if ( ! $connInfo ) {
                return FALSE;
            } else {
                ssh2_auth_password($connInfo, $this->userData->userId, $this->userData->userPassword);
                return $connInfo;
            }

        }

        private function execCommand($link, $cmd) {
            $getStream = ssh2_exec(
                $link , $cmd
            );
            
            $getStdout = ssh2_fetch_stream($getStream, SSH2_STREAM_STDIO);
            $getErrout = ssh2_fetch_stream($getStream, SSH2_STREAM_STDERR);

            stream_set_blocking($getStdout, TRUE);
            stream_set_blocking($getErrout, TRUE);
            
            $getStdout = stream_get_contents($getStdout);
            
            if ($getStdout) {
                return trim($getStdout);

            } else {
                return trim(
                    stream_get_contents($getErrout)
                );

            }

        }
        

        private function isRoot(String $userId) {
            return $userId === 'ROOT' || $userId === 'root';
        }

        public function printWorkingDir() {
            
            $retArr = [
                'status' => FALSE,
                'code' => -1,
                'page' => 'getPwd'
            ];
            
            $connInfo = $this->getConnect();
            if ( ! $connInfo ) {
                return $retArr;
            }
            
            $getStreamRlt = $this->execCommand(
                $connInfo, 'pwd'
            );

            if ( $getStreamRlt ) {
                $retArr['code'] = 1;
                $retArr['status'] = TRUE;
                $userId = $this->userData->userId;
                $setDefaultPath = $userId.'@'.$this->userData->serverAddress.' : '.$getStreamRlt;
                if ( $this->isRoot($userId) ) {

                    $retArr['message'] = $setDefaultPath.' #';
                } else {

                    $retArr['message'] = $setDefaultPath.' $';
                }
                
            }
            return $retArr;
            
        }

        private function checkCommand() {
            $haltCommand = [
                'shutdown', 'halt'
            ];


        }

        public function execUserCommand($command) {

        }



        
    }

}

?>