<?php
// extension="mongodb.so"
// $servername='localhost';
// $username='root';
// $password='0937513541';
// $dbname='basketball';
// $conn = new mysqli($servername,$username,$password,$dbname);
// require '/usr/local/Cellar/composer/2.2.7/bin/vendor/autoload.php';
// /usr/local/Cellar/composer/2.2.7/bin/vendor/autoload.php
$client = new MongoDB\Client('mongodb+srv://web_app:webapp@webserver.yqgg6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
$conn = $client->basketball;
//  phpinfo();  
?> 