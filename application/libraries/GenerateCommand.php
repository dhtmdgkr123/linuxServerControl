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
                $rlt[$value] = [
                    'status' => FALSE,
                    'packageName' => $value
                ];
            }
            return $rlt;
        }


        private function bashJson(Array $arr) : String {
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
            return 'echo '.trim(rtrim(trim($str), ',')."\}").';';
        }

        private function initCommand(Array $packageList) : String {
            
            $command = "packageExists(){ echo \"$(command -v \"$1\")\"; };";
            
            for ($i = 0, $key = array_keys($packageList), $len = count($key); $i < $len; $i++) {
                if ( $i === 0 ) {
                    $command .= "if ! [ -x \"$(packageExists {$packageList[$key[$i]]['packageName']})\" ]; then ";
                } else {
                    $command .= " elif ! [ -x \"$(packageExists {$packageList[$key[$i]]['packageName']})\" ]; then ";
                }
                $command .= $this->bashJson($packageList[$key[$i]]);
            }
            return ltrim($command.' else ');
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
            $command = $this->initCommand($this->depenDency);
            $command = $this->addCommaToExecList($command, $this->execList);
            $command = $this->addResponseJson($command, $this->responseJson);
            return $command;
        }
    }
}