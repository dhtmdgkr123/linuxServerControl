<?php

if ( ! class_exists('GenerateCommand') ) {
    class GenerateCommand {
        function __construct(Array $require) {
            $this->depenDency = $require['depenDency'];
            $this->execList = $require['commandList'];
            $this->responseJson = $require['response'];
        }
        
        private function generateDependencyJson(Array $dependency) : Array {
            $rlt = [];
            $counter = 0;
            foreach ($dependency as $key => $value) {
                foreach ($value as $k => $v) {
                    # code...
                    
                    $rlt[$key][$k] = [
                        'status' => FALSE,
                        'packageName' => $v
                    ];

                }
            }
            return $rlt;
        }


        private function bashJson(Array $arr, bool $isEcho, String $varName = NULL) : String {
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
            return $isEcho ? 'echo '.trim(rtrim(trim($str), ',')."\}").';' : str_replace('-', '_', $varName).'='.trim(rtrim(trim($str), ',')."\}").';';
        }

        // private function initCommand(Array $packageList) : String {
        //     $command = "packageExists(){ echo \"$(command -v \"$1\")\"; };";
        //     // print_r(array_keys($packageList));
        //     for ( $i = 0, $require = $packageList['require'], $len = count($require); $i < $len; $i++ ) {
        //         if ( $i === 0 ) {
        //             $command .= "if ! [ -x \"$(packageExists {$require[$i]})\" ]; then ";
        //         } else {
        //             $command .= " elif ! [ -x \"$(packageExists {$require[$i]})\" ]; then ";
        //         }
        //     }
            
        //     return ltrim($command.' else ');
        // }
        private function requireCheckCommand(Array $packageList) : String {
            
            $command = "packageExists(){ echo \"$(command -v \"$1\")\"; };";
            for ( $i = 0, $requirement = $packageList['require'], $len = count($requirement); $i < $len; $i++) {
                if ( $i === 0 ) {
                    $command .= "if ! [ -x \"$(packageExists {$requirement[$i]['packageName']})\" ]; then ";
                } else {
                    $command .= "elif ! [ -x \"$(packageExists {$requirement[$i]['packageName']})\" ]; then ";
                }
                $command .= $this->bashJson($requirement[$i], TRUE);
            }
            return ltrim($command.' else ');
        }


        private function optionCheckCommand(Array $packageList) : String {
            $command = '';
            for ( $i = 0, $optionPackage = $packageList['option'], $len = count($optionPackage); $i < $len; $i++) {
                $command .= "if ! [ -x \"$(packageExists {$optionPackage[$i]['packageName']})\" ]; then ";
                $command .= $this->bashJson($optionPackage[$i], FALSE, $optionPackage[$i]['packageName']).' else ';
                foreach ($variable as $key => $value) {
                    # code...
                }
            }
            return ltrim($command);
        }

        private function addCommaToExecList(String $initCommand, Array $execList) : String {
            foreach ($execList as $key => $value) {
                $initCommand .= $value.';';
            }
            return $initCommand;
        }


        private function addResponseJson(String $initCommand, Array $Status) : String {
            return $initCommand.$this->bashJson($Status).' fi;';
        }

        public function main() : String {
            $this->depenDency = $this->generateDependencyJson($this->depenDency);
            $command = $this->requireCheckCommand($this->depenDency);
            $command .= $this->optionCheckCommand($this->depenDency, $this->execList);
            // echo $command."echo 'success'; fi; fi;";
            echo $command;
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
    