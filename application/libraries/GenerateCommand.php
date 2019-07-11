<?php

if ( ! class_exists('GenerateCommand') ) {
    class GenerateCommand {
        function __construct(Array $require) {
            $this->depenDency = $require['depenDency'];
            $this->execList = $require['commandList'];
            $this->responseJson = $require['response'];
        }
        
        private function generateDependencyArray(Array $dependency) : Array {
            $rlt = [];
            $counter = 0;
            foreach ($dependency as $key => $value) {
                foreach ($value as $k => $v) {
                    $rlt[$key][$k] = [
                        'status' => FALSE,
                        'packageName' => $v
                    ];
                }
            }
            return $rlt;
        }
        
        private function bashJson(Array $arr, bool $isRequire = FALSE , bool $isEcho, String $varName = NULL) : String {
            // 여기 설계 다시 할 것. 파라미터 정의 다시 할 것.
            $str = '{';
            $retVal = '';
            
            if ( ! function_exists('hypenToCamelCase') ) {
                function hypenToCamelCase(String $str) : String {
                    $explodeByHypen = explode('-', $str);
                    return $explodeByHypen[0].strtoupper(substr($explodeByHypen[1], 0, 1)).substr($explodeByHypen[1], 1);
                }
            }

            foreach ($arr as $key => $value) {
                if ( is_bool($value) ) {
                    $str .= "\\\"".$key."\\\"".":".json_encode($value).",";
                } else {
                    // $str .= "\\\"".$key."\\\"".":".$value.",";
                    if ( $isRequire ) {
                        $str .= "\\\"".$key."\\\"".":".$value.",";
                    } else {
                        $str .= "\\\"".$key."\\\"".":\\\"".$value."\\\",";
                    }
                }
            }

            if ( $isEcho ) {
                $retVal = 'echo '.trim(rtrim(trim($str), ',')."\}").';';
            } else {
                $retVal = strpos($varName, '-') !== FALSE ? hypenToCamelCase($varName) : $varName;
                $retVal .= '='.trim(rtrim(trim($str), ',')."\}").';';
            }
            return $retVal;
        }
        
        private function requireCheckCommand(Array $packageList) : String {
            
            $command = "packageExists(){ echo \"$(command -v \"$1\")\"; };";
            for ( $i = 0, $requirement = $packageList['require'], $len = count($requirement); $i < $len; $i++) {
                if ( $i === 0 ) {
                    $command .= "if ! [ -x \"$(packageExists {$requirement[$i]['packageName']})\" ]; then ";
                } else {
                    $command .= "elif ! [ -x \"$(packageExists {$requirement[$i]['packageName']})\" ]; then ";
                }
                $command .= $this->bashJson($requirement[$i], FALSE, TRUE);
            }
            return ltrim($command.' else ');
        }
        
        private function optionCheckCommand(Array $packageList, Array $execOptionList) : String {
            $command = '';
            if ( count($packageList['option']) === count($execOptionList) ) {
                for ( $i = 0, $optionPackage = $packageList['option'], $len = count($optionPackage); $i < $len; $i++) {
                    $command .= "if ! [ -x \"$(packageExists {$optionPackage[$i]['packageName']})\" ]; then ";
                    $command .= $this->bashJson($optionPackage[$i], FALSE, TRUE, $optionPackage[$i]['packageName']).' else ';
                    $command .= $execOptionList[$i].'; fi;';
                }
            }
            return ltrim($command);
        }

        private function addToExecList(Array $execList) : String {
            $rltCommand = '';
            foreach ($execList as $key => $value) {
                if ( ! is_array($value) ) {
                    $rltCommand .= $value.';';
                }
            }
            return $rltCommand;
        }
        
        private function addResponseJson(Array $Status) : String {
            return $this->bashJson($Status, TRUE, TRUE).' fi;';
        }

        

        public function main() : String {

            // $this->addResponseJson($this->responseJson['normal']);

          
            $this->depenDency = $this->generateDependencyArray($this->depenDency);
            $command = $this->requireCheckCommand($this->depenDency);
            $command .= $this->optionCheckCommand($this->depenDency, $this->execList['option']);
            // $command .= $this->addToExecList($this->execList);
            // $command .= $this->addResponseJson($this->responseJson);
            echo $command;
            // {
            //     "status":true,
            //     "ip":"192.168.230.128",
            //     "diskUsagePercent":"9.41",
            //     "ramUsagePercent":"6.90",
            //     "diskInfo":"Filesystem Type Size Used Avail Use% Mounted on udev devtmpfs 971M 0 971M 0% /dev tmpfs tmpfs 199M 5.9M 193M 3% /run /dev/mapper/sshcontrol--vg-root ext4 18G 2.0G 15G 12% / tmpfs tmpfs 992M 0 992M 0% /dev/shm tmpfs tmpfs 5.0M 0 5.0M 0% /run/lock tmpfs tmpfs 992M 0 992M 0% /sys/fs/cgroup /dev/sda1 ext2 720M 59M 625M 9% /boot tmpfs tmpfs 199M 0 199M 0% /run/user/0",
            //     "hostName":"sshcontrol",
            //     "cpuUsage":"0.43",
            //     "imSensors": {
            //         "status":false,
            //         "packageName":"im-sensors"
            //     },
            // }

            // echo $command;
            // if ( ! packageExists() ) {

            // } else if ( ! packageExists() ) {

            // } else {
            //     if ( dependencyExists() ) {
            //         rlt={'key': 'val'}
            //     } else {
            //         rlt=$(blabla)
            //     }
            // }

            // packageExists(){ echo "$(command -v "$1")"; };
            // if ! [ -x "$(packageExists bc)" ]; then
            //     echo {\"status\":\"FALSE\",\"packageName\":\"bc\"\};
            // elif ! [ -x "$(packageExists mpstat)" ]; then
            //     echo {\"status\":\"FALSE\",\"packageName\":\"mpstat\"\};
            // else
            //     if ! [ -x "$(packageExists im-sensors)" ]; then
            //         im_sensors={\"status\":\"FALSE\",\"packageName\":\"im-sensors\"\};
            //     else
            //         im_sensors=$(blabla)
            //     fi;
            //     if ! [ -x "$(packageExists testPackage)" ]; then
            //         testPackage={\"status\":\"FALSE\",\"packageName\":\"testPackage\"\};
            //     else
            //         im_sensors=$(blabla)
            //     fi;
            // fi;
            
            // $command = $this->initCommand($this->depenDency);
            // $command = $this->addCommaToExecList($command, $this->execList);
            // $command = $this->addResponseJson($command, $this->responseJson);
            return $command;
        }
    }
}

// if [ requirepackageNotExists 1 ]; then
//     echo packageOne
// elif [ requirepackageNotExists 2 ]; then
//     echo package2
// else
//     if [ packageExists opt1 ]; then;
//         exec
//     else
//         json
    