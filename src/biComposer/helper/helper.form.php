<?php

function isValidEmail($email='') {
  return (bool) preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@([0-9a-z][0-9a-z-]*[0-9a-z]\.)+[a-z]{2,4}$/", $email);
}


function isValidInput($input='') {
  return !empty($input);
}


function defaultHeaders() {
  $headers = "From: \"".APP_DOMAIN."\" <noreply@".APP_DOMAIN.">\n";
	$headers.= "Bcc: <".BCC_TO.">\n";
  $headers.= "Reply-to: <$email>\n";
  
  return $headers;
}