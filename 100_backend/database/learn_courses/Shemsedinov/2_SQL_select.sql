SELECT * FROM tab1;

SELECT id, login        -- выбрать значения полей id, login
FROM tab1               -- из таблицы system_user
WHERE login = "marcus"; -- где login = "marcus" 

SELECT [ALL | DISTINCT] col1, col2, ...
FROM tab1, tab2, ...
[WHERE <conditions>]
[GROUP BY <columns>]
[HAVING <conditions>]
[ORDER BY <columns> [ASC | DESC]]   --ASC по умолчанию
/*
conditions: 
=,  >,  <,  <=,  >=,  !=(или <>),  LIKE

LIKE "Mar%"   ("Mar" и слова, нач-ся на "Mar") регистр имеет значение
%   - заменяет любую строку или её отсутствие

LIKE "Mar_us"   (Marcus, Markus, ...)
_   - заменяет одну букву (не пустую строку)

DISTINCT col1           - уникальные значения поля col1
DISTINCT col1, col2  - уникальные значения полей col1 и col2 (вместе)

ASC | DESC    - по возрастанию | убыванию
*/

-- ALL
SELECT id FROM tab1 WHERE id = ALL (SELECT UserId WHERE IP = "127.0.0.1");
-- только те записи, где все IP = "127.0.0.1"
-- TODO: как это работает ?? Как WHERE id = UserId AND IP = "127.0.0.1" ?

-- ANY
SELECT id FROM tab1 WHERE id = ANY (SELECT UserId WHERE IP = "127.0.0.1");
-- Хотя бы одна запись из вложенного SELECT должна удовлетворять условию

-- Aggregate Functions (используются с GROUP BY)
MIN, MAX, SUM,
AVG      -- среднее значение
COUNT    -- кол-во знач. в столбце (неэффективно. Лучше хранить кол-во в табл. counters)
COUNT(*) -- кол-во строк в таблице

-- среднее значение col1 из всей tab1
SELECT avg(col1) FROM tab1;

-- среднее значение col1 отдельно в каждой группе, сгруппированной по col2
/*
Пример (TODO: проверить):
col1     avg     col2
1           2         asd
3           2         asd
5           6         dfg
7           6         dfg
*/
SELECT avg(col1) FROM tab1 GROUP BY col2;

-- кол-во всех записей в табл. tab1
SELECT count(*) FROM tab1;

-- GROUP BY   (группировка)
-- сумма col1 отдельно для каждой группы, группируя по признаку col2
SELECT col1, SUM(col1) FROM tab1 GROUP BY col2;

-- HAVING (работает с агрегатными функциями в условиях)
-- WHERE AVG(col2) > 10  (не работает)
SELECT col1, AVG(col2) FROM tab1 GROUP BY col1 HAVING AVG(col2) > 10;

--ORDER BY  (сортировка)
-- сортируем по col2, а, если col2 - одинаковы, то сортируем по col1
SELECT col1, SUM(col2) FROM tab1 ORDER BY col2, col1 DESC

-- Комбинация условий: 
-- AND, OR, IN, BETWEEN
SELECT col1, SUM(col2) FROM tab1 WHERE col2 <= 5 AND col1 > 3;
SELECT col1, SUM(col2) FROM tab1 WHERE col2 < 5 OR (col3 = 23 AND col1 >= 3);

-- IN
-- где col3 равно одному значению из списка (равносильно: col3 = 1 OR col3 = 4 OR col3 = 23)
SELECT col1, SUM(col2) FROM tab1 WHERE col3 IN (1, 4, 23); 
-- можно: SELECT ... IN (SELECT ...)

-- BETWEEN
-- где col3 равно любому значению в промежутке между val1 и val2 (в том числе val1 и val2)
-- равносильно: WHERE col3 >= val1 AND col3 <= val2
SELECT col1, SUM(col2) FROM tab1 WHERE col3 BETWEEN val1 AND val2; 

-- Задачи:
--