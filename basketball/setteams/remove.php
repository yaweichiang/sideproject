<?php
// 連結資料庫
require_once('database.php');
if($conn->connect_error){
    die("Connection Failed".$conn->connect_error);
}

//GET 前端傳回資料
$nickname = $_GET['nickname'];
$sql = "DELETE FROM player WHERE nickname = '".$nickname."'" ;
echo "get".$nickname;
if ($conn->query($sql) === TRUE) {
    // 資料庫寫入成功 關閉連線
    $conn->close();
} else {
    // 資料庫寫入失敗 關閉連線 回傳失敗訊息
    $msg = "Error: " . $sql . "<br>" . $conn->error;
    $conn->close();
    echo $msg;
}
?>