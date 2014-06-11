<?php
$data = json_decode('
[{
    "name": "Administrator",
    "userId": "p0",
    "type": "personal"
}]
');
$data['result'] = 'ok';
$json = json_encode($data);
print_r($json);