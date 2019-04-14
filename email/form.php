<?php

$pp = new FormHandler();

$validator = $pp->getValidator();
$validator->fields(['name','email'])->areRequired()->maxLength(50);
$validator->field('email')->isEmail();
$validator->field('message')->maxLength(6000);




$pp->sendEmailTo('g33ky.me@protonmail.com');

echo $pp->process($_POST);
