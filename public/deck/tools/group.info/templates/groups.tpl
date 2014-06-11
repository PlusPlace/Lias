<script id="info-tmpl-dialog" type="text/template">
  <%
    /**
     *  Groups Info Template
     *
     *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
     *  @copyright  2012, Plus-place project
    */
  %>

  <div class="ui-container group-info-dialog-container">

    <div class="ui-header">
      <div class="ui-header-image">
        <img src="tools/group.info/style/images/icon.png" alt="Tool Image" />
      </div>
      <div class="ui-header-text">
          <span>フォローしているグループの設定</span>
      </div>
    </div>

    <div class="ui-box group-info-box">
      <div class="ui-top-inner-box group-info-top-inner-box-typeB">
        <div class="group-info-box-body">
          <form action="#" class="group-info-form">

            <dl class="group-info-center-list group-info-list-no-border" data-input="info::dialog::groups">
              <dt style="width: 150px;">フォローしているグループ</dt>
              <dd>
                <%
                  for( var i = 0; data.groups[ i ]; i++ ){
                    var group = data.groups[ i ];
                %>
                  <div class="group-info-removable-data <% if( i === 0 ) print( 'group-info-list-no-border' ); %>" data-append="<%= group.groupId %>">
                    <img class="group-info-remover" src="style/images/remove.png" alt="Remover" onclick="$( this ).parent().remove();"/>
                    <img src="<%= group.icon %>" alt="<%= group.name %>" />
                    <span><%= group.name %></span>
                  </div>
                <% } %>
              </dd>
            </dl>

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
