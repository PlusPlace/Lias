<script id="home-tmpl-main" type="text/template">
  <%
    /**
     *  Main Home Template
     *
     *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
     *  @copyright  2012, Plus-place project
    */
  %>

  <div class="ui-container group-home-container">

    <div class="ui-header">
      <div class="ui-header-image">
        <img src="tools/group.home/style/images/icon.png" alt="" />
      </div>
      <div class="ui-header-text">
        <span>ホーム</span>
      </div>
    </div>

    <div class="ui-body group-home-body">

      <div class="group-home-left-section">
        <div class="ui-box group-home-box-title">
          <div class="ui-top-inner-box group-home-inner-box-left-title">
            <span>新着情報</span>
            <a class="ui-button group-home-title-button" href="#<% print( __dirname + 'latest' ); %>">すべて見る</a>
          </div>
        </div>

        <% for( var i = 0; i < 3; i++ ){ %>
          <div class="ui-box group-home-box-left">
            <div class="<%
              if( i === 0 )
                print( 'ui-bottom-inner-box' );
              else
                print( 'ui-inner-box' );
            %> group-home-inner-box-left">
              <span>ダイレクトメッセージに新着1件あります。</span>
              <div class="group-home-status">
                <span>2012-5-27</span>
              </div>
            </div>
          </div>
        <% } %>

      </div>

      <div class="group-home-right-section">
        <div class="ui-box group-home-box-title">
          <div class="ui-top-inner-box group-home-inner-box-right-title">
            <span>開催中のイベント</span>
            <a class="ui-button group-home-title-button" href="#<% print( __useId + 'event' ); %>">すべて見る</a>
          </div>
        </div>

        <% for( var i = 0; i < 1; i++ ){ %>
          <div class="ui-box group-home-box-right">
            <div class="<%
              if( i === 0 )
                print( 'ui-bottom-inner-box' );
              else
                print( 'ui-inner-box' );
            %> group-home-inner-box-right">
              <div class="group-home-event-icon r-tl r-bl">
                <img src="/-/dg0/profile-image.png" alt="" />
              </div>
              <span class="group-home-event-name">第一回+placeカンファレンス</span><br />
              <span class="group-home-event-date">2012年6月10日</span>
            </div>
          </div>
        <% } %>
      </div>

    </div>
  </div>
</script>
