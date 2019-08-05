<?php

if (!class_exists('failConnServerException')) {
    final class failConnServerException extends Exception
    {
        public function __construct($message, $code = -1, Exception $previous = null)
        {
            parent::__construct($message, $code, $previous);
        }
    }
}

if (!class_exists('failAuthServerException')) {
    final class failAuthServerException extends Exception
    {
        public function __construct($message, $code = -1, Exception $previous = null)
        {
            parent::__construct($message, $code, $previous);
        }
    }
}

if (!class_exists('ServerAuth')) {
    class ServerAuth extends CI_Model
    {
        // private $processType = NULL;
        private $idxErr = 'indexError';

        public function __construct()
        {
            parent::__construct();
        }

        private function authUserData($reqArr)
        {
            try {
                $retArr = [
                    'status' => false,
                    'code'   => 1,
                    'page'   => null,
                ];

                $sshConnInfo = @ssh2_connect(
                    $reqArr['serverAddress'],
                    intval($reqArr['serverPort'])
                );

                if (!$sshConnInfo) {
                    throw new failConnServerException(
                        'indexError', -1
                    );
                } elseif (!@ssh2_auth_password($sshConnInfo, $reqArr['userId'], $reqArr['userPassword'])) {
                    throw new failAuthServerException(
                        'indexError', -2
                    );
                } else {
                    $retArr['status'] = true;
                    $retArr['page'] = $this->config->site_url('Command');
                }
            } catch (failConnServerException $catchConnectError) {
                $retArr['code'] = $catchConnectError->getCode();
                $retArr['page'] = $catchConnectError->getMessage();
            } catch (failAuthServerException $cathAuthError) {
                $retArr['code'] = $cathAuthError->getCode();
                $retArr['page'] = $cathAuthError->getMessage();
            } finally {
                if (!$retArr['page']) {
                    $retArr['code'] = -5;
                }

                return $retArr;
            }
        }

        public function mainMethod($dataArr)
        {
            return $this->authUserData($dataArr);
        }
    }
}
