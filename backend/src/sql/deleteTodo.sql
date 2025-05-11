DELETE FROM "T_ToDoリスト"
WHERE "ＴＯＤＯ＿ＩＤ" = $1
RETURNING "ＴＯＤＯ＿ＩＤ" AS id;