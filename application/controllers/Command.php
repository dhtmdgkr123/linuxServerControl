<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Command extends CI_Controller {
    
    private $appPath = NULL;
    
    function __construct() {
        parent::__construct();
        $this->load->library('session');
        $this->load->helper('ajax');
        $this->appPath = APPPATH.'views/';
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
                    'logout' => $this->config->site_url('Command/logout'),
                    'img' => [
                        'user' => 'test.png'
                    ]
                ]
            ],
            'foot' => [
                'js' => [
                    'jQuery' => $baseStaticPath.'jQuery.js?ver=3.3.1&lastModify=2018-12-30',
                    // 'jConfirm' => $baseStaticPath.'jConfirm/test.js',
                    'jConfirm' => $baseStaticPath.'jConfirm/confirm.js?ver=3.3.0&lastModify=2018-12-30',
                    'res' => $baseStaticPath.'res.js?ver=1.0.0&lastModify=2018-12-30',
                    'uiHelper' => $commandPath.'js/uiHelper.js?ver=1.0.0&lastModify=2019-01-05',
                    'main' => $commandPath.'js/main.js?ver=1.0.0&lastModift=2019-01-05'
                ]
            ]

        ];


        if (file_exists($headPath) && file_exists($bodyPath) && file_exists($footPath)) {

            if ( ! $this->session->isLogin ) {
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
        if ( chkPostMtd($_SERVER['REQUEST_METHOD']) && $this->session->isLogin ) {
            setJsonHeader();
            $this->load->model('ExecCommand');
            jsonEcho (
                $this->ExecCommand->printWorkingDir()
            );
        }
    }

    public function getUserCommand() {
        if ( chkPostMtd($_SERVER['REQUEST_METHOD']) && $this->session->isLogin ) {
            setJsonHeader();
            $this->load->model('ExecCommand');
            
        }
    }
}
?>