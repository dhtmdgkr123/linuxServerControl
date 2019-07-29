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
            // $diskInfo = ;
            foreach ( preg_split('/\s+/', replaceAll($patternArray, trim($dfResult))) as $k => $v) {
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



        private function isJson(String $resultArray) : bool {
            json_decode($resultArray);
            return json_last_error() === JSON_ERROR_NONE;
        }


        private function getCpuAvgTemp(String $value) {
            if ( ! function_exists('tempAvg') )  {
                function tempAvg(Array $arr) : Int {
                    return (array_reduce($arr, function($first, $secondVal){
                        return (intval($first)) + (intval($secondVal));
                    }) / 1000) / count($arr);
                }
            }

            return $this->isJson($value) ? $value : tempAvg(explode(' ', $value));
            
        }




        private function recoverType(Array $resultArray) : Array {
            
            for ($i = 0, $key = array_keys($resultArray), $len = count($resultArray); $i < $len; $i++) {
                $resultArray[$key[$i]] = is_numeric($resultArray[$key[$i]]) ? $resultArray[$key[$i]] + 0 : (! is_array( $resultArray[$key[$i]] )) && $this->isJson( $resultArray[$key[$i]] ) ? json_decode( $resultArray[$key[$i]], TRUE) : $resultArray[$key[$i]];
            }
            return $resultArray;
        }


        
        
        private function getServerInfo() : Array {

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
                        'sensors', //'testPackage'
                    ]
                ],
                'commandList' => [
                    'option' => [
                        'cpuTemp'   => '$(cat /sys/devices/virtual/thermal/thermal_zone*/temp)',
                        // 'testPackage' => '$(asdfasdf df df)'
                    ],
                    
                    'ipAddress'    => '$(ifconfig | head -2 | tail -1 | awk \'{print $2}\' | cut -f 2 -d ":")',
                    'diskPercent'  => "$(df -P | grep -v ^Filesystem | awk '{total += $2; used += $3} END {printf(\"%.2f\",used/total * 100.0)}')",
                    'ramPercent'   => "$(free | grep Mem | awk '{ printf(\"%.2f\",$3/$2 * 100.0) }')",
                    'userInfo'     => "$(hostname)",
                    'cpuUsage'     => "$(mpstat | tail -n +4 | awk -v cpuCnt=\"$(mpstat | head -1 | awk '{print $6}' | cut -c2)\" -v sum=0 '{sum+=$13} END {printf(\"%.2f\", 100-(sum/cpuCnt))}')",
                    'diskInfo'     => "$(df -T -P -h)",
                ]
            ];
            
            $this->load->model('ExecCommand');
            $this->load->library('GenerateCommand', $setting);
            
            $getCommandResult = $this->ExecCommand->execUserCommand( $this->generatecommand->main() );
                       
            if ( $getCommandResult['status'] ) {
                $getCommandResult = json_decode( $getCommandResult['message'], TRUE);
                if ( $getCommandResult['status'] ) {
                    
                    $getCommandResult['cpuTemp'] = $this->getCpuAvgTemp($getCommandResult['cpuTemp']);
                    
                    $getCommandResult['diskInfo'] = $this->dfParser($getCommandResult['diskInfo']);
                    $getCommandResult = $this->recoverType($getCommandResult);
                }
            }
            
            return $getCommandResult;
        }


        public function interValServerInfo() : void {
            $this->json->header();
            $setting = [
                'depenDency' => [
                    // 'bc', 'mpstat', // im-sensors
                    'require' => [
                        'bc', 'mpstat',
                    ],
                    'option' => [
                        // 'im-sensors','testPackage'
                        'sensors', //'testPackage'
                    ]
                ],
                'commandList' => [
                    'option' => [
                        'cpuTemp'   => '$(cat /sys/devices/virtual/thermal/thermal_zone*/temp)',
                        // 'testPackage' => '$(asdfasdf df df)'
                    ],
                    
                    'diskPercent'  => "$(df -P | grep -v ^Filesystem | awk '{total += $2; used += $3} END {printf(\"%.2f\",used/total * 100.0)}')",
                    'ramPercent'   => "$(free | grep Mem | awk '{ printf(\"%.2f\",$3/$2 * 100.0) }')",
                    'cpuUsage'     => "$(mpstat | tail -n +4 | awk -v cpuCnt=\"$(mpstat | head -1 | awk '{print $6}' | cut -c2)\" -v sum=0 '{sum+=$13} END {printf(\"%.2f\", 100-(sum/cpuCnt))}')",

                ]
            ];

            $this->load->model('ExecCommand');
            $this->load->library('GenerateCommand', $setting);
            
            $getCommandResult = $this->ExecCommand->execUserCommand( $this->generatecommand->main() );
            
            if ( $getCommandResult['status'] ) {
                $getCommandResult = json_decode( $getCommandResult['message'], TRUE);
                if ( $getCommandResult['status'] ) {
                    
                    $getCommandResult['cpuTemp'] = $this->getCpuAvgTemp($getCommandResult['cpuTemp']);
                    $getCommandResult = $this->recoverType($getCommandResult);
                
                }
            }
            
            $this->json->echo($getCommandResult);
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
                
                if ( ! $retArray['message']['serverInfo']['status'] ) {
                    $retArray['message']['url'] = $this->config->site_url('Command');
                }
            } else {
                $retArray['message'] = $this->config->base_url();
            }
            
            $this->json->echo($retArray);
        }


    }
    
}