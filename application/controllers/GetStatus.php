<?php
if ( ! class_exists('GetStatus') ) {
    class GetStatus extends CI_Controller {
        function __construct(Type $var = null) {
            parent::__construct();
            $this->load->library('session');
            $this->load->library('json');
            $this->load->helper('idFilter');
        }
        



        public function dfdfdfd(Type $var = null)
        {

            phpinfo();
            # code...

            // echo "extension=redis.so" > /etc/php/7.3/mods-available/redis.ini && ln -sf /etc/php/7.3/mods-available/redis.ini /etc/php/7.3/fpm/conf.d/20-redis.ini && ln -sf /etc/php/7.3/mods-available/redis.ini /etc/php/7.3/cli/conf.d/20-redis.ini
        }


        public function checkRootId(){
            $this->json->header();

            $retArray = [
                'stat' => FALSE,
                'message' => NULL
            ];
            $url = $this->config->site_url('Command');
            if ( $this->session->isLogin ) {
                $rootTemplate = "<a href='{$url}'><div id='root' class='flex_align logo_height_set logo_img'></div></a>";
                $defaultTemplate = "<a href='{$url}'><div id='unroot' class='flex_align logo_height_set logo_img'></div></a>";
                $retArray['message'] = isRoot($this->session->userId) ? $rootTemplate : $defaultTemplate;
                $retArray['stat'] = TRUE;
            } else {
                $retArray['message'] = $this->config->base_url();

            }
            $this->json->echo($retArray);
        }   
    }
    
}