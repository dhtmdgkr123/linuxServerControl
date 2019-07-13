<?php

if ( ! class_exists('GenerateCommand') ) {
    class GenerateCommand {
        function __construct(Array $require) {
            $this->depenDency = $require['depenDency'];
            $this->execList = $require['commandList'];
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

        private function hypenToCamelCase(String $str) : String {
            
            $explodeByHypen = explode('-', $str);
            return trim($explodeByHypen[0].strtoupper(substr($explodeByHypen[1], 0, 1)).substr($explodeByHypen[1], 1));
        }
        
        private function bashJson(Array $arr, bool $isEcho, String $varName = NULL) : String {
            $jsonStr = $isEcho ? '"{' : '"{';
            $retVal = '';
            
            foreach ($arr as $key => $value) {
                if ( is_bool($value) ) {
                    if ( $value ) {
                        $jsonStr .= '\"'.$key.'\"'.":".json_encode($value).',';

                    } else {
                        $jsonStr .= '\\\"\"'.$key.'\\\"\"'.":".json_encode($value).',';
                    }
                } else {
                    $jsonStr .= "\\\"".$key."\\\"".":\\\"".$value."\\\",";
                }
            }
            if ( $isEcho ) {
                
                $retVal = 'echo '.trim(rtrim(trim($jsonStr), ',').'}"').';';
            
            } else {
                
                $retVal = strpos($varName, '-') !== FALSE ? $this->hypenToCamelCase($varName) : $varName;
                $retVal .= '="'.trim(rtrim(trim($jsonStr), ',')."}\"").'";';
            }
            return $retVal;
        }



        private function optionCheckCommand(Array $packageList, Array $execOptionList) : String {
            $command = '';
            // im-sensors
            if ( count($packageList['option']) === count($execOptionList) ) {
                for (  $i = 0, $cache = ['status' => FALSE],
                       $optionPackage = $packageList['option'],
                       $key = array_keys($execOptionList),
                       $len = count($optionPackage);
                    // END INIT
                        $i < $len;
                    // END condition
                        $i++
                    // END adder
                ) {
                    
                    $command .= $this->bashJson($cache, FALSE, $key[$i]);
                    $command .= "if [ \"$(packageExists {$optionPackage[$i]['packageName']})\" -eq 0 ]; then ";
                    $command .= $key[$i].'=$(echo '.$execOptionList[$key[$i]].'); fi; ';
                }
            }
            return ltrim($command);
        }
        
        private function requireCheckCommand(Array $packageList) : String {
            
            $command = "packageExists(){ echo \"$(command -v \"$1\" > /dev/null; echo \$?)\"; };";
            for ( $i = 0, $requirement = $packageList['require'], $len = count($requirement); $i < $len; $i++) {
                if ( $i === 0 ) {
                    $command .= "if [ \"$(packageExists {$requirement[$i]['packageName']})\" -eq 1 ]; then ";
                } else {
                    $command .= "elif [ \"$(packageExists {$requirement[$i]['packageName']})\" -eq 1 ]; then ";
                }
                $command .= $this->bashJson($requirement[$i], TRUE);
            }
            return ltrim($command.' else ');
        }
        

        private function setVariable(Array $commandList) : String {
            unset($commandList['status']);
            $rltStr = '';
            foreach ($commandList as $key => $value) {
                if ( strpos($value, '(') !== FALSE ) {
                    $rltStr .= $key.'=$(echo '.$value.');';
                }
            }
            return $rltStr;
        }

        private function commandArraySetter(Array $execList) : Array {
            $retArr = [];
            foreach ($execList as $key => $value) {
                if ( is_array($value) ) {
                    foreach ( $value as $k => $v ) {
                        $retArr[$k] = '$'.$k;
                    }
                } else {
                    $retArr[$key] = $value;
                }
            }
            
            return $retArr;
        }


        private function setResponse(Array $settingArray) : Array {
            $retArr = [];
            unset($settingArray['staus']);
            
            foreach($settingArray as $key => $value) {
                $retArr[$key] = '$'.$key; 
            }
            $retArr['status'] = TRUE;
            return $retArr;
        }


        
        public function main() : String {

            $this->depenDency = $this->generateDependencyArray($this->depenDency);
            $command = $this->requireCheckCommand($this->depenDency);
            $command .= $this->optionCheckCommand($this->depenDency, $this->execList['option']);
            $getResponse = $this->commandArraySetter($this->execList);
            $command .= $this->setVariable($getResponse);
            
            $command .= $this->bashJson($this->setResponse($getResponse), TRUE).'fi;';
            
            return trim($command);
        }
    }
}