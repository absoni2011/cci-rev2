<?php
$color = strip_tags(htmlspecialchars($_POST['color']));
$age = strip_tags(htmlspecialchars($_POST['age']));
$industry = strip_tags(htmlspecialchars($_POST['industry']));
$message = strip_tags(htmlspecialchars($_POST['message']));

$to = 'christina.ccicolor@gmail.com';
$email_subject = "Feedback From Fundamental Color Tools Form";
$email_body = "You have received a new message from your Fundamental Color Tools feedback form.\n\n"."Here are the details:\n\nWhat is your favourite way to choose colors?: $color\n\nIf Other please specify:\n $message\n\nWhat is your age?: $age\n\nDo you work in the color industry or do you represent the consumer market?: $industry";
$headers = "From: ccicolor@ccirewrite.site\n";
mail($to,$email_subject,$email_body,$headers);
return true;
?>
