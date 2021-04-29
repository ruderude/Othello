<?php
    // エラーを出力する
    ini_set('display_errors', "On");
    ini_set('mbstring.internal_encoding' , 'utf8mb4_general_ci');
    require_once('../function/database.php');
    require_once('../function/function.php');

    try {

        $name = trim(mb_convert_kana($_POST["name"], "s", 'UTF-8'));
        $age = trim(mb_convert_kana($_POST["age"], "s", 'UTF-8'));
        $job = trim(mb_convert_kana($_POST["job"], "s", 'UTF-8'));

        $name = h($name);
        $age = h($age);
        $job = h($job);

        $created_at = date("Y/m/d H:i:s");
        $updated_at = date("Y/m/d H:i:s");

        $dbh = db();

        $sql = "INSERT INTO users (name, age, job, created_at, updated_at) VALUES (:name, :age, :job, :created_at, :updated_at)";

        $stmt = $dbh->prepare($sql);

        //クエリの設定
        $stmt->bindValue(':name', $name);
        $stmt->bindValue(':age', $age);
        $stmt->bindValue(':job', $job);
        $stmt->bindValue(':created_at', $created_at);
        $stmt->bindValue(':updated_at', $updated_at);

        //クエリの実行
        $stmt->execute();

        $dbh = null;

        $message = $name . "さんを追加しました。<br>";

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
    <title>staff_done</title>
</head>
<body>
    <?php if (!isset($error_message)) :?>
        <h2>スタッフ追加完了!</h2>
        <div><?= $message ?></div>
        <a href="../index.php"><button>戻る</button></a>
    <?php else: ?>
        <p style="color:tomato"><?= $error_message ?></p>
        <a href="../index.php"><button>戻る</button></a>
　　<?php endif; ?>

</body>
</html>