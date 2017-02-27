<?php

if( !headers_sent() ) {

  session_name(APP_NAME);
  session_set_cookie_params(SESSION_TIMEOUT);
  session_start();
  
}

