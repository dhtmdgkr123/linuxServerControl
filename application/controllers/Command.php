<?php
defined('BASEPATH') OR exit('No direct script access allowed');
if ( ! class_exists('Command') ) {
    class Command extends CI_Controller {
        private $appPath = NULL;
        private $mainJsPath = NULL;
        private $commonStaticPath = NULL;
        private $returnCode = NULL;
        private $returnArray = NULL;
        private $statusArray = NULL;
        
        function __construct() {
            parent::__construct();
    
            $this->load->library('session');
            $this->load->library('json');
            $this->load->helper('ajax');
            $this->load->helper('file');
            
            $this->staticPath = realpath('./static').'/';
            $this->jsFilePath = $this->staticPath.'command/js/';
            $this->commonStaticPath = $this->staticPath.'base/';
            
            $this->statusArray = ['blocked', 'success'];
            $this->returnValue = [ $this->statusArray[0] => -1 ];
            $this->returnArray = [
                'status' => FALSE,
                'ok' => TRUE,
                'code' => 0
            ];
        }
        
        private function chkStatus(): bool {
            return $this->session->isLogin && chkPostMtd($this->input->server('REQUEST_METHOD'));
        }
    
        private function isNotLogin(): bool {
            return ! $this->session->isLogin;
        }
        
        private function renderServiceCommand($saveValue) : Array {
            $retArr = NULL;
            
            if ( $saveValue ) {
                $retArr = $saveValue;
            } else {
                $categoryList = ['Server' => [], 'MySQL' => [], 'APACHE' => [], 'NGINX' => [] ];
                $serviceList = [
                    ['ion-android-arrow-dropright-circle', ' Start'],
                    ['ion-android-refresh', ' Restart'],
                    ['ion-android-alert', ' Off'],
                    ['ion-heart', ' Status']
                ];
                $tmp = $serviceList;
                for ($i = 0, $categoryKey = array_keys($categoryList), $categoryListLen = count($categoryKey), $serviceListLen = count($serviceList); $i < $categoryListLen; $i++) {
                    for ($j = 0; $j < $serviceListLen; $j++) {
                        $serviceList[$j][1] = $categoryKey[$i].$serviceList[$j][1];
                    }
                    $categoryList[$categoryKey[$i]] = $serviceList;
                    $serviceList = $tmp;
                    if ($categoryList[$categoryKey[$i]][0][1] === $categoryKey[0].$tmp[0][1]) {
                        array_shift($categoryList[$categoryKey[$i]]);
                    }
                }
                $this->session->set_userdata('commandRenderValue', $categoryList);
                $retArr = $categoryList;
            }

            return $retArr;
        }
        
        public function logout() : void {
            $userData = $this->session->all_userdata();
            foreach ($userData as $key => $value) {
                if ($key !== 'session_id' && $key !== 'ip_address' && $key !== 'user_agent' && $key !== 'last_activity') {
                    $this->session->unset_userdata($key);
                }
            }
            $this->session->sess_destroy();
            gotoPage('/');
        }
        
        public function index() : void {
            
            $mainPath = VIEWPATH.'commandMain/';
            $headPath = $mainPath.'head.php';
            $bodyPath = $mainPath.'body.php';
            $footPath = $mainPath.'foot.php';
            $staticPath = '/static/';
            $baseStaticPath = $staticPath.'base/';
            $commandPath = $staticPath.'command/';

            $staticFile = [
                'head' => [
                    'css' => [
                        'reset' => $baseStaticPath.'reset.css?ver=1.6.1&'.getModifyTime($this->commonStaticPath, 'reset.css'),
                        'font' => $baseStaticPath.'font.css?'.getModifyTime($this->commonStaticPath, 'font.css'),
                        'jConfirm' => $baseStaticPath.'jConfirm/confirm.css?ver=3.3.0&'.getModifyTime($this->commonStaticPath, 'jConfirm/confirm.css'),
                        'style' => $staticPath.'command/css/style.css'
                    ]
                ],
                'body' => [
                    'data'=> [
                        'action' => $this->config->site_url('Command/commandMainProcess'),
                        'logout' => $this->config->site_url('Command/logout'),
                        'img' => [
                            'user' => 'test.png'
                        ],
                        'admin' => $this->renderServiceCommand($this->session->commandRenderValue),
                    ]
                ],
                'foot' => [
                    'js' => [  
                        'jQuery' => $baseStaticPath.'jQuery.js?ver=3.3.1&'.getModifyTime($this->commonStaticPath, 'jQuery.js'),
                        'jConfirm' => $baseStaticPath.'jConfirm/confirm.js?ver=3.3.0&'.getModifyTime($this->commonStaticPath, 'jConfirm/confirm.js'),
                        'res' => $baseStaticPath.'res.js?ver=1.0.0&'.getModifyTime($this->commonStaticPath, 'res.js'),
                        'const' => $commandPath.'js/const.js?ver=1.0.0&'.getModifyTime($this->jsFilePath, 'const.js'),
                        'uiHelper' => $commandPath.'js/uiHelper.js?ver=1.0.0&'.getModifyTime($this->jsFilePath, 'uiHelper.js'),
                        'commandHelper' => $commandPath.'js/commandHelper.js?ver=1.0.0&'.getModifyTime($this->jsFilePath, 'commandHelper.js'),
                        'servicePipe' => $commandPath.'js/servicePipe.js?ver=1.0.0&'.getModifyTime($this->jsFilePath, 'servicePipe.js'),
                        'main' => $commandPath.'js/main.js?ver=1.0.0&'.getModifyTime($this->jsFilePath, 'main.js'),
                    ]
                ]
            ];
            
            if (file_exists($headPath) && file_exists($bodyPath) && file_exists($footPath)) {
                
                if ( $this->isNotLogin() ) {
                    gotoPage('/');
                    return;
                }
                
                $this->load->view('commandMain/head', $staticFile['head']);
                $this->load->view('commandMain/body', $staticFile['body']);
                $this->load->view('commandMain/foot', $staticFile['foot']);
                
            } else {
                show_404();
            }
            
        }
        
        public function getPwd() : void {
            $this->load->model('ExecCommand');
            $this->json->header();
            $this->json->echo( $this->ExecCommand->printWorkingDir($this->session->pwd) );
            // if ( $this->chkStatus() ) {
            // } else {
            //     show_404();
            // }
        }
        
        public function commandMainProcess() : void {
            if ( $this->chkStatus() ) {
                $this->json->header();
                $data = $this->getUserCommand();
                $retArr = NULL;
                if ( ( !($data)) && $this->filterCommand($data) ) {
                    $this->returnArray['code'] = $this->returnValue[$this->statusArray[0]];
                    $retArr = $this->returnArray;
                } else {
                    $this->load->model('ExecCommand');
                    $retArr = $this->ExecCommand->execUserCommand($data);
                }
                $this->json->echo($retArr);
    
            } else {
                show_404();
            }
        }
        
        private function filterCommand(String $data): bool {
            $this->load->helper('command');
            return (new commandFilter($data))->filterMain();
        }
        
        private function getUserCommand() : String {
            $postDataTmp = trimPost('command');
            return $postDataTmp ? $postDataTmp : '';
        }
    }

}
?>