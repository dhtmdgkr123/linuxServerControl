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
        



        private function renderTemplate() {
            $url = $this->config->site_url('Command');
            return [
                'root'   => "<a href='{$url}'><div id='root' class='flex_align logo_height_set logo_img'></div></a>",
                'unRoot' => "<a href='{$url}'><div id='unroot' class='flex_align logo_height_set logo_img'></div></a>"
            ];
        }


        private function bashJson(Array $arr) {
            $str = '{';
            $t = 'TRUE';
            $f = 'FALSE';
            foreach ($arr as $key => $value) {
                if ( $value === TRUE ) {
                    $str .= "\\\"".$key."\\\"".":\\\"".$t."\\\",";
                } else if ( $value === FALSE ) {
                    $str .= "\\\"".$key."\\\"".":\\\"".$f."\\\",";
                } else {
                
                    $str .= "\\\"".$key."\\\"".":\\\"".$value."\\\",";
                }
                    
            }
            return 'echo '.trim(rtrim(trim($str), ',')."\}");
        }
        
        public function getDiskUsage() {
            
            $this->load->model('ExecCommand');
            
            // 1. dependency check
            //   - mpstat, bc, 
            // $usedDisk = "usedDisk"; $totalDisk = "totalDisk";

            // TOTAL=`free | grep ^Mem | awk '{print $2}'`;USED1=`free | grep ^Mem | awk '{print $3}'`;n=$((100*USED1/TOTAL));echo \$n;
            // "
            // totalDisk=`df -P | grep -v ^Filesystem | awk '{sum += $2} END { print sum; }'`; usedDisk=`df -P | grep -v ^Filesystem | awk '{sum += $3} END { print sum; }'`; per_1=`echo "100*$use/\$tot" | bc -l`;
            // per=`echo \$per_1 | cut -c 1-4`;echo \$per;"
            // packageExists(){ return dpkg -l "$1" &> /dev/null ; }; if as bc; then echo "fail"; else echo "ex"; fi
            $packageInstallJson = [
                'bc' => [
                    'status' => FALSE,
                    'packageName' => 'bc'
                ],
                'mpstat' => [
                    'status' => FALSE,
                    'packageName' => 'sysstat'
                ]
            ];
            
            $commandList = [
                'ip'           => 'ipAddress=$(ifconfig | head -2 | tail -1 | awk \'{print $2}\' | cut -f 2 -d ":")',
                'diskUsagePer' => "diskPercent=$(df -P | grep -v ^Filesystem | awk '{total += $2; used += $3} END {printf(\"%.2f\",used/total * 100.0)}')",
                'ramUsagePer'  => "ramPercent=$(free | grep Mem | awk '{ printf(\"%.2f\",$3/$2 * 100.0) }')",
                'diskInfo'     => "diskInfo=$(df -T -P)",
                'hostInfo'     => "userInfo=$(hostname)",
                'cpuUsage'     => "cpuUsage=$(mpstat | tail -1 | awk '{printf(\"%.2f\",100-$13)}')" 
            ];
            $command = "
            packageExists(){ echo \"$(command -v \"$1\")\"; };
            if ! [ -x \"$(packageExists mpstat)\" ]; then ".$this->bashJson($packageInstallJson['mpstat'])."; elif ! [ -x \"$(packageExists bc)\" ]; then ".$this->bashJson($packageInstallJson['bc'])."; else 
            ";
            $command = ltrim($command);
            foreach ($commandList as $key => $value) {
                $command .= $value.';';
            }

            $command .= $this->bashJson([
                "ip" => '$ipAddress',
                "diskUsagePercent" => '$diskPercent',
                "ramUsagePercent" => '$ramPercent',
                "diskInfo" => '$diskInfo',
                "hostName" => '$userInfo',
                "cpuUsage" => '$cpuUsage'
            ]).'; fi;';
            
            
            $getServerInfoBySSH = $this->ExecCommand->execUserCommand($command)['message'];
            print_r(json_decode($getServerInfoBySSH, TRUE));
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