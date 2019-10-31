<?php
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;
if(! class_exists('Queue')) {
    class Queue
    {
        private $CI = null;
        private $conn = null;
        public function __construct() {
            $this->CI =& get_instance();
            $this->conn = new AMQPStreamConnection(getenv('MQ_HOST'), getenv('MQ_PORT'), getenv('MQ_ID'), getenv('MQ_PW'));
        }
        public function push(string $message, string $queueHash) : void
        {
            $channel = $this->conn->channel();
            $channel->queue_declare('remoteMessage_'.$queueHash, false, false, false, false);
            $channel->basic_publish(new AMQPMessage($message), '', 'remoteMessage_'.$queueHash);
        }
        public function pop(string $queueHash) : ? string
        {
            return $this->conn->channel()
                              ->basic_get('remoteMessage_'.$queueHash, true, null)
                              ->body ?? null;
        }
    }
}