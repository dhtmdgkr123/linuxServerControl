<?php
if ( ! function_exists('some') ) {
    function some(Array $dataArr, callable $callBack) {
        foreach ($dataArr as $value) {
            if ($callBack($value)) {
                return TRUE;
            }
        }
        return FALSE;
    }
}


if ( ! class_exists('commandFilter') ) {
    class commandFilter {
        private $inputCommand = NULL;
        function __construct(String $command) {
            $this->inputCommand = trim(strtolower(explode(' ', $command)[0]));
        }


        private function getBlockCommand() {
            $blockCommandArray = [
                '[]',
                'apt', 'apt-get',
                'clear', 'git',
                'more', 'nano',
                'top', 'vi',
                'vim', 'wget',
            ];
            return $blockCommandArray;
        }


        public function filterMain() {
            return $this->inputCommand ? $this->searchCommand($this->getBlockCommand(), $this->inputCommand) : FALSE;
        }


        // pub

        private function searchCommand(Array $commandArray, String $target) {
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
    }
    
}


if ( ! function_exists('checkAllKeys') ) {
    function checkAllKeys(Array $data, Array $refArray) {
        return ! ((bool) count(array_diff(array_keys($data), array_keys($refArray))));

    }
}


if ( ! function_exists('getBlockCommand') ) {
    function getBlockCommand() {
        $blockingCommand = [
            'block' => [
                'apt', 'apt-get',
                'clear', 'git',
                'more', 'nano',
                'top', 'vi',
                'vim', 'wget',
            ],
        
            'shutdown' => [
                'halt', 'shutdown -h'
            ],
        
            'reboot' => [
                'shutdown -r now', 'init 6', 'reboot'
            ]
        ];
        return $blockingCommand;
    }
}

?>