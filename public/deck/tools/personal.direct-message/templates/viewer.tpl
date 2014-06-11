<script id="dm-tmpl-viewer" type="text/template">
  <%
    /**
     *  Direct-Message Template
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
        <span><%= data.destination %></span>
      </div>
    </div>

    <div id="personal-dm-body">
      <div class="scrollbar disable"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>
      <div class="viewport">
        <div id="personal-dm-inner-body" class="overview">

          <div class="ui-box personal-dm-box-viewer-received">
            <div class="ui-inner-box personal-dm-inner-box-viewer-received">
              <span>メッセージ受け取れた？</span><br />
              <div class="personal-dm-status">
                <span>2012-6-1 16:00</span>
              </div>
            </div>
          </div>

          <div class="ui-box personal-dm-box-viewer-sent">
            <div class="ui-inner-box personal-dm-inner-box-viewer-sent">
              <span>
                受け取れてるよ。<br />
                こっちのメッセージも見れる？
              </span>
              <div class="personal-dm-status">
                <span>2012-6-1 16:00</span>
              </div>
            </div>
          </div>

          <div class="ui-box personal-dm-box-viewer-received">
            <div class="ui-inner-box personal-dm-inner-box-viewer-received">
              <span>見れるよ。</span>
              <div class="personal-dm-status">
                <span>2012-6-1 16:00</span>
              </div>
            </div>
          </div>

          <div class="ui-box personal-dm-box-viewer-sent">
            <div class="ui-inner-box personal-dm-inner-box-viewer-sent">
              <span>ダイレクトメールとダイレクトメッセージの意味履き違えてた・・・。</span>
              <div class="personal-dm-status">
                <span>2012-6-1 16:00</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>

    <div class="ui-box personal-dm-box-form">
      <div class="ui-inner-box personal-dm-inner-box-form">
        <form action="#">
          <textarea data-input="personal-dm-textarea"></textarea>
          <span class="ui-button personal-dm-send-button" data-button="personal-dm-send-button">送信</span>
        </form>
      </div>
    </div>

  </div>
</script>

<script id="dm-tmpl-sent-message" type="text/template">
  <div class="ui-box personal-dm-box-viewer-sent">
    <div class="ui-inner-box personal-dm-inner-box-viewer-sent">
      <span><%= message %></span>
      <div class="personal-dm-status">
        <span><%= year %>-<%= month %>-<%= day %> <%= hour %>:<%= minute %></span>
      </div>
    </div>
  </div>
</script>

<script id="dm-tmpl-received-message" type="text/template">
  <div class="ui-box personal-dm-box-viewer-received">
    <div class="ui-inner-box personal-dm-inner-box-viewer-received">
      <span><%= message %></span>
      <div class="personal-dm-status">
        <span><%= year %>-<%= month %>-<%= day %> <%= hour %>:<%= minute %></span>
      </div>
    </div>
  </div>
</script>
