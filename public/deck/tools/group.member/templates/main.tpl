<script id="member-tmpl-main" type="text/template">
  <%
    /**
     *  Member Main Template
     *
     *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
     *  @copyright  2012, +place
    */
  %>
  <div class="ui-container member-container">

    <div class="ui-header member-header">
      <div class="ui-header-image">
        <img src="tools/group.member/style/images/icon.png" alt="" />
      </div>
      <div class="ui-header-text">
        <span>メンバー</span>
      </div>
    </div>

    <div id="member-lists"><div></div></div>

  </div>
</script>

<script id="member-tmpl-login-user" type="text/template">
  <div class="ui-box member-box">
    <div class="ui-top-inner-box member-inner-box-title" data-part="member-editable-field">
      <span class="ui-button member-button" data-button="member-edit-button">編集</span>
      <span class="ui-button member-back-button" data-button="member-complete-edit-button">完了</span>
      <div class="member-editor">
        <form action="#">
          <dl>
            <dt>役職</dt>
            <dd>
              <textarea data-input="member-position-text"><%= data.position %></textarea>
            </dd>
          </dl>
        </form>
      </div>
    </div>
    <div class="ui-bottom-inner-box member-inner-box">
      <img class="member-user-icon" src="<%= data.icon %>" alt="" />
      <div class="member-user-data">
        <div class="member-info">
          <a href="#p<%= data.userId %>"><%= data.name %></a>
          <% if( data.admin === true ){ %>
            <img src="style/images/admin.png" alt="" />
          <% } %>
        </div>
        <div class="member-status">
          <% if( data.position && data.position.length > 0 ){ %>
            <span>役職: </span><span data-input="member-position"><%= data.position %></span>
          <% } %>
        </div>
        <div class="member-status">
          <% if( data.mail && data.mail.length > 0 ){ %>
            <span>メールアドレス: </span><span><%
              for( var i = 0; data.mail[ i ]; i++ )
                print( data.mail[ i ] );
            %></span>
          <% } %>
        </div>
      </div>
    </div>
  </div>
</script>

<script id="member-tmpl-belong-user" type="text/template">
  <div class="ui-box member-box" data-append="<%= data.userId %>">

    <% if( data.permission === true ){ %>
    <div class="ui-top-inner-box member-inner-box-title" data-part="member-editable-field">
      <span class="ui-button member-button" data-button="member-remove-button">除名</span>
      <span class="ui-button member-back-button" data-button="member-cancel-remove-button">キャンセル</span>
      <div class="member-editor">
        <form action="#">
          <dl>
            <dt>このメンバーを除名しますか？</dt>
            <dd><span class="ui-button member-remove-button" data-button="member-remove-confirm-button">確認</span></dd>
          </dl>
        </form>
      </div>
    </div>
    <% } %>

    <div class="<%
      if( data.permission === true )
        print( 'ui-bottom-inner-box' );
      else
        print( 'ui-inner-box' );
    %> member-inner-box">
      <img class="member-user-icon" src="<%= data.icon %>" alt="" />
      <div class="member-user-data">
        <div class="member-info">
          <a href="#p<%= data.userId %>"><%= data.name %></a>
          <% if( data.admin === true ){ %>
            <img src="style/images/admin.png" alt="" />
          <% } %>
        </div>
        <div class="member-status">
          <% if( data.position && data.position.length > 0 ){ %>
            <span>役職: </span><span><%= data.position %></span>
          <% } %>
        </div>
        <div class="member-status">
          <% if( data.mail && data.mail.length > 0 ){ %>
            <span>メールアドレス: </span><span><%
              for( var i = 0; data.mail[ i ]; i++ )
                print( data.mail[ i ] );
            %></span>
          <% } %>
        </div>
      </div>
    </div>
  </div>
</script>
