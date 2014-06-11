<?php
$data = json_decode('
[{
    "createdAt": "2012-3-22 0:00",
    "article": "Hello, world.",
    "articleId": "a0",
    "group": {
        "name": "+place",
        "groupId": "g0",
        "icon": "/-/dg0/profile-image.png"
    }
},
{
    "createdAt": "2012-3-22 0:00",
    "article": "<p>テストアーティクル1 - パラグラフ1 - ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 - いろはにほへとちりぬるをわかよたれそつれならむうゐのおくやまけふこえてあさきゆめみしゑひもせす</p><p>テストアーティクル1 - パラグラフ2 - ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890</p><p>テストアーティクル1 - パラグラフ3 - いろはにほへとちりぬるをわかよたれそつれならむうゐのおくやまけふこえてあさきゆめみしゑひもせす</p>",
    "articleId": "a1",
    "group": {
        "name": "+place",
        "groupId": "g0",
        "icon": "/-/dg0/profile-image.png"
    }
},
{
    "createdAt": "2012-3-22 0:00",
    "article": "<p>テストアーティクル2 - パラグラフ1 - 文字列</p>",
    "articleId": "a2",
    "group": {
        "name": "+place",
        "groupId": "g0",
        "icon": "/-/dg0/profile-image.png"
    }
},
{
    "createdAt": "2012-3-22 0:00",
    "article": "<p>テストアーティクル3 - イメージ1</p><img src=\"/-/dp0/profile-image.png\" alt=\"\" />",
    "articleId": "a3",
    "group": {
        "name": "+place",
        "groupId": "g0",
        "icon": "/-/dg0/profile-image.png"
    }
},
{
    "createdAt": "2012-3-22 0:00",
    "article": "<p>テストアーティクル4 - パラグラフ1 - 文字列</p><p>テストアーティクル4 - パラグラフ2 - 文字列</p><p>テストアーティクル4 - パラグラフ3 - 文字列</p>",
    "articleId": "a4",
    "group": {
        "name": "+place",
        "groupId": "g0",
        "icon": "/-/dg0/profile-image.png"
    }
},
{
    "createdAt": "2012-3-22 0:00",
    "article": "<p>テストアーティクル5 - サニタイジング確認 - &lt;script&gt;alert(1)&lt;/script&gt;</p>",
    "articleId": "a5",
    "group": {
        "name": "+place",
        "groupId": "g0",
        "icon": "/-/dg0/profile-image.png"
    }
},
{
    "createdAt": "2012-3-22 0:00",
    "article": "<p>テストアーティクル6 - XSS対策確認1 - \"&gt;&lt;script&gt;alert(1)&lt;/script</p><p>テストアーティクル6 - XSS対策確認1 - \"&gt;&lt;script&gt;alert(1)&lt;/script</p>",
    "articleId": "a6",
    "group": {
        "name": "+place",
        "groupId": "g0",
        "icon": "/-/dg0/profile-image.png"
    }
}]


');
$data['result'] = 'ok';
$json = json_encode($data);
print_r($json);