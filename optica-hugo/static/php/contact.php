<?php
    require 'vendor/autoload.php';
    $email = new \SendGrid\Mail\Mail();
    $result=0;
    $name='' ;
    $senderEmail='';
    $subject='';
    $toEmail= "info@optica.solutions";
    $fromEmail="shalini@jivinc.in";
    $message ="";
    if (isset($_POST['data']) && isset($_POST['subject'])) { 
        $data=$_POST['data'] ;
        $message="<div>Customer details:</div>";
        foreach($data as $key => $val) {
          $message.="<div><p>".$key.":".$val."</p></div>";
        }   
        $name=$_POST['data']['customerName'];        
        $senderEmail=$_POST['data']['customerEmail'] ;
        $subject=$_POST['subject'];
    }
    $email->setFrom($fromEmail, "Test Recipient");
    $email->setSubject($subject);
    $email->addTo($toEmail, "shalini");   
    $email->addContent(
        "text/html", "<strong>Email request from ".$message."</strong>"
    );
    $sendgrid = new SendGrid("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");    
    try {
        $response = $sendgrid->send($email);        
        if($response->statusCode()==202){
            $result=1;
        }else{
           echo "Email Not Sent".$response->headers(); 
        }
        echo $result;
        /* print $response->statusCode() . "\n";
            print_r($response->headers());
            print $response->body() . "\n";*/
    } catch (Exception $e) {
        echo 'Caught exception: '. $e->getMessage() ."\n";
        // $result = 'Caught exception: '. $e->getMessage() ."\n";
    }