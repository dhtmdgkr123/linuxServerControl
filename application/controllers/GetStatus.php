<?php
if ( ! class_exists('GetStatus') ) {
    class GetStatus extends CI_Controller {
        function __construct(Type $var = null) {
            parent::__construct();
            $this->load->library('session');
            $this->load->library('json');
            $this->load->helper('idFilter');
            if ( ! $this->session->isLogin ) {
                $this->load->helper('url');
                redirect($this->config->base_url(), 'refresh');
            }
        }
        
        private function setServerInfoCahche(Array $info) {
            $this->session->set_userdata('infoCache', $info);
        }
        
        private function castBoolean(String $boolVal) : bool {
            return strtolower($boolVal) === 'true' ? TRUE : FALSE;
        }
        
        private function renderTemplate(bool $isRoot) : String {
            $url = $this->config->site_url('Command');
            $template = [
                'root'   => "<a href='{$url}'><div id='root' class='flex_align logo_height_set logo_img'></div></a>",
                'unRoot' => "<a href='{$url}'><div id='unroot' class='flex_align logo_height_set logo_img'></div></a>"
            ];
            return $isRoot ? $template['root'] : $template['unRoot'];

        }

        private function dfParser(String $dfResult) : Array {
            if ( ! function_exists('replaceAll') ) {
                function replaceAll(Array $pattern, String $target) : String {
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
                'Mounted on' => 'MountedOn',
                '%' => ''
            ];
            $diskInfo = preg_split('/\s+/', replaceAll($patternArray, trim($dfResult)));
            foreach ( $diskInfo as $k => $v) {
                if ( $k <= 6 ) {
                    array_push($titleArray, $v);
                } else {
                    if ( $counter !== 0 && (! ($counter % 7)) ) {
                        $counter = 0;
                        $arrayKeyCounter += 1;
                    }
                    $rltArray[$arrayKeyCounter][$titleArray[$counter++]] = is_numeric($v) ? intval($v) : $v;
                }
            }
            return $rltArray;
        }


        public function asdf() : void {
            // @TODO : add optional, require
            $setting = [
                'depenDency' => [
                    // 'bc', 'mpstat', // im-sensors
                    'require' => [
                        'bc', 'mpstat',
                    ],
                    'option' => [
                        'im-sensors','testPackage'
                    ]
                ],
                'response' => [
                    "status" => 'TRUE',
                    "ip" => '$ipAddress',
                    "diskUsagePercent" => '$diskPercent',
                    "ramUsagePercent" => '$ramPercent',
                    "diskInfo" => '$diskInfo',
                    "hostName" => '$userInfo',
                    "cpuUsage" => '$cpuUsage'
                ],
                'commandList' => [
                    'option' => [
                        'asdf=$(asdfasdf df df)'
                    ],
                    'ip'           => 'ipAddress=$(ifconfig | head -2 | tail -1 | awk \'{print $2}\' | cut -f 2 -d ":")',
                    'diskUsagePer' => "diskPercent=$(df -P | grep -v ^Filesystem | awk '{total += $2; used += $3} END {printf(\"%.2f\",used/total * 100.0)}')",
                    'ramUsagePer'  => "ramPercent=$(free | grep Mem | awk '{ printf(\"%.2f\",$3/$2 * 100.0) }')",
                    'hostInfo'     => "userInfo=$(hostname)",
                    'cpuUsage'     => "cpuUsage=$(mpstat | tail -1 | awk '{printf(\"%.2f\",100-$13)}')",
                    'diskInfo'     => "diskInfo=$(df -T -P -h)",
                ]
            ];
            
            // $this->load->model('ExecCommand');
            $this->load->library('GenerateCommand', $setting);
            // echo ;
            $this->generatecommand->main();
            
            // $getCommandResult = $this->ExecCommand->execUserCommand($this->generatecommand->main());
            // if ( $getCommandResult['status'] ) {
            //     $getCommandResult = json_decode( $getCommandResult['message'], TRUE);
            //     $getCommandResult['status'] = $this->castBoolean($getCommandResult['status']);
            //     if ( $getCommandResult['status'] ) {
            //         $getCommandResult['diskInfo'] = $this->dfParser($getCommandResult['diskInfo']);
            //     }
            // }
            // return $getCommandResult;
        }

        private function getServerInfo() : Array {
            // @TODO : add optional, require
            // $setting = [
            //     'depenDency' => [
            //         'require' => [
            //             'bc', 'mpstat', // im-sensors
            //         ],
            //         'option' => [
            //             'im-sensors',
            //         ]
            //     ],
            //     'response' => [
            //         "status" => 'TRUE',
            //         "ip" => '$ipAddress',
            //         "diskUsagePercent" => '$diskPercent',
            //         "ramUsagePercent" => '$ramPercent',
            //         "diskInfo" => '$diskInfo',
            //         "hostName" => '$userInfo',
            //         "cpuUsage" => '$cpuUsage'
            //     ],
            //     'commandList' => [
            //         'ip'           => 'ipAddress=$(ifconfig | head -2 | tail -1 | awk \'{print $2}\' | cut -f 2 -d ":")',
            //         'diskUsagePer' => "diskPercent=$(df -P | grep -v ^Filesystem | awk '{total += $2; used += $3} END {printf(\"%.2f\",used/total * 100.0)}')",
            //         'ramUsagePer'  => "ramPercent=$(free | grep Mem | awk '{ printf(\"%.2f\",$3/$2 * 100.0) }')",
            //         'hostInfo'     => "userInfo=$(hostname)",
            //         'cpuUsage'     => "cpuUsage=$(mpstat | tail -1 | awk '{printf(\"%.2f\",100-$13)}')",
            //         'diskInfo'     => "diskInfo=$(df -T -P -h)",
            //     ]
            // ];


            $setting = [
                'depenDency' => [
                    'bc', 'mpstat', // im-sensors
                ],
                'response' => [
                    "status" => 'TRUE',
                    "ip" => '$ipAddress',
                    "diskUsagePercent" => '$diskPercent',
                    "ramUsagePercent" => '$ramPercent',
                    "diskInfo" => '$diskInfo',
                    "hostName" => '$userInfo',
                    "cpuUsage" => '$cpuUsage'
                ],
                'commandList' => [
                    'ip'           => 'ipAddress=$(ifconfig | head -2 | tail -1 | awk \'{print $2}\' | cut -f 2 -d ":")',
                    'diskUsagePer' => "diskPercent=$(df -P | grep -v ^Filesystem | awk '{total += $2; used += $3} END {printf(\"%.2f\",used/total * 100.0)}')",
                    'ramUsagePer'  => "ramPercent=$(free | grep Mem | awk '{ printf(\"%.2f\",$3/$2 * 100.0) }')",
                    'hostInfo'     => "userInfo=$(hostname)",
                    'cpuUsage'     => "cpuUsage=$(mpstat | tail -1 | awk '{printf(\"%.2f\",100-$13)}')",
                    'diskInfo'     => "diskInfo=$(df -T -P -h)",
                ]
            ];

            $this->load->model('ExecCommand');
            $this->load->library('GenerateCommand', $setting);
            
            $getCommandResult = $this->ExecCommand->execUserCommand($this->generatecommand->main());
            if ( $getCommandResult['status'] ) {
                $getCommandResult = json_decode( $getCommandResult['message'], TRUE);
                $getCommandResult['status'] = $this->castBoolean($getCommandResult['status']);
                if ( $getCommandResult['status'] ) {
                    $getCommandResult['diskInfo'] = $this->dfParser($getCommandResult['diskInfo']);
                }
            }
            return $getCommandResult;
        }


        public function renderMainInfo() {
            $this->json->header();
            $retArray = [
                'status' => FALSE,
                'message' => NULL
            ];
            if ( $this->session->isLogin ) {
                $retArray['status'] = TRUE;
                $retArray['message']['userTemplate'] = $this->renderTemplate(isRoot($this->session->userId));
                $retArray['message']['serverInfo'] = $this->getServerInfo();
                // $this->setServerInfoCahche($retArray['message']);
                // if ( $this->sesson->infoCache ) {
                //     if (  )
                // } else {

                // }

            } else {
                $retArray['message'] = $this->config->base_url();
            }
            $this->json->echo($retArray);
        }


    }
    
}