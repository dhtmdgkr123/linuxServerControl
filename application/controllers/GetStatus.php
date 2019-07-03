<?php
if ( ! class_exists('GetStatus') ) {
    class GetStatus extends CI_Controller {
        function __construct(Type $var = null) {
            parent::__construct();
            $this->load->library('session');
            $this->load->library('json');
            $this->load->helper('idFilter');
        }
        



        private function renderTemplate() {
            $url = $this->config->site_url('Command');
            return [
                'root'   => "<a href='{$url}'><div id='root' class='flex_align logo_height_set logo_img'></div></a>",
                'unRoot' => "<a href='{$url}'><div id='unroot' class='flex_align logo_height_set logo_img'></div></a>"
            ];
        }
        
        public function getDiskUsage() {
            
            // $this->load->model('ExecCommand');
            
            // 1. dependency check
            //   - mpstat, bc, 
            // if (packageExists('bc') && packageExists('mpstat')) {

            // }
            // $usedDisk = "usedDisk"; $totalDisk = "totalDisk";

            // TOTAL=`free | grep ^Mem | awk '{print $2}'`;USED1=`free | grep ^Mem | awk '{print $3}'`;n=$((100*USED1/TOTAL));echo \$n;
            // "
            // totalDisk=`df -P | grep -v ^Filesystem | awk '{sum += $2} END { print sum; }'`; usedDisk=`df -P | grep -v ^Filesystem | awk '{sum += $3} END { print sum; }'`; per_1=`echo "100*$use/\$tot" | bc -l`;
            // per=`echo \$per_1 | cut -c 1-4`;echo \$per;"
            // packageExists(){ return dpkg -l "$1" &> /dev/null ; }; if as bc; then echo "fail"; else echo "ex"; fi



            $commandList = [
                'ip'           => 'ipAddress=$(ifconfig | head -2 | tail -1 | awk \'{print $2}\' | cut -f 2 -d ":")',
                'diskUsagePer' => "diskPercent=$(df -P | grep -v ^Filesystem | awk '{total += $2; used += $3} END {printf(\"%.2f\",used/total * 100.0)}')",
                'ramUsagePer'  => "ramPercent=$(free | grep Mem | awk '{ printf(\"%.2f\",$3/$2 * 100.0) }')",
                'diskInfo'     => "diskInfo=$(df -T -P)",
                'hostInfo'     => "userInfo=$(hostname)",
                'cpuUsage'     => "cpuUsage=$(mpstat | tail -1 | awk '{printf(\"%.2f\",100-$13)}')" 
            ];
            $command = "
            packageExists(){ return dpkg -l \"$1\" &> /dev/null ; };
            rlt=null;
            if ! packageExists sysstat; then
                echo \"install Mpsata\";
            elif ! packageExists bc; then
                echo \"install bc\";
            else
                \n
            ";
            $command = ltrim($command);
            // $command = '';
            foreach ($commandList as $key => $value) {
                # code...
                $command .= $value.';';
                // echo $value.';<br>';
            }
            echo $command.'fi;'; //debug
            // print_r($commandList);
            // $command = 'packageExists(){ return dpkg -l "$1" &> /dev/null ; }; if packageExists bc && packageExists mpstat; then echo "exists"; else echo "fail"; fi'
            // $getIp .= "&& echo \$ipAddress";
            // print_r($this->ExecCommand->execUserCommand($getIp));
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