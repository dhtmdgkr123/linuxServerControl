<?php

if ( ! function_exists('setJsonHeader') ) {
    function setJsonHeader() {
        $self =& get_instance();
        $self->output->set_header("Content-type: application/json; charset=UTF-8");
    }
}

if ( ! function_exists('trimPost') ) {
    function trimPost(String $key) {
        $self =& get_instance();
        return trim(
            $self->security->xss_clean(
                $self->input->post($key)
            )
        );
         
    }
}

if ( ! function_exists('jsonEcho') ) {
    function jsonEcho(Array $data) {
        if (is_array($data)) {
            echo json_encode($data);
        }
    }
}

if ( ! function_exists('gotoPage') ) {
    function gotoPage(String $url) {
        $self =& get_instance();
        $self->load->helper('url');
        redirect($url, 'refresh');
    }
}


if ( ! function_exists('chkPostMtd') ) {
    function chkPostMtd(String $reqMethod) {
        return $reqMethod === 'POST';
    }
}

?>