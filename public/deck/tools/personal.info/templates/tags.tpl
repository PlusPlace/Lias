<script id="info-tmpl-dialog" type="text/template">
  <%
    /**
     *  Tags Info Template
     *
     *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
     *  @copyright  2012, Plus-place project
    */

    var getSelection = function( value ){
      if( data.privacy.tags == value )
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
        <span>タグの設定</span>
      </div>
    </div>

    <div class="ui-box personal-info-box">
      <div class="ui-top-inner-box personal-info-top-inner-box-typeB">
        <div class="personal-info-box-body">
          <form action="#" class="personal-info-form">

            <dl class="personal-info-center-list personal-info-list-no-border">
              <dt>タグ</dt>
              <dd data-input="info::dialog::tags"></dd>
            </dl>

            <dl class="personal-info-center-list personal-info-list-no-border">
              <dt>追加するタグ名</dt>
              <dd class="personal-info-add-list">
                <img src="style/images/add.png" alt="" data-button="info::dialog::add" />
                <textarea data-input="info::dialog::tagText"></textarea>
              </dd>
            </dl>

            <dl class="personal-info-center-list personal-info-list-no-border" style="display: none;" data-part="info::dialog::tagNotice">
              <dt></dt>
              <dd class="personal-info-alert">入力に誤りがあります。</dd>
            </dl>

            <dl class="personal-info-center-list personal-info-list-no-border">
              <dt>プライバシー</dt>
              <dd>
                <select data-input="info::dialog::tagsPrivacy">
                  <option value="private" <% print( getSelection( 'private' ) ); %>>非公開</option>
                  <option value="limited" <% print( getSelection( 'limited' ) ); %>>メンバーのみ公開</option>
                  <option value="public"  <% print( getSelection( 'public' ) ); %>>公開</option>
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

<script id="info-tmpl-tag" type="text/template">
  <div data-append="<%= tag.tagId %>" class="personal-info-removable-datum">
    <img class="personal-info-remover" src="style/images/remove.png" alt="Remover" onclick="$( this ).parent().remove();" />
    <span><%= tag.name %></span>
  </didv>
</script>
