<?php
if (! class_exists('ServerStatus')) {
    defined('BASEPATH') or exit('No direct script access allowed');
    class ServerStatus extends CI_Controller
    {
        public function __construct(Type $var = null)
        {
            parent::__construct();
            $this->load->library('session');
        }
        
        private function checkFileExists(string $head, string $body, string $foot) : bool
        {
            $ext = '.php';
            return file_exists(VIEWPATH.$head.$ext) && file_exists(VIEWPATH.$body.$ext) && file_exists(VIEWPATH.$foot.$ext);
        }
        
        private function renderUI($saveValue) : array
        {
            $retArr = null;
            if ($saveValue) {
                $retArr = $saveValue;
            } else {
                $serviceList = [
                    'Server ' => [], 'MySQL ' => [],
                    'APACHE ' => [], 'NGINX ' => []
                ];
                $action = [
                    'Start', 'Restart', 'Off', 'Status'
                ];
                $flag = true;
                for ($i = 0, $passStatus = null, $serviceKey = array_keys($serviceList) , $actionLen = count($action) , $serviceLen = count($serviceList); $i < $serviceLen; $i++) {
                    for ($j = 0; $j < $actionLen; $j++) {
                        $passStatus = $serviceKey[$i] === $serviceKey[0] && $action[$j] === $action[$actionLen - 1];
                        $passStart = $serviceKey[$i] === $serviceKey[0] && $action[$j] === $action[0];
                        if ($passStatus || $passStart) {
                            continue;
                        } else {
                            if ($serviceKey[$i] === $serviceKey[0]) {
                                if ($flag) {
                                    array_push($serviceList[$serviceKey[$i]], 'Web Shell');
                                    $flag = false;
                                }
                            }
                            array_push($serviceList[$serviceKey[$i]], $serviceKey[$i].$action[$j]);
                        }
                    }
                }
                $this->session->set_userdata('statusRenderValue', $serviceList);
                $retArr = $serviceList;
            }
            
            return $retArr;
        }
        
        public function index()
        {
            if ($this->checkFileExists('status/head', 'status/body', 'status/footer')) {
                $load = $this->load;
                $staticPath = realpath('../html/static').'/';
                $basePath = $staticPath.'base/';
                $load->helper('file');
                if ($this->session->isLogin) {
                    $cfg = $this->config;
                    $staticFile = [
                        'head' => [
                            'css' => [
                                'reset' => $cfg->site_url('static/base/reset.css').'?ver=1.6.1&'.getModifyTime($basePath, 'reset.css'),
                                'font' => $cfg->site_url('static/base/font.css').'?ver=1.0.0&'.getModifyTime($basePath, 'font.css'),
                                'style' =>  $cfg->site_url('static/status/css/style.css').'?ver=1.0.0&'.getModifyTime($staticPath.'status/css/', 'style.css')
                            ]
                        ],
                        'body' => [
                            'data' => [
                                'UI' => $this->renderUI($this->session->statusRenderValue)
                            ]
                        ],
                        'footer' => [
                            'js' => [
                                'res' => $cfg->site_url('static/base/res.js').'?ver=1.0.0&'.getModifyTime($staticPath.'base/', 'res.js'),
                                
                                'const' => $cfg->site_url('static/command/js/const.js').'?ver=1.0.0&'.getModifyTime($staticPath.'command/js/', 'const.js'),
                                'commandHelper' => $cfg->site_url('static/command/js/commandHelper.js').'?ver=1.0.0&'.getModifyTime($staticPath.'command/js/', 'servicePipe.js'),
                                'servicePipe' => $cfg->site_url('static/command/js/servicePipe.js').'?ver=1.0.0&'.getModifyTime($staticPath.'command/js/', 'servicePipe.js'),
                                'status' => $cfg->site_url('static/status/js/render.js').'?ver=1.0.0&'.getModifyTime($staticPath.'status/js/', 'render.js'),
                                'slideToggle' => $cfg->site_url('static/status/js/slideToggle.js'.'?ver=1.0.0&'.getModifyTime($staticPath.'status/js/', 'slideToggle.js')),
                                'd3' => $cfg->site_url('static/status/js/d3.min.js'.'?ver=1.0.0&'.getModifyTime($staticPath.'status/js/', 'd3.min.js')),
                                'gaugeChart' => $cfg->site_url('static/status/js/gaugeChart.js'.'?ver=1.0.0&'.getModifyTime($staticPath.'status/js/', 'gaugeChart.js')),
                                'main' => $cfg->site_url('static/status/js/main.js').'?ver=1.0.0&'.getModifyTime($staticPath.'status/js/', 'main.js')
                            ]
                        ]
                    ];
                    
                    $load->view('status/head', $staticFile['head']);
                    $load->view('status/body', $staticFile['body']);
                    $load->view('status/footer', $staticFile['footer']);
                } else {
                    $load->helper('url');
                    redirect('/', 'refresh');
                }
            } else {
                show_404();
            }
        }
    }
}
