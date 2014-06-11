<script id="info-tmpl-dialog" type="text/template">
  <%
    /**
     *  Groups Info Template
     *
     *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
     *  @copyright  2012, Plus-place project
    */

    var getSelection = function( value ){
      if( data.privacy.groups == value )
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
          <span>フォローしているグループの設定</span>
      </div>
    </div>

    <div class="ui-box personal-info-box">
      <div class="ui-top-inner-box personal-info-top-inner-box-typeB">
        <div class="personal-info-box-body">
          <form action="#" class="personal-info-form">

            <dl class="personal-info-center-list personal-info-list-no-border">
              <dt style="width: 150px">フォローしているグループ</dt>
              <dd data-input="info::dialog::groups">
                <%
                  for( var i = 0; data.groups[ i ]; i++ ){
                    var group = data.groups[ i ];
                %>
                  <div class="personal-info-removable-data <% if( i === 0 ) print( 'personal-info-list-no-border' ); %>" data-append="<%= group.groupId %>">
                    <img class="personal-info-remover" src="style/images/remove.png" alt="Remover" onclick="$( this ).parent().remove();"/>
                    <img src="<%= group.icon %>" alt="<%= group.name %>" />
                    <span><%= group.name %></span>
                  </div>
                <% } %>
              </dd>
            </dl>

            <dl class="personal-info-center-list personal-info-list-no-border">
              <dt style="width: 150px">プライバシー</dt>
              <dd>
                <select data-input="info::dialog::groupsPrivacy">
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
