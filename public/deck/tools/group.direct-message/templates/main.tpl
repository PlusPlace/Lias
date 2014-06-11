<script id="dm-tmpl-main" type="text/template">
  <%
    /**
     *  Main Direct-Message Template
     *
     *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
     *  @copyright  2012, Plus-place project
    */
  %>

  <div class="ui-container group-dm-container">

    <div class="ui-header">
      <div class="ui-header-image">
        <img src="tools/personal.direct-message/style/images/icon.png" alt="" />
      </div>
      <div class="ui-header-text">
        <span>ダイレクトメッセージ</span>
      </div>
    </div>

    <div class="ui-box group-dm-box">
      <div class="ui-inner-box group-dm-inner-box">
        <a class="group-dm-anchor" href="#<% print( __dirname + 'destination/g0' ); %>">
          <img class="group-dm-user-icon r-tl r-bl" src="/-/dg0/profile-image.png" alt="" />
          <span class="group-dm-user-name">+place</span>
        </a>
      </div>
    </div>

    <div class="ui-box group-dm-box">
      <div class="ui-inner-box group-dm-inner-box">
        <a class="group-dm-anchor" href="#<% print( __dirname + 'destination/p0' ); %>">
          <img class="group-dm-user-icon r-tl r-bl" src="/-/dp0/profile-image.png" alt="" />
          <span class="group-dm-user-name">Administrator</span>
        </a>
      </div>
    </div>

    <div class="ui-box group-dm-box">
      <div class="ui-inner-box group-dm-inner-box">
        <a class="group-dm-anchor" href="#<% print( __dirname + 'destination/p1' ); %>">
          <img class="group-dm-user-icon r-tl r-bl" src="/-/dp1/profile-image.png" alt="" />
          <span class="group-dm-user-name">Guest 1</span>
        </a>
      </div>
    </div>

    <div class="ui-box group-dm-box">
      <div class="ui-inner-box group-dm-inner-box">
        <a class="group-dm-anchor" href="#<% print( __dirname + 'destination/p2' ); %>">
          <img class="group-dm-user-icon r-tl r-bl" src="/-/dp2/profile-image.png" alt="" />
          <span class="group-dm-user-name">Guest 1</span>
        </a>
      </div>
    </div>

  </div>
</script>
