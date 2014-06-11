<script id="group-tmpl-main" type="text/template">
  <%
    /**
     *  Group Main Template
     *
     *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
     *  @copyright  2012, +place
    */
  %>

  <div class="ui-container group-container">

    <div class="ui-header">
      <div class="ui-header-image">
        <img src="tools/personal.group/style/images/icon.png" alt="" />
      </div>
      <div class="ui-header-text">
        <span>グループ</span>
      </div>
    </div>

    <div class="ui-body">
      <%
        for( var i = 0; data[ i ]; i++ ){
          var datum = data[ i ];
      %>
        <div class="ui-box group-box">
          <div class="ui-top-inner-box group-top-inner-box">
            <div class="group-header">
              <span><%= datum.group.name %> の近況</span>
            </div>
            <a class="ui-button group-button" href="#<%= datum.group.groupId %>">管理ページ</a>
          </div>
          <div class="ui-bottom-inner-box group-bottom-inner-box">
            <img class="group-profile-image" src="<%= datum.group.icon %>" alt="<%= datum.group.name %>" />

            <%
              for( var j = 0; datum.updates[ j ]; j++ ){
                var update = datum.updates[ j ];
            %>
              <div class="group-contents" data-update-id="<%= update.updateId %>">
                <div class="group-update-text">
                  <span><%= update.update %>
                </div>

                <div class="group-update-status">
                  <span><%= update.updatedAt %></span>
                </div>
              </div>
            <% } %>

          </div>
        </div>
      <% } %>
    </div>

  </div>
</script>
