<script id="info-tmpl-dialog" type="text/template">
  <%
    /**
     *  Contact Info Template
     *
     *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
     *  @copyright  2012, Plus-place project
    */

    var ci = data.contactInfo;
  %>

  <div class="ui-container group-info-dialog-container">

    <div class="ui-header">
      <div class="ui-header-image">
        <img src="tools/group.info/style/images/icon.png" alt="Tool Image" />
      </div>
      <div class="ui-header-text">
        <span>コンタクト情報の設定</span>
      </div>
    </div>

    <div class="ui-box group-info-box">
      <div class="ui-top-inner-box group-info-top-inner-box-typeB">
        <div class="group-info-box-body">

          <form action="#" class="group-info-form">

            <% if( ci.mails && ci.mails.length > 0 ){ %>
              <dl class="group-info-center-list group-info-list-no-border">
                <dt style="width: 150px;">メールアドレス</dt>
                <dd data-input="info::dialog::mails"></dd>
              </dl>

              <dl class="group-info-center-list group-info-list-no-border">
                <dt style="width: 150px;">追加するメールアドレス</dt>
                <dd class="group-info-add-list">
                  <img data-button="info::dialog::addMail" src="style/images/add.png" alt="" />
                  <textarea data-input="info::dialog::mailText"></textarea>
                </dd>
              </dl>

              <dl class="group-info-center-list group-info-list-no-border" style="display: none;" data-part="info::dialog::mailsNotice">
                <dt style="width: 150px;"></dt>
                <dd class="group-info-alert">入力に誤りがあります。</dd>
              </dl>

            <% } %>

            <% if( ci.websites && ci.websites.length > 0 ){ %>
              <dl class="group-info-center-list">
                <dt style="width: 150px;">ウェブサイト</dt>
                <dd data-input="info::dialog::websites"></dd>
              </dl>

              <dl class="group-info-center-list group-info-list-no-border" data-input="info::dialog::addWebsites">
                <dt style="width: 150px;">追加するウェブサイトURL</dt>
                <dd class="group-info-add-list">
                  <img data-button="info::dialog::addWebsite" src="style/images/add.png" alt="" />
                  <textarea data-input="info::dialog::websiteText"></textarea>
                </dd>
              </dl>

              <dl class="group-info-center-list group-info-list-no-border" style="display: none;" data-part="info::dialog::websitesNotice">
                <dt></dt>
                <dd class="group-info-alert">入力に誤りがあります。</dd>
              </dl>

            <% } %>

          </form>

        </div>
      </div>
      <div class="ui-bottom-inner-box group-info-bottom-inner-box-typeB">
        <span class="ui-button group-info-apply-button" data-button="info::dialog::apply">適用</span>
        <span class="ui-button group-info-cancel-button" data-button="info::dialog::cancel">キャンセル</span>
      </div>
    </div>
  </div>
</script>

<script id="info-tmpl-datum" type="text/template">
  <div data-append="<%= datum %>" class="group-info-removable-datum">
    <img class="group-info-remover" src="style/images/remove.png" alt="Remover" onclick="$( this ).parent().remove();" />
    <span><%= datum %></span>
  </div>
</script>
