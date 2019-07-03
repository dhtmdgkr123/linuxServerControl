<?php

if ( ! class_exists('ExecCommand') ) {

    class ExecCommand extends CI_Model {
        private $processType = NULL;
        private $idxErr = 'indexError';
        private $userData = NULL;
        private $connInfo = NULL;
        private $processCode = NULL;

        function __construct() {
            parent::__construct();
            $this->load->library('session');
            $this->load->helper('idfilter');

            $this->processCode = (object)[
                'failConnect' => -1,
                'ok' => 1,
                'failGetStream' => -2
            ];
            $this->userData = (object)[
                'serverAddress' => $this->session->serverAddress,
                'serverPort' => $this->session->serverPort,
                'userId' => $this->session->userId,
                'userPassword' => $this->session->userPassword
            ];    
        }
        
        public function printWorkingDir($cachePwd): Array {
            $retArr = [
                'status' => FALSE,
                'code' => $this->processCode->failConnect,
                'page' => 'getPwd'
            ];

            if ($cachePwd) {
                $retArr['code'] = $this->processCode->ok;
                $retArr['status'] = TRUE;
                $retArr['message'] = $cachePwd;
            } else {
                $connInfo = $this->getConnect();
                if ( $this->isNotConnect($connInfo) ) {
                    return $retArr;
                }
    
                $getStreamRlt = $this->execCommand($connInfo, 'pwd');
                if ( $getStreamRlt ) {
                    $retArr['code'] = $this->processCode->ok;
                    $retArr['status'] = TRUE;
                    $userId = $this->userData->userId;
                    $setDefaultPath = $userId.'@'.$this->userData->serverAddress.' : '.$getStreamRlt;
                    if ( isRoot($userId) ) {
    
                        $retArr['message'] = $setDefaultPath.' #';
                    } else {
    
                        $retArr['message'] = $setDefaultPath.' $';
                    }
                    $this->session->set_userdata('pwd', $retArr['message']);

                } else {
                    $retArr['code'] = $this->processCode->failGetStream;
                }
            }
            return $retArr;
            
        }



        private function decryptPassword(String $userPassword) {
            return openssl_decrypt($userPassword, getenv('method'), getenv('key'), TRUE, getenv('iv'));
        }
        
        private function getConnect() {
            $connInfo = ssh2_connect(
                $this->userData->serverAddress,
                $this->userData->serverPort
            );
            
            if ( ! $connInfo ) {
                return FALSE;
            } else {
                ssh2_auth_password($connInfo, $this->userData->userId, $this->decryptPassword($this->userData->userPassword));
                return $connInfo;
            }
        }


        public function FunctionName(String $id) {
            # code...
        }

        private function execCommand($link, $cmd): String {
            $getStream = ssh2_exec( $link, $cmd );
            
            $getStdout = ssh2_fetch_stream($getStream, SSH2_STREAM_STDIO);
            $getErrout = ssh2_fetch_stream($getStream, SSH2_STREAM_STDERR);

            stream_set_blocking($getStdout, TRUE);
            stream_set_blocking($getErrout, TRUE);
            
            $getStdout = stream_get_contents($getStdout);
            
            if ($getStdout) {
                return trim($getStdout);
            } else {
                return trim(stream_get_contents($getErrout));
            }
        }
        
        private function isNotConnect($link) {
            return ! $link;
        }
        
        public function execUserCommand($command): Array {
            
            $retArr = [
                'status' => FALSE,
                'code' => $this->processCode->failConnect,
                'page' => 'execCommand',
            ];

            $connInfo = $this->getConnect();
            if ( $this->isNotConnect($connInfo) ) {
                return $retArr;
            }

            $getStreamRlt = $this->execCommand($connInfo, $command);
            if ( $getStreamRlt ) {
                $retArr['status'] = TRUE;
                $retArr['code'] = $this->processCode->ok;
                $retArr['message'] = $getStreamRlt;
                
            } else {
                $retArr['code'] = $this->processCode->failGetStream;
            }
            
            return $retArr;
        }
    }
}

?>