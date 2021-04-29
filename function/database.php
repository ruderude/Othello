<?php

function db() {
    $dsn = 'mysql:host=127.0.0.1;dbname=test_db;charset=utf8mb4';
    $user = 'admin';
    $password = 'password';

    $dbh = new PDO($dsn, $user, $password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $dbh;
}

?>