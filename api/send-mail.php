<?php
    if ( isset( $_POST['name'])) {
        $name = strip_tags(trim($_POST['name'] ) );
    }
    if ( isset( $_POST['email'])) {
        $email = strip_tags(trim($_POST['email'] ) );
    }
    
    echo $name;
    echo $email;
?>