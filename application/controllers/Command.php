<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Command extends CI_Controller {
    
    private $appPath = NULL;
    private $mainJsPath = NULL;
    private $commonJsPath = NULL;
    private $returnCode = NULL;


    function __construct() {
        parent::__construct();
        $this->load->library('session');
        $this->load->helper('ajax');
        
        $this->appPath = APPPATH.'views/';
        $this->jsFilePath = APPPATH.'static/command/js/';
        $this->commonJsPath = APPPATH.'static/base/';
        
        $this->returnValue = [
            1 => '',
            -1 => 'please type command',
            'block' => 'blocked Command'
        ];
        
    }

    private function chkStatus() {
        return $this->session->isLogin && chkPostMtd($_SERVER['REQUEST_METHOD']);
    }

    private function isNotLogin() {
        return ! $this->session->isLogin;
    }
    
    public function logout() {
        $userData = $this->session->all_userdata();
        foreach ($userData as $key => $value) {
            if ($key !== 'session_id' && $key !== 'ip_address' && $key !== 'user_agent' && $key !== 'last_activity') {
                $this->session->unset_userdata($key);
            }
        }
        $this->session->sess_destroy();
        gotoPage('/');
    }

    

	public function index() {
        $mainPath = $this->appPath.'commandMain/';
        $headPath = $mainPath.'head.php';
        $bodyPath = $mainPath.'body.php';
        $footPath = $mainPath.'foot.php';
        $staticPath = '../application/static/';
        $baseStaticPath = $staticPath.'base/';
        $commandPath = $staticPath.'command/';
        
        $staticFile = [
            'head' => [
                'css' => [
                    'reset' => $baseStaticPath.'reset.css?ver=1.6.1&lastModify=2018-12-30',
                    'font' => $baseStaticPath.'font.css',
                    'jConfirm' => $baseStaticPath.'jConfirm/confirm.css?ver=3.3.0&lastModify=2018-12-30',
                    'style' => $staticPath.'command/css/style.css'
                ]
            ],
            'body' => [
                'data'=> [
                    'action' => $this->config->site_url('Command/commandMainProcess'),
                    'logout' => $this->config->site_url('Command/logout'),
                    'img' => [
                        'user' => 'test.png'
                    ]
                ]
            ],
            'foot' => [
                'js' => [
                    'jQuery' => $baseStaticPath.'jQuery.js?ver=3.3.1&lastModify='.date('Y-m-d', filemtime($this->commonJsPath.'jQuery.js')),
                    'jConfirm' => $baseStaticPath.'jConfirm/confirm.js?ver=3.3.0&lastModify='.date('Y-m-d', filemtime($this->commonJsPath.'jConfirm/confirm.js')),
                    'res' => $baseStaticPath.'res.js?ver=1.0.0&lastModify='.date('Y-m-d', filemtime($this->commonJsPath.'res.js')),
                    'uiHelper' => $commandPath.'js/uiHelper.js?ver=1.0.0&lastModify='.date('Y-m-d', filemtime($this->jsFilePath.'uiHelper.js')),
                    'const' => $commandPath.'js/const.js?ver=1.0.0&lastModift='.date('Y-m-d', filemtime($this->jsFilePath.'const.js')),
                    'main' => $commandPath.'js/main.js?ver=1.0.0&lastModift='.date('Y-m-d', filemtime($this->jsFilePath.'main.js')),
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
    
    public function getPwd() {

        if ( $this->chkStatus() ) {
            setJsonHeader();
            $this->load->model('ExecCommand');
            jsonEcho (
                $this->ExecCommand->printWorkingDir()
            );
        }
    }

    
    
    public function commandMainProcess() {
        if ( $this->chkStatus() ) {
            setJsonHeader();
            $filter = [
                'shutdown' => 'shutdown -h now',
                'reboot' => 'reboot'
            ];

            $returnArray = [
                'status' => FALSE,
                'code' => -1,
                'message' => ''
            ];
            
            $data = $this->getUserCommand();
            if ( ! $data ) {
                $returnArray['message'] = $this->returnValue[$returnArray['code']];
                jsonEcho( $returnArray );
            }

            $filterResult = $this->filterCommand($data);
            
            if ( $filterResult['status'] === FALSE ) {
                if ($filterResult['key'] === 'block') {
                    $returnArray['message'] = $this->returnValue[$filterResult['key']];
                    jsonEcho($returnArray);
                } else {
                    $data['command'] = $filter[$filterResult['key']];
                }
            }
            
            $this->load->model('ExecCommand');
            jsonEcho( $this->ExecCommand->execUserCommand($data['command']) );
        }
    }


    private function isSplit($action) {
        $isReboot = 'reboot';
        return $action !== 'reboot';
    }
    
    private function filterCommand($inputData) {
        $this->load->helper('command');
        $blocked = 'block';
        $flagArray = [
            'status' => TRUE,
            'key' => ''
        ];
        $blockData = getBlockCommand();
        if (array_key_exists($inputData['action'], $blockData)) {
            $checkData = $this->isSplit($inputData['action']) ? explode(' ', $inputData['command'])[0] : $inputData['command'];
            $flagArray['key'] = $checkData;
            for ($i = 0, $blockData = $blockData[$inputData['action']], $len = count($blockData); $i < $len; $i++) {
                if ($blockData[$i] === $checkData) {
                    $flagArray['status'] = FALSE;
                    $flagArray['key'] = $inputData['action'];
                    return $flagArray;
                }
            }
        }
        return $flagArray;
    }

    
    

    private function getUserCommand() {
        $data = [
            'type' => '',
            'action' => '',
            'command' => '',
        ];
        
        for ($i = 0, $arrK = array_keys($data), $len = count($arrK); $i < $len; $i++) {
            $postDataTmp = trimPost($arrK[$i]);
            if ($postDataTmp) {
                $data[$arrK[$i]] = $postDataTmp;
            } else {
                return FALSE;
            }
        }
        return $data;
    }
}
?>