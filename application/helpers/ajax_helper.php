<?php

if (!function_exists('setJsonHeader')) {
    function setJsonHeader()
    {
        $self = &get_instance();
        $self->output->set_header('Content-type: application/json; charset=UTF-8');
    }
}

if (!function_exists('trimPost')) {
    function trimPost(string $key)
    {
        $self = &get_instance();

        return trim(
            $self->security->xss_clean(
                $self->input->post($key)
            )
        );
    }
}

if (!function_exists('jsonEcho')) {
    function jsonEcho(array $data)
    {
        if (is_array($data)) {
            echo json_encode($data);
        }
    }
}

if (!function_exists('gotoPage')) {
    function gotoPage(string $url)
    {
        $self = &get_instance();
        $self->load->helper('url');
        redirect($url, 'refresh');
    }
}

if (!function_exists('chkPostMtd')) {
    function chkPostMtd(string $reqMethod): bool
    {
        return $reqMethod === 'POST';
    }
}
