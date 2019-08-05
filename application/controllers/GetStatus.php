<?php

if (!class_exists('GetStatus')) {
    class GetStatus extends CI_Controller
    {
        public function __construct(Type $var = null)
        {
            parent::__construct();
            $this->load->library('session');
            $this->load->library('json');
            $this->load->helper('idFilter');
            if (!$this->session->isLogin) {
                $this->load->helper('url');
                redirect($this->config->base_url(), 'refresh');
            }
        }

        private function setServerInfoCahche(array $info)
        {
            $this->session->set_userdata('infoCache', $info);
        }

        private function castBoolean(string $boolVal) : bool
        {
            return strtolower($boolVal) === 'true' ? true : false;
        }

        private function renderTemplate(bool $isRoot) : string
        {
            $url = $this->config->site_url('Command');
            $template = [
                'root'   => "<a href='{$url}'><div id='root' class='flex_align logo_height_set logo_img'></div></a>",
                'unRoot' => "<a href='{$url}'><div id='unroot' class='flex_align logo_height_set logo_img'></div></a>",
            ];

            return $isRoot ? $template['root'] : $template['unRoot'];
        }

        private function dfParser(string $dfResult) : array
        {
            if (!function_exists('replaceAll')) {
                function replaceAll(array $pattern, string $target) : string
                {
                    foreach ($pattern as $key => $value) {
                        $target = str_replace($key, $value, $target);
                    }

                    return $target;
                }
            }
            $rltArray = [];
            $titleArray = [];
            $counter = 0;
            $arrayKeyCounter = 0;
            $patternArray = [
                '1024-blocks' => 'Size',
                'Mounted on'  => 'MountedOn',
                '%'           => '',
            ];
            // $diskInfo = ;
            foreach (preg_split('/\s+/', replaceAll($patternArray, trim($dfResult))) as $k => $v) {
                if ($k <= 6) {
                    array_push($titleArray, $v);
                } else {
                    if ($counter !== 0 && (!($counter % 7))) {
                        $counter = 0;
                        $arrayKeyCounter += 1;
                    }
                    $rltArray[$arrayKeyCounter][$titleArray[$counter++]] = is_numeric($v) ? intval($v) : $v;
                }
            }

            return $rltArray;
        }

        private function recoverType(array $resultArray) : array
        {
            if (!function_exists('isJson')) {
                function isJson(string $data) : bool
                {
                    json_decode($data);

                    return json_last_error() === JSON_ERROR_NONE;
                }
            }
            for ($i = 0, $key = array_keys($resultArray), $len = count($resultArray); $i < $len; $i++) {
                $resultArray[$key[$i]] = is_numeric($resultArray[$key[$i]]) ? $resultArray[$key[$i]] + 0 : (!is_array($resultArray[$key[$i]])) && isJson($resultArray[$key[$i]]) ? json_decode($resultArray[$key[$i]], true) : $resultArray[$key[$i]];
            }

            return $resultArray;
        }

        private function getServerInfo() : array
        {
            $setting = [
                'depenDency' => [
                    // 'bc', 'mpstat', // im-sensors
                    'require' => [
                        // package name
                        'bc', 'mpstat',
                    ],
                    'option' => [
                        // package name
                        // 'im-sensors','testPackage'
                        'im-sensors', //'testPackage'
                    ],
                ],
                'commandList' => [
                    'option' => [
                        'imSensors'   => '$(ls -a)',
                        // 'testPackage' => '$(asdfasdf df df)'
                    ],
                    'ipAddress'    => '$(ifconfig | head -2 | tail -1 | awk \'{print $2}\' | cut -f 2 -d ":")',
                    'diskPercent'  => "$(df -P | grep -v ^Filesystem | awk '{total += $2; used += $3} END {printf(\"%.2f\",used/total * 100.0)}')",
                    'ramPercent'   => "$(free | grep Mem | awk '{ printf(\"%.2f\",$3/$2 * 100.0) }')",
                    'userInfo'     => '$(hostname)',
                    'cpuUsage'     => "$(mpstat | tail -n +4 | awk -v cpuCnt=\"$(mpstat | head -1 | awk '{print $6}' | cut -c2)\" -v sum=0 '{sum+=$13} END {printf(\"%.2f\", 100-(sum/cpuCnt))}')",
                    'diskInfo'     => '$(df -T -P -h)',
                ],
            ];

            $this->load->model('ExecCommand');
            $this->load->library('GenerateCommand', $setting);
            if (!$this->session->firstInfoCommand) {
                $this->session->set_userdata('firstInfoCommand', $this->generatecommand->main());
            }

            $getCommandResult = $this->ExecCommand->execUserCommand($this->generatecommand->main());

            if ($getCommandResult['status']) {
                $getCommandResult = json_decode($getCommandResult['message'], true);
                if ($getCommandResult['status']) {
                    $getCommandResult['diskInfo'] = $this->dfParser($getCommandResult['diskInfo']);
                    $getCommandResult = $this->recoverType($getCommandResult);
                }
            }

            return $getCommandResult;
        }

        public function interValServerInfo() : void
        {
            $this->json->header();
            $setting = [
                'depenDency' => [
                    // 'bc', 'mpstat', // im-sensors
                    'require' => [
                        'bc', 'mpstat',
                    ],
                    'option' => [
                        // 'im-sensors','testPackage'
                        'im-sensors', //'testPackage'
                    ],
                ],
                'commandList' => [
                    'option' => [
                        'imSensors'   => '$(ls -a)',
                        // 'testPackage' => '$(asdfasdf df df)'
                    ],

                    'diskPercent'  => "$(df -P | grep -v ^Filesystem | awk '{total += $2; used += $3} END {printf(\"%.2f\",used/total * 100.0)}')",
                    'ramPercent'   => "$(free | grep Mem | awk '{ printf(\"%.2f\",$3/$2 * 100.0) }')",
                    'cpuUsage'     => "$(mpstat | tail -n +4 | awk -v cpuCnt=\"$(mpstat | head -1 | awk '{print $6}' | cut -c2)\" -v sum=0 '{sum+=$13} END {printf(\"%.2f\", 100-(sum/cpuCnt))}')",

                ],
            ];

            $this->load->model('ExecCommand');
            $this->load->library('GenerateCommand', $setting);
            if (!$this->session->intervalCommand) {
                $this->session->set_userdata('intervalCommand', $this->generatecommand->main());
            }
            $getCommandResult = $this->ExecCommand->execUserCommand($this->session->intervalCommand);

            if ($getCommandResult['status']) {
                $getCommandResult = json_decode($getCommandResult['message'], true);
                if ($getCommandResult['status']) {
                    $getCommandResult = $this->recoverType($getCommandResult);
                }
            }
            // print_r($getCommandResult);
            $this->json->echo($getCommandResult);
        }

        public function renderMainInfo()
        {
            $this->json->header();
            $retArray = [
                'status'  => false,
                'message' => null,
            ];
            if ($this->session->isLogin) {
                $retArray['status'] = true;
                $retArray['message']['userTemplate'] = $this->renderTemplate(isRoot($this->session->userId));
                $retArray['message']['serverInfo'] = $this->getServerInfo();

                if (!$retArray['message']['serverInfo']['status']) {
                    $retArray['message']['url'] = $this->config->site_url('Command');
                }
            } else {
                $retArray['message'] = $this->config->base_url();
            }
            $this->json->echo($retArray);
        }
    }
}
