<?php

    $id = trim(mb_convert_kana($_POST["id"], "s", 'UTF-8'));
    $name = trim(mb_convert_kana($_POST["name"], "s", 'UTF-8'));
    $age = trim(mb_convert_kana($_POST["age"], "s", 'UTF-8'));
    $job = trim(mb_convert_kana($_POST["job"], "s", 'UTF-8'));

    $id = htmlspecialchars($id, ENT_QUOTES, 'UTF-8');
    $name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $age = htmlspecialchars($age, ENT_QUOTES, 'UTF-8');
    $job = htmlspecialchars($job, ENT_QUOTES, 'UTF-8');

    $error_messages = [];

    if($name == "") {
        $error_messages[] = "名前を入力してください";
    } elseif(mb_strlen($name) > 30) {
        $error_messages[] = "名前が長すぎます（30文字以下にしてください）";
    }

    if($age == "") {
        $error_messages[] = "年齢を入力してください";
    } elseif($age > 200) {
        $error_messages[] = "生きていません";
    }

    if($job == "") {
        $error_messages[] = "仕事名を入力してください";
    } elseif(mb_strlen($job)  > 30) {
        $error_messages[] = "仕事名が長すぎます（30文字以下にしてください）";
    }




    ?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>スタッフ編集チェック</title>
</head>
<body>
<h2>スタッフ編集チェック</h2>
    <?php if (empty($error_messages)) :?>
        <h4>こちらの内容でよろしいですか？</h4>
        <ul>
            <li><?= $name ?></li>
            <li><?= $age ?>歳</li>
            <li><?= $job ?></li>
        </ul>

        <form method="post" action="edit_done.php">
            <input type="hidden" name="id" value="<?= $id ?>">
            <input type="hidden" name="name" value="<?= $name ?>">
            <input type="hidden" name="age" value="<?= $age ?>">
            <input type="hidden" name="job" value="<?= $job ?>">
            <input type="button" onclick="history.back()" value="戻る">
            <input type="submit" value="OK">
        </form>
　　<?php else: ?>
        <?php foreach ($error_messages as $error) : ?>
            <div style="color:tomato"><?= $error ?></div>
        <?php endforeach; ?>
        <input type="button" onclick="history.back()" value="戻る">
　　<?php endif; ?>
</body>
</html>