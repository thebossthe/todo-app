SELECT 
  "ＴＯＤＯ＿ＩＤ" AS id,
  "タイトル" AS title,
  "説明" AS description,
  "タグ" AS tag,
  "ＴＯＤＯ＿ステータス" AS status
FROM "T_ToDoリスト"
WHERE ($1::boolean = TRUE OR "ＴＯＤＯ＿ステータス" != 1) 
AND ($2::text = '' OR "タイトル" ILIKE '%' || $2 || '%') 
AND ($3::text = 'All' OR "タグ" = $3) 
ORDER BY "ＴＯＤＯ＿ＩＤ"