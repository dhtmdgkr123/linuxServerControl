<?php
if ( ! class_exists('Main') ) {
    defined('BASEPATH') OR exit('No direct script access allowed');
    
    class Main extends CI_Controller {
    
        private $appPath = NULL;
    
        function __construct() {
            parent::__construct();
            $this->appPath = APPPATH.'views/';
            $this->load->library('session');
            $this->load->helper('ajax');
        }

        private function allArrayKeyExists(Array $dataArr) {
            $arrKeys = [
                'serverAddress',
                'serverPort',
                'userId',
                'userPassword'
            ];
            return ! (bool)count(array_diff($arrKeys, $dataArr));
        }
        
        private function setSessionArray(Array $reqData) {
            $this->session->set_userdata(array_merge([
                'isLogin' => TRUE
            ], $reqData));

        }
        
        public function index() {
            $mainPath = $this->appPath.'main/';
            $headPath = $mainPath.'head.php';
            $bodyPath = $mainPath.'body.php';
            $footPath = $mainPath.'foot.php';

            $staticPath = '../application/static/';
            $baseStaticPath = $staticPath.'base/';

            $mainStaticPath = $staticPath.'main/';


            $staticFile = [
                'head' => [
                    'css' => [
                        'reset' => $baseStaticPath.'reset.css?ver=1.6.1&lastModify=2018-12-30',
                        'font' => $baseStaticPath.'font.css',
                        'jConfirm' => $baseStaticPath.'jConfirm/confirm.css?ver=3.3.0&lastModify=2018-12-30',
                        'style' => $mainStaticPath.'css/style.css?ver=1.0.1&lastModify=2018-12-30'
                    ]
                ],
                'body' => [
                    'data'=> [
                        'actionUrl' => $this->config->site_url('Main/authUserData'),
                        'img' => [
                            'user' => $mainStaticPath.'img/user.png?ver=1.0.0&lastModify=2018-12-30'
                        ]
                    ]
                ],
                'foot' => [
                    'js' => [
                        'jQuery' => $baseStaticPath.'jQuery.js?ver=3.3.1&lastModify=2018-12-30',
                        'jConfirm' => $baseStaticPath.'jConfirm/confirm.js?ver=3.3.0&lastModify=2018-12-30',
                        'res' => $baseStaticPath.'res.js?ver=1.0.0&lastModify=2018-12-30',
                        'methods' => $mainStaticPath.'js/userData.js?ver=1.0.0&lastModify=2019-02-17',
                        'main' => $mainStaticPath.'js/main.js?ver=1.0.0&lastModify=2018-01-05',
                        // 'test' => filemtime($_SERVER['DOCUMENT_ROOT'].'/application/static/base/jConfirm/confirm.js'),
                        // 'asdf' => $baseStaticPath/*filemtime($baseStaticPath.'jConfirm/confirm.js')*/
                    ]
                ]
            ];
            
            if (file_exists($headPath) && file_exists($bodyPath) && file_exists($footPath)) {

                if ($this->session->isLogin) {
                    gotoPage( $this->config->site_url('Command/index') );
                    return;
                }
                $this->load->view('main/head', $staticFile['head']);
                $this->load->view('main/body', $staticFile['body']);
                $this->load->view('main/foot', $staticFile['foot']);

            } else {
                show_404();

            }
        }
        
        public function authUserData() {

            if ( chkPostMtd($_SERVER['REQUEST_METHOD']) ) {
                $this->load->model('ServerAuth');
                setJsonHeader();
                $dataArr = [
                    'serverAddress' => '',
                    'serverPort' => '',
                    'userId' => '',
                    'userPassword' => ''
                ];
                
                $retArr = [
                    'status' => FALSE,
                    'code' => -3,
                    'page' => 'indexError'
                ];
                
                for ($i = 0, $key = array_keys($dataArr), $len = count($key); $i < $len; $i++) {
                    $dataArr[$key[$i]] = trimPost($key[$i]);
                }

                if ( $this->allArrayKeyExists( array_keys($dataArr) ) ) {
                    $retArr = $this->ServerAuth->mainMethod($dataArr);
                    if ( $retArr['status'] ) {
                        $this->setSessionArray($dataArr);  
                    }
                }
                jsonEcho($retArr);
                
            } else {
                show_404();
            }
        }
    }
}
?>