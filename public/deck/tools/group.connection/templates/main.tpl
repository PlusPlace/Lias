<script id="connection-tmpl-main" type="text/template">
  <%
    /**
     *  Connection Main Template
     *
     *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
     *  @copyright  2012, +place
    */
  %>
  <div class="ui-container group-connection-container">

    <div class="ui-header">
      <div class="ui-header-image">
        <img src="tools/group.connection/style/images/icon.png" alt="" />
      </div>
      <div class="ui-header-text">
        <span>コネクション</span>
      </div>
    </div>

    <div id="group-connection-lists"></div>

  </div>
</script>

<script id="connection-tmpl-connecting-group" type="text/template">
  <div class="ui-box group-connection-box" data-append="<%= groupId %>">

    <% if( permission === true ){ %>
    <div class="ui-top-inner-box group-connection-inner-box-title" data-part="group-connection-editable-field">
      <span class="ui-button group-connection-button" data-button="group-connection-remove-button">連携解除</span>
      <span class="ui-button group-connection-back-button" data-button="group-connection-cancel-remove-button">キャンセル</span>
      <div class="group-connection-editor">
        <form action="#">
          <dl>
            <dt>このグループとの連携を解除しますか？</dt>
            <dd><span class="ui-button group-connection-remove-button" data-button="group-connection-remove-confirm-button">確認</span></dd>
          </dl>
        </form>
      </div>
    </div>
    <% } %>

    <div class="<%
      if( permission === true )
        print( 'ui-bottom-inner-box' );
      else
        print( 'ui-inner-box' );
    %> group-connection-inner-box">
      <img class="group-connection-user-icon" src="<%= icon %>" alt="" />
      <div class="group-connection-user-data">
        <div class="group-connection-name">
          <a href="#<%= groupId %>"><%= name %></a>
        </div>
      </div>
    </div>
  </div>
</script>
