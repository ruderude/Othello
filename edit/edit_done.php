<?php
    require_once('../function/database.php');

    try {
        $id = trim(mb_convert_kana($_POST["id"], "s", 'UTF-8'));
        $name = trim(mb_convert_kana($_POST["name"], "s", 'UTF-8'));
        $age = trim(mb_convert_kana($_POST["age"], "s", 'UTF-8'));
        $job = trim(mb_convert_kana($_POST["job"], "s", 'UTF-8'));
        
        $id = htmlspecialchars($id, ENT_QUOTES, 'UTF-8');
        $name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
        $age = htmlspecialchars($age, ENT_QUOTES, 'UTF-8');
        $job = htmlspecialchars($job, ENT_QUOTES, 'UTF-8');

        $updated_at = date("Y/m/d H:i:s");

        // var_dump($created_at);

        $dbh = db();

        $sql = "UPDATE users SET name = :name, age = :age, job = :job, updated_at = :updated_at WHERE id = :id";

        $stmt = $dbh->prepare($sql);

        //クエリの設定
        $stmt->bindValue(':id', $id);
        $stmt->bindValue(':name', $name);
        $stmt->bindValue(':age', $age);
        $stmt->bindValue(':job', $job);
        $stmt->bindValue(':updated_at', $updated_at);

        //クエリの実行
        $stmt->execute();

        $dbh = null;

        $message = $name . "さんを更新しました。<br>";

    } catch (PDOException $e) {
        // 本番ではヒントになるエラー文は表示しない
        $error_message =  "障害発生によりご迷惑をおかけしています。: " . $e->getMessage() . "\n";
        echo $error_message;
        exit;
    }

?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>スタッフ更新完了</title>
</head>
<body>
    <?php if (!isset($error_message)) :?>
        <h2>スタッフ更新完了!</h2>
        <div><?= $message ?></div>
        <a href="../index.php"><button>戻る</button></a>
    <?php else: ?>
        <p style="color:tomato"><?= $error_message ?></p>
        <a href="../index.php"><button>戻る</button></a>
　　<?php endif; ?>

</body>
</html>