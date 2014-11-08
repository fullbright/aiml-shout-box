<?php
####### db config ##########
$db_username = 'xxxx';
$db_password = 'xxxx';
$db_name = 'xxxx';
$db_host = 'localhost';
$pandorabot_url = "http://www.pandorabots.com/pandora/talk-xml";
$bot_id = "b009ed816e3420c1"; 
$bot_name = "Bot";
####### db config end ##########

if($_POST)
{
    //set the default timezone
    date_default_timezone_set("Europe/Paris");
    
    //check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        die();
    } 
    
    if(isset($_POST["message"]) &&  strlen($_POST["message"])>0)
    {
        //sanitize user name and message received from chat box
        $username = filter_var(trim($_POST["username"]),FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW | FILTER_FLAG_STRIP_HIGH);
        $message = filter_var(trim($_POST["message"]),FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW | FILTER_FLAG_STRIP_HIGH);
        $custid = filter_var(trim($_POST["custid"]),FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW | FILTER_FLAG_STRIP_HIGH);
        $user_ip = $_SERVER['REMOTE_ADDR'];
        
        //Display the inserted message
        //$msg_time = date('h:i A M d',time()); // current time
        //$output_msg = '<div class="shout_msg"><time>'.$msg_time.'</time><span class="username">'.$username.'</span><span class="message">'.$message.'</span></div>';
        

        //$url = 'http://server.com/path';
        $data = array('botid' => $bot_id, 'input' => $message, 'custid' => $custid);

        // use key 'http' even if you send the request to https://...
        $options = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                'method'  => 'POST',
                'content' => http_build_query($data),
            ),
        );
        $context  = stream_context_create($options);
        $result = file_get_contents($pandorabot_url, false, $context);

        $msg_time = date('h:i A M d',time()); // current time
        

        //var_dump($result);
        //output message
        $xml = simplexml_load_string($result);
        #echo '<div class="shout_msg"><time>'.$msg_time.'</time><span class="username">'.$bot_name.'</span><span class="message">'.$xml->that.'</span></div>';
        $json = json_encode($xml);
        echo $json;
    }
    else
    {
        //output error
        header('HTTP/1.1 500 Are you kiddin me?');
        exit();
    }
}