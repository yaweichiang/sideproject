<?php
// 連結資料庫

require_once('database.php');
if($conn->connect_error){
    die("Connection Failed".$conn->connect_error);
}
$searchtype = $_GET['searchtype'];
if($searchtype==='ajax_search'){
    $sql="SELECT * FROM player";
    $result = $conn->query($sql);
    if($result->num_rows>0){
        while($row = $result->fetch_assoc()){
            echo '<div class="player"><div class="name">'.$row['nickname'].'</div><button class="dele"> X </button></div>';
    
        }
        $conn->close();
    }else{
        $conn->close();
    }
}else if($searchtype==='player_search'){
    $sql="SELECT * FROM player";
    $result = $conn->query($sql);
    $data = Array();
    
    if($result->num_rows>0){
        while($row = $result->fetch_assoc()){
            array_push($data,$row['nickname']);
        }
         echo json_encode($data);
        
        $conn->close();
    }else{
        $conn->close();
    }
}

?>