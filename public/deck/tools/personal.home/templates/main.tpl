<script id="home-tmpl-main" type="text/template">
  <%
    /**
     *  Main Home Template
     *
     *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
     *  @copyright  2012, Plus-place project
    */
  %>

  <div class="ui-container personal-home-container">

    <div class="ui-header personal-home-header">
      <div class="ui-header-image">
        <img src="tools/personal.home/style/images/icon.png" alt="" />
      </div>
      <div class="ui-header-text">
        <span>ホーム</span>
      </div>
    </div>

    <div class="ui-body personal-home-body">

      <div style="float: left; width: 50%;">
        <div class="ui-box personal-home-box-title">
          <div class="ui-top-inner-box personal-home-inner-box-news-title">
            <span>新着情報</span>
            <a class="ui-button personal-home-title-button" href="#<% print( __dirname + 'latest' ); %>">すべて見る</a>
          </div>
        </div>

        <% for( var i = 0; i < 3; i++ ){ %>
          <div class="ui-box personal-home-box-news">
            <div class="<%
              if( i === 0 )
                print( 'ui-bottom-inner-box' );
              else
                print( 'ui-inner-box' );
            %> personal-home-inner-box-news">
              <span>ダイレクトメッセージに新着1件あります。</span>
              <div class="personal-home-news-status">
                <span>2012-5-27</span>
              </div>
            </div>
          </div>
        <% } %>

        <div class="ui-box personal-home-box-title">
          <div class="ui-top-inner-box personal-home-inner-box-news-title">
            <span>お知らせ</span>
            <a class="ui-button personal-home-title-button" href="#<% print( __dirname + 'news' ); %>">すべて見る</a>
          </div>
        </div>

        <% for( var i = 0; i < 3; i++ ){ %>
          <div class="ui-box personal-home-box-news">
            <div class="<%
              if( i === 0 )
                print( 'ui-bottom-inner-box' );
              else
                print( 'ui-inner-box' );
            %> personal-home-inner-box-news">
              <span>開発中・・・</span>
              <div class="personal-home-news-status">
                <span>2012-5-27</span>
              </div>
            </div>
          </div>
        <% } %>
      </div>

      <div style="float: left; width: 50%;">
        <div class="ui-box personal-home-box-title">
          <div class="ui-top-inner-box personal-home-inner-box-event-title">
            <span>おすすめのイベント</span>
            <a class="ui-button personal-home-title-button" href="#events">すべて見る</a>
          </div>
        </div>

        <% for( var i = 0; i < 4; i++ ){ %>
          <div class="ui-box personal-home-box-event">
            <div class="<%
              if( i === 0 )
                print( 'ui-bottom-inner-box' );
              else
                print( 'ui-inner-box' );
            %> personal-home-inner-box-event">
              <div class="personal-home-event-icon r-tl r-bl">
                <img src="/-/dg0/profile-image.png" alt="" />
              </div>
              <span class="personal-home-event-name">第1回+placeカンファレンス</span><br />
              <span class="personal-home-event-date">2012年 5月 27日</span>
            </div>
          </div>
        <% } %>
      </div>

    </div>
  </div>
</script>
