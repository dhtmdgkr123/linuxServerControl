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
        


        private function castBoolean(String $boolVal) : bool {
            return strtolower($boolVal) === 'true' ? TRUE : FALSE;
        }


        private function renderTemplate() : Array {
            $url = $this->config->site_url('Command');
            return [
                'root'   => "<a href='{$url}'><div id='root' class='flex_align logo_height_set logo_img'></div></a>",
                'unRoot' => "<a href='{$url}'><div id='unroot' class='flex_align logo_height_set logo_img'></div></a>"
            ];
        }
        
        private function dfParser(String $dfResult) : Array {
            $rltArray = [];
            $titleArray = [];
            $counter = 0;
            $arrayKeyCounter = 0;
            $diskInfo = preg_split('/\s+/', str_replace("1024-blocks", "Size", str_replace("Mounted on", "MountedOn", str_replace("%", "", trim($dfResult)))));
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
        
        public function getServerInfo() {
            $this->json->header();
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
                    'diskInfo'     => "diskInfo=$(df -T -P)",
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

            $this->json->echo($getCommandResult);
        }


        public function checkRootId(){
            $this->json->header();

            $retArray = [
                'stat' => FALSE,
                'message' => NULL
            ];
            $url = $this->config->site_url('Command');
            if ( $this->session->isLogin ) {
                
                $template = $this->renderTemplate();
                $retArray['message'] = isRoot($this->session->userId) ? $template['root'] : $template['unRoot'];
                $retArray['stat'] = TRUE;

            } else {
                $retArray['message'] = $this->config->base_url();

            }
            $this->json->echo($retArray);
        }   
    }
    
}