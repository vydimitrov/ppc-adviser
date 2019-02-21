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

    if (isset( $_POST['message'])) {
        $message = strip_tags(trim($_POST['message']));
    }

    $freeAudit = "no";
    if (isset($_POST['free-audit']) and $_POST['free-audit'] == "on") {
        $freeAudit = "yes";
    }

    $recipient = "boryana.dimitrova@outlook.com";
    $mailheader = "From: $email \r\n";
    $formcontent = "Name: $name \nEmail: $email \nSubject: $subject \nMessage: $message\n Free Audit: $freeAudit";
    $emailSubject = 'New contact form submition';

    mail($recipient, $emailSubject, $formcontent, $mailheader) or die("Error!");
?>