<?php

if (!class_exists('Main')) {
    defined('BASEPATH') or exit('No direct script access allowed');

    class Main extends CI_Controller
    {
        private $appPath = null;
        private $staticPath = null;
        private $commonBasePath = null;
        private $jsFilePath = null;
        private $cssFilePath = null;

        public function __construct()
        {
            parent::__construct();

            $this->load->library('session');
            $this->load->helper('ajax');
            $this->load->helper('file');
            $this->load->library('json');

            $this->appPath = APPPATH.'views/';
            $this->staticPath = realpath('./static/').'/';
            $this->commonBasePath = $this->staticPath.'base/';

            $this->jsFilePath = $this->staticPath.'main/js/';
            $this->cssFilePath = $this->staticPath.'main/css/';
        }

        private function allArrayKeyExists(array $dataArr): bool
        {
            $arrKeys = [
                'serverAddress',
                'serverPort',
                'userId',
                'userPassword',
            ];

            return !(bool) count(array_diff($arrKeys, $dataArr));
        }

        private function setSessionArray(array $reqData)
        {
            $this->session->set_userdata(array_merge([
                'isLogin' => true,
                'pwd'     => false,
            ], $reqData));
        }

        public function index()
        {
            $mainPath = $this->appPath.'main/';
            $headPath = $mainPath.'head.php';
            $bodyPath = $mainPath.'body.php';
            $footPath = $mainPath.'foot.php';

            $staticPath = './static/';

            $baseStaticPath = $staticPath.'base/';
            $mainStaticPath = $staticPath.'main/';

            $commonAbosolutePath = $this->commonBasePath;

            $staticFile = [
                'head' => [
                    'css' => [
                        'reset'    => $baseStaticPath.'reset.css?ver=1.6.1&'.getModifyTime($commonAbosolutePath, 'reset.css'),
                        'font'     => $baseStaticPath.'font.css?ver=1.0.0&'.getModifyTime($commonAbosolutePath, 'font.css'),
                        'jConfirm' => $baseStaticPath.'jConfirm/confirm.css?ver=3.3.0&'.getModifyTime($commonAbosolutePath, 'jConfirm/confirm.css'),
                        'style'    => $mainStaticPath.'css/style.css?ver=1.0.1&'.getModifyTime($this->cssFilePath, 'style.css'),
                    ],
                ],
                'body' => [
                    'data'=> [
                        'actionUrl' => $this->config->site_url('Main/authUserData'),
                        'img'       => [
                            'user' => $mainStaticPath.'img/user.png?ver=1.0.0&lastModify=2018-12-30',
                        ],
                    ],
                ],
                'foot' => [
                    'js' => [
                        'jQuery'   => $baseStaticPath.'jQuery.js?ver=3.3.1&'.getModifyTime($commonAbosolutePath, 'jQuery.js'),
                        'jConfirm' => $baseStaticPath.'jConfirm/confirm.js?ver=3.3.0&'.getModifyTime($commonAbosolutePath, 'jConfirm/confirm.js'),
                        'res'      => $baseStaticPath.'res.js?ver=1.0.0&'.getModifyTime($commonAbosolutePath, 'res.js'),
                        'methods'  => $mainStaticPath.'js/userData.js?ver=1.0.0&'.getModifyTime($this->jsFilePath, 'userData.js'),
                        'main'     => $mainStaticPath.'js/main.js?ver=1.0.0&'.getModifyTime($this->jsFilePath, 'main.js'),
                    ],
                ],
            ];

            if (file_exists($headPath) && file_exists($bodyPath) && file_exists($footPath)) {
                if ($this->session->isLogin) {
                    gotoPage($this->config->site_url('Command/index'));

                    return;
                }
                $this->load->view('main/head', $staticFile['head']);
                $this->load->view('main/body', $staticFile['body']);
                $this->load->view('main/foot', $staticFile['foot']);
            } else {
                show_404();
            }
        }

        private function getUserData(): array
        {
            $dataArr = [
                'serverAddress' => '',
                'serverPort'    => '',
                'userId'        => '',
                'userPassword'  => '',
            ];
            for ($i = 0, $key = array_keys($dataArr), $len = count($key); $i < $len; $i++) {
                $dataArr[$key[$i]] = trimPost($key[$i]);
            }

            return $dataArr;
        }

        private function valueIsEmpty(array $arr)
        {
            foreach ($arr as $value) {
                if (!$value) {
                    return false;
                }
            }

            return true;
        }

        private function cryptPassword(string $userPassword) : string
        {
            $retPassword = '';
            $envList = [
                'method' => getenv('method'),
                'key'    => getenv('key'),
                'vector' => getenv('iv'),
            ];

            if ($this->valueIsEmpty($envList)) {
                $retPassword = openssl_encrypt($userPassword, getenv('method'), getenv('key'), true, getenv('iv'));
            }

            return $retPassword;
        }

        public function authUserData()
        {
            if (chkPostMtd($this->input->server('REQUEST_METHOD'))) {
                $this->json->header();
                $this->load->model('ServerAuth');
                $retArr = [
                    'status' => false,
                    'code'   => -3,
                    'page'   => 'indexError',
                ];

                $dataArr = $this->getUserData();

                if ($this->allArrayKeyExists(array_keys($dataArr))) {
                    $cryptPassword = $this->cryptPassword($dataArr['userPassword']);
                    if ($cryptPassword) {
                        $retArr = $this->ServerAuth->mainMethod($dataArr);
                        if ($retArr['status']) {
                            $dataArr['userPassword'] = $cryptPassword;
                            $this->setSessionArray($dataArr);
                        }
                    } else {
                        $retArr['code'] = -6;
                    }
                }
                $this->json->echo($retArr);
            } else {
                show_404();
            }
        }
    }
}
