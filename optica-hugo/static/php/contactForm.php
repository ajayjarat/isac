<?php
  require '../sendgrid-php/vendor/autoload.php';
  $sendgrid = new SendGrid("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
");
  require '../sendgrid-php/lib/SendGrid.php.php';
  $email    = new SendGrid\Email();
  $toEmail= "enquiry@optica.solutions";
  $fromEmail="shalini@jivinc.in";
  if (isset($_POST['yourName']) && isset($_POST['yourEmail'])) {
    $fromEmail=$_POST['yourEmail'] ;
  }
  $email->addTo($toEmai)
        ->setFrom($fromEmail)
        ->setSubject("ISAC email")
        ->setHtml("ISAC email");

  $response=$sendgrid->send($email);
  print_r($response);die('here');
  // $to = "enquiry@optica.solutions";
  // $subject = "Mail from raes.com";
  // $message ="";
  // $response="";
  // if (isset($_POST['personName']) && isset($_POST['personEmail']) && isset($_POST['subject']) && isset($_POST['message'])) { 
  //   $subject = $_POST['subject'];
  //   $message .= '<html><body><div>';
  //   $message .= '<p>Name: '.$_POST['personName'].'</p>';
  //   $message .= '<p>Email: '.$_POST['personEmail'].'</p>';
  //   $message .= '<p>Message/Requirement: '.$_POST['message'].'</p>';
  //   $message .= '</div></body></html>'; 
  //   $retval = mail($to,$subject,$message);     
  //   if( $retval == true ) { 
  //     $response="E-Mail sent successfully";          
  //   }else {
  //     $response="E-Mail could not be sent";           
  //   }
  // }
  // echo $response;  
?>