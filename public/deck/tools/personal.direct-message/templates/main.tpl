<script id="dm-tmpl-main" type="text/template">
  <%
    /**
     *  Main Direct-Message Template
     *
     *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
     *  @copyright  2012, Plus-place project
    */
  %>

  <div class="ui-container personal-dm-container">

    <div class="ui-header">
      <div class="ui-header-image">
        <img src="tools/personal.direct-message/style/images/icon.png" alt="" />
      </div>
      <div class="ui-header-text">
        <span>ダイレクトメッセージ</span>
      </div>
    </div>

    <div class="ui-box personal-dm-box">
      <div class="ui-inner-box personal-dm-inner-box">
        <a class="personal-dm-anchor" href="#<% print( __dirname + 'destination/g0' ); %>">
          <img class="personal-dm-user-icon r-tl r-bl" src="/-/dg0/profile-image.png" alt="" />
          <span class="personal-dm-user-name">+place</span>
        </a>
      </div>
    </div>

    <div class="ui-box personal-dm-box">
      <div class="ui-inner-box personal-dm-inner-box">
        <a class="personal-dm-anchor" href="#<% print( __dirname + 'destination/p0' ); %>">
          <img class="personal-dm-user-icon r-tl r-bl" src="/-/dp0/profile-image.png" alt="" />
          <span class="personal-dm-user-name">Administrator</span>
        </a>
      </div>
    </div>

    <div class="ui-box personal-dm-box">
      <div class="ui-inner-box personal-dm-inner-box">
        <a class="personal-dm-anchor" href="#<% print( __dirname + 'destination/p1' ); %>">
          <img class="personal-dm-user-icon r-tl r-bl" src="/-/dp1/profile-image.png" alt="" />
          <span class="personal-dm-user-name">Guest 1</span>
        </a>
      </div>
    </div>

    <div class="ui-box personal-dm-box">
      <div class="ui-inner-box personal-dm-inner-box">
        <a class="personal-dm-anchor" href="#<% print( __dirname + 'destination/p2' ); %>">
          <img class="personal-dm-user-icon r-tl r-bl" src="/-/dp2/profile-image.png" alt="" />
          <span class="personal-dm-user-name">Guest 1</span>
        </a>
      </div>
    </div>

  </div>
</script>
