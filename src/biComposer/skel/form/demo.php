<?php

if('form_submit_contact' == $_POST['action']) {
  // enable phpmailer
  $project->loadVendor('phpmailer/class.phpmailer.php');
  // reset send status controller
  $submitted_ok = false;

  if (
    isValidInput($_POST['firstname']) && 
    isValidInput($_POST['lastname']) && 
    isValidInput($_POST['message']) && 
    isValidEmail($_POST['email']))
    {
    
    $mail = new PHPMailer();
    $mail->IsSendmail();
    $mail->SetFrom('noreply@'.APP_DOMAIN, APP_DOMAIN);
    $mail->addAddress(APP_EMAIL);
    $mail->AddReplyTo($_POST['email']);
    $mail->AddBCC(BCC_TO);

    $mail->CharSet = 'utf-8';
    $mail->Subject = '['.APP_DOMAIN.'] Nuova richiesta contatto';
    $mail->Body = "Name: {$_POST['firstname']}"
          . "\n"
          . "Surname: {$_POST['lastname']}"
          . "\n"
          . "E-mail: {$_POST['email']}"
          . "\n\n"
          . "Message:\n{$_POST['message']}"
          . "\n\n--\n"
          . "SENDING IP: {$_SERVER[REMOTE_ADDR]}";

    if ($mail->Send()) { $submitted_ok = true; }
  }
}
