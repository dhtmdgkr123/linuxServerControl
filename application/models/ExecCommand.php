<?php

if (!class_exists('ExecCommand')) {
    defined('BASEPATH') or exit('No direct script access allowed');
    class ExecCommand extends CI_Model
    {
        private $processType = null;
        private $idxErr = 'indexError';
        private $userData = null;
        private $connInfo = null;
        private $processCode = null;

        public function __construct()
        {
            parent::__construct();
            $this->load->library('session');
            $this->load->helper('idFilter');

            $this->processCode = (object) [
                'failConnect'   => -1,
                'ok'            => 1,
                'failGetStream' => -2,
            ];
            $this->userData = (object) [
                'serverAddress' => $this->session->serverAddress,
                'serverPort'    => $this->session->serverPort,
                'userId'        => $this->session->userId,
                'userPassword'  => $this->session->userPassword,
            ];
        }

        public function printWorkingDir($cachePwd): array
        {
            $retArr = [
                'status' => false,
                'code'   => $this->processCode->failConnect,
                'page'   => 'getPwd',
            ];

            if ($cachePwd) {
                $retArr['code'] = $this->processCode->ok;
                $retArr['status'] = true;
                $retArr['message'] = $cachePwd;
            } else {
                $connInfo = $this->getConnect();
                if ($this->isNotConnect($connInfo)) {
                    return $retArr;
                }

                $getStreamRlt = $this->execCommand($connInfo, 'pwd');
                if ($getStreamRlt) {
                    $retArr['code'] = $this->processCode->ok;
                    $retArr['status'] = true;
                    $userId = $this->userData->userId;
                    $setDefaultPath = $userId.'@'.$this->userData->serverAddress.' : '.$getStreamRlt;
                    if (isRoot($userId)) {
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

        private function decryptPassword(string $userPassword)
        {
            return openssl_decrypt($userPassword, getenv('method'), getenv('key'), true, getenv('iv'));
        }

        private function getConnect()
        {
            $connInfo = ssh2_connect(
                $this->userData->serverAddress,
                $this->userData->serverPort
            );

            if (!$connInfo) {
                return false;
            } else {
                ssh2_auth_password($connInfo, $this->userData->userId, $this->decryptPassword($this->userData->userPassword));

                return $connInfo;
            }
        }

        private function execCommand($link, $cmd): string
        {
            $getStream = ssh2_exec($link, $cmd);

            $getStdout = ssh2_fetch_stream($getStream, SSH2_STREAM_STDIO);
            $getErrout = ssh2_fetch_stream($getStream, SSH2_STREAM_STDERR);

            stream_set_blocking($getStdout, true);
            stream_set_blocking($getErrout, true);

            $getStdout = stream_get_contents($getStdout);

            if ($getStdout) {
                return trim($getStdout);
            } else {
                return trim(stream_get_contents($getErrout));
            }
        }

        private function isNotConnect($link)
        {
            return !$link;
        }

        public function execUserCommand($command): array
        {
            $retArr = [
                'status' => false,
                'code'   => $this->processCode->failConnect,
                'page'   => 'execCommand',
            ];

            $connInfo = $this->getConnect();
            if ($this->isNotConnect($connInfo)) {
                return $retArr;
            }

            $getStreamRlt = $this->execCommand($connInfo, $command);
            if ($getStreamRlt) {
                $retArr['status'] = true;
                $retArr['code'] = $this->processCode->ok;
                $retArr['message'] = $getStreamRlt;
            } else {
                $retArr['code'] = $this->processCode->failGetStream;
            }

            return $retArr;
        }
    }
}
