<?php
if ( ! function_exists('checkAllKeys') ) {
    function checkAllKeys(Array $data, Array $refArray): bool {
        return ! ((bool) count(array_diff(array_keys($data), array_keys($refArray))));
    }
}
if ( (! function_exists('isCommand')) && (! function_exists('isStatus')) && (! function_exists('isOff')) && (! function_exists('isStart')) && (! function_exists('isRestart')) ) {
    function isStatus(String $str): bool { return strpos(strtolower($str), 'status') !== FALSE; }
    function isShell(String $str): bool { return strpos(strtolower($str), 'shell') !== FALSE; }
    function isOff(String $str): bool {return strpos(strtolower($str, 'off')) !== FALSE; }
    function isStart(String $str): bool {return strpos(strtolower($str, 'start')) !== FALSE; }
    function isRestart(String $str): bool {return strpos(strtolower($str, 'restart')) !== FALSE; }
}

if ( ! class_exists('filter') ) {

    class filter {
        // prote
        protected function searchCommand(Array $commandArray, String $target) {
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
        
        protected function inArrayIndexed(Array $filteredArray, String $target): bool {
            return $target ? isset($filteredArray[$target]): FALSE;
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
        
        public function filterMain(): bool {
            return $this->inArrayIndexed($this->filterCommandArray, $this->inputCommand);
        }
        
    }
}


if ( ! class_exists('serviceFilter')) {
    class serviceFilter extends filter {
        private $service = NULL;
        public $serviceArray = NULL;
        
        function __construct(String $service) {

            $this->service = $service;
            $this->serviceArray = [
                'MySQLStart' => '/etc/init.d/mysql start', 'MySQLRestart' => '/etc/init.d/mysql restart',
                'MySQLOff' => '/etc/init.d/mysql stop', 'MySQLStatus' => '/etc/init.d/mysql status',
                'APACHEStart' => 'httpd -k start', 'APACHERestart' => 'httpd -k restart', 'APACHEOff' => 'httpd -k stop', 'APACHEStatus' => 'httpd -k status',
                'NGINXStart' => '/etc/init.d/nginx start', 'NGINXRestart' => '/etc/init.d/nginx restart',
                'NGINXOff' => '/etc/init.d/nginx stop', 'NGINXStatus' => '/etc/init.d/nginx status',
                'ServerRestart' => 'init 6;', 'ServerOff' => 'init 0;', 'ServerStatus' => $this->baseUrl('ServerStatus'),
                'WebShell' => $this->baseUrl('Command')
            ];


        }
        
        private function baseUrl($controllerName = NULL): String {
            return sprintf(
                "%s://%s%s",
                isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https' : 'http',
                $_SERVER["SERVER_ADDR"],
                $_SERVER['SCRIPT_NAME'].$controllerName ? '/'.$controllerName : ''
            );
        }


        private function generateJsonMessage(String $action, String $serviceName): Array {
            /*
             * for 1 each : activeMessage
             * for 2 each : inactiveMessage
             * for 3 each : not installed message 
             */
            $message = [];
            for ($i = 1; $i <= 3; $i++) {
                $message[] = json_encode([$i, $action, $serviceName]);
            }
            return $message;
        }

        private function doubleQuotateAdder(String $str) : String {
            return '"'.$str.'"';
        }

        

        
        public function generateCommand() : String {
            if ( ! function_exists('isHttpd') && ! function_exists('isInit')) {
                function isHttpd(String $str): bool { return strpos($str, 'httpd') !== FALSE; }
                function isServerCommand(String $str): bool { return explode(' ', $str)[0] === 'init'; }
            }
            
            $serviceCommand = $this->serviceArray[$this->service];
            
            if ( filter_var($serviceCommand, FILTER_VALIDATE_URL) || isServerCommand($serviceCommand) ){
                return $serviceCommand;
                
            } else if (isStatus($serviceCommand)) {
                if (isHttpd($serviceCommand)) {
                    $serviceName = $this->doubleQuotateAdder(explode(' ', $serviceCommand)[0]);
                } else {
                    
                    $serviceName = $this->doubleQuotateAdder(explode(' ', explode('/', trim($serviceCommand))[3])[0]);
                }
                
                $message = $this->generateJsonMessage($this->doubleQuotateAdder('status'), $serviceName);
                $serviceCommand = "returnMessage=$({$serviceCommand} | grep active | awk '{print $2}'); if [ \"\$returnMessage\" == \"active\" ]; then echo \"{$message[0]}\"; elif [ \"\$returnMessage\" == \"inactive\" ]; then echo \"{$message[1]}\"; else echo \"{$message[2]}\"; fi";

            } else {
                $serviceAction = NULL;
                if (isHttpd($serviceCommand)) {
                    $serviceAction = explode(' ', $serviceCommand);
                    $serviceName = $this->doubleQuotateAdder($serviceAction[0]);
                    $serviceAction = $this->doubleQuotateAdder(rtrim($serviceAction[2], ';'));
                } else {
                    $serviceName = $this->doubleQuotateAdder(explode(' ', explode('/', trim($serviceCommand))[3])[0]);
                    $serviceAction = $this->doubleQuotateAdder(explode(' ', $serviceCommand)[1]);
                }
                
                $message = $this->generateJsonMessage($serviceAction, $serviceName);
                $serviceCommand .= ' > /dev/null 2>&1;';
                $serviceCommand = "{$serviceCommand} isSuccess=$(echo $?) && if [ \$isSuccess == 0 ]; then echo \"{$message[0]}\"; elif [ \"\$returnMessage\" == \"inactive\" ]; then echo \"{$message[1]}\"; else echo \"{$message[2]}\"; fi";
            }
            
            return trim($serviceCommand);
        }
        
        public function filterMain(): bool {
            return $this->inArrayIndexed($this->serviceArray, $this->service);
        }
    }
    
}

?>