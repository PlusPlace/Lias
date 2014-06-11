<!DOCTYPE html>
<html lang="ja">

  <head>
    <title>Lias</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="style/init.css" />
    <link rel="stylesheet" type="text/css" href="style/template.css" />
  </head>
    
  <body>
    <div id="loading">
      <!-- AtLoading -->
      <!-- /AtLoading -->
      
      <!-- LoadingError -->
        <noscript>
          <div class="noscript">
            このブラウザではLiasを利用できません。
          </div>
        </noscript>
        <div id="not-supported">
          このブラウザはLiasの動作条件を満たしていません。
        </div>
      <!-- /LoadingError -->
    </div>
      
    <div id="lancher">
      <div class="scrollbar disable"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>
      <div class="viewport"><div id="inner-lancher" class="overview"></div></div>
    </div>
    
    <div id="header">
      <div class="header-top">
        <img class="logo" src="style/images/logo.png" alt="Logo" />
        <ul id="header-buttons">
          <li id="user-menu">
            <img src="style/images/user-menu.png" />
          </li>
          <li id="search">
            <img src="style/images/search.png" />
          </li>
          <li id="back-to-home">
            <img src="style/images/back-to-home.png" />
          </li>
          <li id="page-status">
            <img id="page-icon" src="/-/dp0/profile-image.png" />
            <span id="page-name">Administrator</span>
          </li>
        </ul>
      </div>
      <div class="header-bottom">
        <table class="header-table-menu">
          <tr>
            <td>
              <a href="/help" target="_blank">
                <img id="header-help" src="style/images/help.png" alt="Help" /><br />
                <span>ヘルプ</span>
              </a>
            </td>
            <td>
              <a href="#setting">
                <img id="header-setting" src="style/images/setting.png" alt="Setting" /><br />
                <span>設定</span>
              </a>
            </td>
            <td>
              <a href="">
                <img id="header-logout" src="style/images/logout.png" alt="Logout" /><br />
                <span>ログアウト</span>
              </a>
            </td>
          </tr>
        </table>
      </div>
    </div>
    
    <div id="multipurpose-board">
      <div class="scrollbar disable"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>
      <div class="viewport"><div id="inner-multipurpose-board" class="overview"></div></div>
    </div>

    <div id="loader"></div>

    <!-- Needless components. -->
    <script type="text/javascript" charset="UTF-8" src="scripts/lib/jquery/jquery.js"></script>
    <script type="text/javascript" charset="UTF-8" src="scripts/lib/jquery/jquery.tinyscrollbar.js"></script>
    <script type="text/javascript" charset="UTF-8" src="scripts/lib/underscore/underscore.js"></script>
    <script type="text/javascript" charset="UTF-8" src="scripts/lib/backbone/backbone.js"></script>
    <script type="text/javascript" charset="UTF-8" src="scripts/lib/require/require.js"></script>

    <!-- Initialize -->
    <script type="text/javascript" charset="UTF-8" src="scripts/config.js"></script>
  </body>

</html>
