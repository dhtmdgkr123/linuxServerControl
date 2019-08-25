<?php

if (!class_exists('json')) {
    class Json
    {
        public function echo(array $data)
        {
            echo json_encode($data);
        }

        public function header()
        {
            $ci = &get_instance();
            $ci->output->set_header('Content-type: application/json; charset=UTF-8');
        }
    }
}
