<?php
if ( ! class_exists('failConnServerException') ) {
    final class failConnServerException extends Exception {
        function __construct($message, $code = -1, Exception $previous = null) {
            parent::__construct($message, $code, $previous);
        }
    }
}

if ( ! class_exists('failAuthServerException') ) {
    final class failAuthServerException extends Exception {
        function __construct($message, $code = -1, Exception $previous = null) {
            parent::__construct($message, $code, $previous);
        }
    }
}


if ( ! class_exists('ServerAuth') ) {
    class ServerAuth extends CI_Model {
        // private $processType = NULL;
        private $idxErr = 'indexError';

        function __construct() {
            parent::__construct();
        }

        private function authUserData($reqArr) {
            
            try {
                
                $retArr = [
                    'status' => FALSE,
                    'code' => 1,
                    'page' => NULL
                ];

                $sshConnInfo = @ssh2_connect(
                    $reqArr['serverAddress'], 
                    intval($reqArr['serverPort'])  
                );


                if ( ! $sshConnInfo ) {
                    
                    throw new failConnServerException(
                        'indexError', -1
                    );
                } else if ( ! @ssh2_auth_password($sshConnInfo, $reqArr['userId'],$reqArr['userPassword']) ) {
                    
                    throw new failAuthServerException(
                        'indexError', -2
                    );
                } else {
                    $retArr['status'] = TRUE;
                    $retArr['page'] = $this->config->site_url('Command/index');
                }

<<<<<<< HEAD
            } catch(failConnServerException $connExcept) {
                $retArr['test'] = 'connexcept';
                $retArr['code'] = $connExcept->getCode();
                $retArr['page'] =  $connExcept->getMessage();
                
            } catch (failAuthServerException $authExcept) {
                $retArr['code'] = $authExcept->getCode();
                $retArr['page'] =  $authExcept->getMessage();
=======
            } catch (failConnServerException $catchConnectError) {
                $retArr['code'] = $catchConnectError->getCode();
                $retArr['page'] =  $catchConnectError->getMessage();

            } catch (failAuthServerException $cathAuthError) {
                $retArr['code'] = $cathAuthError->getCode();
                $retArr['page'] = $cathAuthError->getMessage();
>>>>>>> refector

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