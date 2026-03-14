"""
seleniumでページ内の要素を取得する方法

【【find_element()メソッドとByクラスを使用する必要がある】】

自動化のテキストP203の「chrome_get_title.py」での具体例を以下に記します

from selenium import webdriver
from selenium.webdriver.common.by import By　　←【追記】

driver = webdriver.Chrome()
url = "https://uta.pw/sakusibbs/post.php?mml_id=35"

driver.get(url)

e = driver.find_element(By.CLASS_NAME,"posttitle")　　←【変更点】
print(e.text)

driver.close()




自動化のテキストP201の要素の検索を行うメソッドの記述方法は以下の通りとなります

find_element(By.TAG_NAME, "タグ名")
find_element(By.ID, "id名")
find_element(By.CLASS_NAME, "クラス名")
find_element(By.CSS_SELECTOR, "cssセレクタ")
find_element(By.NAME, "name属性")
find_element(By.LINK_TEXT, "テキスト")
find_element(By.PARTIAL_LINK_TEXT, "テキスト")
find_element(By.XPATH, "XPath")


"""



# ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
# ┃          Selenium 参照用コード                   ┃
# ┃       Selenium 4.x での正しい要素取得方法         ┃
# ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
#
"""
seleniumでページ内の要素を取得する方法

【【find_element()メソッドとByクラスを使用する必要がある】】

自動化のテキストP203の「chrome_get_title.py」での具体例を以下に記します

from selenium import webdriver
from selenium.webdriver.common.by import By　　←【追記】

driver = webdriver.Chrome()
url = "https://uta.pw/sakusibbs/post.php?mml_id=35"

driver.get(url)

e = driver.find_element(By.CLASS_NAME,"posttitle")　　←【変更点】
print(e.text)

driver.close()




自動化のテキストP201の要素の検索を行うメソッドの記述方法は以下の通りとなります

find_element(By.TAG_NAME, "タグ名")
find_element(By.ID, "id名")
find_element(By.CLASS_NAME, "クラス名")
find_element(By.CSS_SELECTOR, "cssセレクタ")
find_element(By.NAME, "name属性")
find_element(By.LINK_TEXT, "テキスト")
find_element(By.PARTIAL_LINK_TEXT, "テキスト")
find_element(By.XPATH, "XPath")


試験での注意
・from selenium.webdriver.common.by import By を忘れずにインポート
・By. の後の定数は大文字で始まる（CLASS_NAME など）
・古い書き方（find_element_by_class_name など）は絶対に使わない
・第6問ではこの形式を参考に赤枠部分の文字列を取得してください
"""

# ────────────────────────────────────────────────
#  第6問で使うときの基本テンプレート（コピーして使ってOK）
# ────────────────────────────────────────────────

from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()

# Python公式ページを開く
driver.get("https://python.org")

# ここに要素を探すコードを書く
# 例: e = driver.find_element(By.CLASS_NAME, "クラス名")
#     print(e.text)

# 終わったら必ず閉じる
driver.quit()