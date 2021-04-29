<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>新規登録</title>
</head>
<body>
    <h3>新規登録</h3>
    <form method="POST" action="add_check.php">
        名前を入力してください。<br>
        <input type="text" name="name" value="" style="width:200px"><br>
        年齢を入力してください。 <br>
        <input type="text" name="age" style="width:100px"><br>
        仕事を入力してください。 <br>
        <input type="text" name="job" style="width:100px"><br>
        <br>
        <input type="button" onclick="history.back()" value="戻る">
        <input type="submit" value="送信">
    </form>
</body>
</html>