<?php
    if (isset( $_POST['name'])) {
        $name = strip_tags(trim($_POST['name']));
    }

    if (isset( $_POST['email'])) {
        $email = strip_tags(trim($_POST['email']));
    }

    if (isset( $_POST['subject'])) {
        $subject = strip_tags(trim($_POST['subject']));
    }

    if (isset( $_POST['details'])) {
        $details = strip_tags(trim($_POST['details']));
    }

    echo $name;
    echo $email;
    echo $boza;
?>