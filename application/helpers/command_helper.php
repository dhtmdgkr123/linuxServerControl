<?php
if ( ! class_exists('filter') ) {

    class filter {
        
        protected function searchCommand(Array $commandArray, String $target) {
            /* not used */
            $low = 0;
            $high = count($commandArray) - 1;
    
            $cache = NULL;
            $mid = NULL;
            
            while ($high >= $low) {
                $mid = intval(floor(($high + $low) / 2));
                $cache = $commandArray[$mid];
                if ($target < $cache) {
                    $high = $mid - 1;
    
                } else if ($target > $cache) {
                    $low = $mid + 1;
                    
                } else {
                    return TRUE;
                }
            }
            return FALSE;
        }
        
        protected function inArrayIndexed(Array $filteredArray, String $target) {
            return $target ? isset($filteredArray[$target]) : FALSE;
        }
        
    }
    
}

if ( ! class_exists('commandFilter') ) {
    class commandFilter extends filter {

        private $inputCommand = NULL;
        private $filterCommandArray = NULL;

        function __construct(String $command) {
            $this->inputCommand = trim(strtolower(explode(' ', $command)[0]));
            $this->filterCommandArray = [
                '[]' => TRUE,
                'apt' => TRUE, 'apt-get' => TRUE,
                'clear' => TRUE, 'git' => TRUE,
                'more' => TRUE, 'nano' => TRUE,
                'top' => TRUE, 'vi' => TRUE,
                'vim' => TRUE, 'wget' => TRUE,
            ];
        }


        public function filterMain() {
            return $this->inArrayIndexed($this->filterCommandArray, $this->inputCommand);
        }
        
    }
    
}


if ( ! class_exists('serviceFilter')) {
    class serviceFilter extends filter {
        private $service = NULL;


        function __construct(String $service) {
            $this->service = $service;
        }
        

        private function getBlockCommand() {
            $serviceArray = [
                'ServerStart' => TRUE, 'ServerRestart' => TRUE, 'ServerOff' => TRUE,
                'ServerStatus' => TRUE, 'MySQLStart' => TRUE, 'MySQLRestart' => TRUE,
                'MySQLOff' => TRUE, 'MySQLStatus' => TRUE, 'APACHEStart' => TRUE,
                'APACHERestart' => TRUE, 'APACHEOff' => TRUE, 'APACHEStatus' => TRUE,
                'NGINXStart' => TRUE, 'NGINXRestart' => TRUE, 'NGINXOff' => TRUE,
                'NGINXStatus' => TRUE
            ];


            return $serviceArray;
        }
        
        public function filterMain() {
            return $this->inArrayIndexed($this->getBlockCommand(), $this->service);
        }
    }
    
}


if ( ! function_exists('checkAllKeys') ) {
    function checkAllKeys(Array $data, Array $refArray) {
        return ! ((bool) count(array_diff(array_keys($data), array_keys($refArray))));

    }
}

?>