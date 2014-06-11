<script id="info-tmpl-dialog" type="text/template">
  <%
    /**
     *  Contact Info Template
     *
     *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
     *  @copyright  2012, Plus-place project
    */

    var ci = data.contactInfo
      , pr = data.privacy;

    /**
     *  @param  string type
     *  @param  string value
     *  @return 'selected="true"' or ''
    */
    var getSelectedPrivacy = function( type, value ){
      if( pr[ type ] == value )
        return 'selected="true"';
      else
        return '';
    };
  %>

  <div class="ui-container personal-info-dialog-container">

    <div class="ui-header">
      <div class="ui-header-image">
        <img src="tools/personal.info/style/images/icon.png" alt="Tool Image" />
      </div>
      <div class="ui-header-text">
        <span>コンタクト情報の設定</span>
      </div>
    </div>

    <div class="ui-box personal-info-box">
      <div class="ui-top-inner-box personal-info-top-inner-box-typeB">
        <div class="personal-info-box-body">

          <form action="#" class="personal-info-form">

            <dl class="personal-info-center-list personal-info-list-no-border">
              <dt style="width: 150px">メールアドレス</dt>
              <dd data-input="info::dialog::mails"></dd>
            </dl>

            <dl class="personal-info-center-list personal-info-list-no-border">
              <dt style="width: 150px">追加するメールアドレス</dt>
              <dd class="personal-info-add-list">
                <img data-button="info::dialog::addMail" src="style/images/add.png" alt="" />
                <textarea data-input="info::dialog::mailText"></textarea>
              </dd>
            </dl>

            <dl class="personal-info-center-list personal-info-list-no-border" style="display: none;" data-part="info::dialog::mailsNotice">
              <dt style="width: 150px"></dt>
              <dd class="personal-info-alert">入力に誤りがあります。</dd>
            </dl>

            <dl class="personal-info-center-list personal-info-list-no-border">
              <dt style="width: 150px"></dt>
              <dd>
                <select data-input="info::dialog::mailsPrivacy">
                  <option value="private" <% print( getSelectedPrivacy( 'mails', 'private' ) ); %>>非公開</option>
                  <option value="limited" <% print( getSelectedPrivacy( 'mails', 'limited' ) ); %>>グループメンバーのみ公開</option>
                  <option value="public"  <% print( getSelectedPrivacy( 'mails', 'public' ) ); %>>公開</option>
                </select>
              </dd>
            </dl>

              <dl class="personal-info-center-list">
                <dt style="width: 150px">ウェブサイト</dt>
                <dd data-input="info::dialog::websites"></dd>
              </dl>

              <dl class="personal-info-center-list personal-info-list-no-border" data-input="info::dialog::addWebsites">
                <dt style="width: 150px">追加するウェブサイトURL</dt>
                <dd class="personal-info-add-list">
                  <img data-button="info::dialog::addWebsite" src="style/images/add.png" alt="" />
                  <textarea data-input="info::dialog::websiteText"></textarea>
                </dd>
              </dl>

              <dl class="personal-info-center-list personal-info-list-no-border" style="display: none;" data-part="info::dialog::websitesNotice">
                <dt style="width: 150px"></dt>
                <dd class="personal-info-alert">入力に誤りがあります。</dd>
              </dl>

              <dl class="personal-info-center-list personal-info-list-no-border">
                <dt style="width: 150px"></dt>
                <dd>
                  <select data-input="info::dialog::websitesPrivacy">
                    <option value="private" <% print( getSelectedPrivacy( 'websites', 'private' ) ); %>>非公開</option>
                    <option value="limited" <% print( getSelectedPrivacy( 'websites', 'limited' ) ); %>>グループメンバーのみ公開</option>
                    <option value="public"  <% print( getSelectedPrivacy( 'websites', 'public' ) ); %>>公開</option>
                  </select>
                </dd>
              </dl>

          </form>

        </div>
      </div>

      <div class="ui-bottom-inner-box personal-info-bottom-inner-box-typeB">
        <span class="ui-button personal-info-apply-button" data-button="info::dialog::apply">適用</span>
        <span class="ui-button personal-info-cancel-button" data-button="info::dialog::cancel">キャンセル</span>
      </div>
    </div>
  </div>
</script>

<script id="info-tmpl-datum" type="text/template">
  <div data-append="<%= datum %>" class="personal-info-removable-datum">
    <img class="personal-info-remover" src="style/images/remove.png" alt="Remover" onclick="$( this ).parent().remove();" />
    <span><%= datum %></span>
  </div>
</script>
