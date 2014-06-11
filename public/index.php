<!DOCTYPE html>

<html lang="ja">

    <head>
        <title>Lias</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta http-equiv="Content-Style-Type" content="text/css" />
        <meta http-equiv="Content-Script-Type" content="text/javascript" />
        <meta name="keywords" content="Lias" />
        <meta name="description" content="Create your events and groups." />
        <meta name="author" content="Saneyuki Tadokoro <post@saneyuki.gfunction.com>" />
        <meta name="copyright" content="Lias Under Construct. Copyright (c) 2011, 2012 Plus-place project." />
        <link rel="stylesheet" type="text/css" href="/welcome/style/welcome.css" />
        <script type="text/javascript">
          var getXhr = function(){
            var xhr;
            try{
              xhr = new XMLHttpRequest();
            } catch( e ){
              try{
                xhr = new XDomainRequest();
              } catch( e ){
                try{
                  xhr = new ActiveXObject( 'Msxml2.XMLHTTP' );
                } catch( e ){
                  try{
                    xhr = new ActiveXObject( 'Microsft.XMLHTTP' );
                  }
                  catch( e ){
                    xhr = false;
                  }
                }
              }
            }
            return xhr;
          };

          var xhr = getXhr();
          var callback = function(){
            if( xhr.readyState == 4 && xhr.status == 200 )
              location.href = '/deck/';
          };

          if( xhr.onload )
            xhr.onload = callback;
          else
            xhr.onreadystatechange = callback;

          xhr.open( 'GET', '/-/session.php', false );
          xhr.send( null );
        </script>
    </head>
    
    <body>
        <div class="cover">
            <div class="cover-main">
                <div class="top">
                    <img class="logo" src="welcome/style/images/logo_normal.png" alt="" />
                    <a id="login" class="login-button radius" href="/login/">外部IDでログイン</a>
                </div>
                
                <div id="frame" class="radius">
                    <img id="event-icon" src="welcome/style/images/image.png" alt="" />
                </div>
                
                <div id="description">
                    <p class="section-title">
                        学生が提供する、<br />
                        学生のための、<br />
                        イベント開催支援サービス
                    </p>
                    <p class="section-contents">
                        学生にフォーカスしたサービスを提供することにより、同じ趣味、興味をもつ同学年とのマッチングがしやすくしました。<br />
                        これにより、あなたの学生生活がより良いものとなることを私たちは願っています。
                    </p>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-main">
                <a href="http://plusplace.info" title="+place website"><img class="plus-place-logo" src="welcome/style/images/plus-place-logo_normal.png" alt="" /></a>
                <div class="footer-main-contents">
                    <div class="bio">Create your events and groups</div>
                    <div class="copyright">Copyright (c) 2012 Plus-place project. All rights reserved.</div>
                </div>
            </div>
        </div>
    </body>

</html>
