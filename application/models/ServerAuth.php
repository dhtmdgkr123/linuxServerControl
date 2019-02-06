<?php
if ( ! class_exists('failConnServerException') ) {
    class failConnServerException extends Exception {
        function __construct($message, $code = -1, Exception $previous = null) {
            parent::__construct($message, $code, $previous);
        }
    }
}

if ( ! class_exists('failAuthServerException') ) {
    class failAuthServerException extends Exception {
        function __construct($message, $code = -1, Exception $previous = null) {
            parent::__construct($message, $code, $previous);
        }
    }
}


if ( ! class_exists('ServerAuth') ) {
    class ServerAuth extends CI_Model {
        private $processType = NULL;
        private $idxErr = 'indexError';
        function __construct() {
            parent::__construct();
        }

        private function authUserData($reqArr) {
            
            try {
                $retArr = [
                    'status' => FALSE,
                    'code' => 1
                ];
                $conn = ssh2_connect($reqArr['serverAddress'], $reqArr['serverPort']);
                if ( $conn === FALSE || $conn === NULL ) {
                    throw new failConnServerException('indexError', -1);
    
                } else if ( ! ssh2_auth_password($conn, $reqArr['userId'], $reqArr['userPassword']) ) {
                    throw new failAuthServerException('indexError', -2);

                } else {
                    $retArr['status'] = TRUE;
                    $retArr['link'] = $this->config->site_url('Command/index');

                }

            } catch(failConnServerException $connExcept) {
                $retArr['test'] = 'connexcept';
                $retArr['code'] = $connExcept->getCode();
                $retArr['page'] =  $connExcept->getMessage();
                
            } catch (failAuthServerException $authExcept) {
                $retArr['code'] = $authExcept->getCode();
                $retArr['page'] =  $authExcept->getMessage();

            } finally {
                return $retArr;
            }

        }
    
        public function mainMethod($dataArr) {
            return $this->authUserData($dataArr);
        }
    }
}

?>