<script id="info-tmpl-main" type="text/template">
  <%
    /** 
     *  Main Info Template
     *
     *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
     *  @copyright  2012, Plus-place project
    */

    //
    // CAUTION: These variables will be removed when upload function availables.
    //
    var groupDefaultProfileImage = 'style/images/group-default-profile-image.png'
      , personalDefaultProfileImage = 'style/images/default-profile-image.png';
  %>

  <div class="ui-container group-info-container">

    <div class="ui-header">
      <div class="ui-header-image">
        <img src="<%
          if( data.profileImage && data.profileImage.length > 0 )
            print( data.profileImage );
          else
            print( groupDefaultProfileImage );
        %>" alt="Profile Image" />
      </div>
      <div class="ui-header-text">
        <span><%= data.name %></span>
      </div>
    </div>


    <div class="ui-body">
      <div class="group-info-left-section">

        <% if( data.permission === true || ( data.summary && data.summary.length > 0 ) ){ %>
          <div class="ui-box group-info-box">
            <div class="ui-top-inner-box group-info-top-inner-box-typeA">
              <span>概要</span>
              <% if( data.permission === true ){ %>
                <a class="ui-button group-info-button" href="#<% print( __dir__ + 'edit/summary' ) %>">編集</a>
              <% } %>
            </div>
            <div class="ui-bottom-inner-box group-info-bottom-inner-box-typeA">
              <div class="group-info-text-info"><%= data.summary %></div>
            </div>
          </div>
        <% } %>


        <% if( data.permission === true || ( data.member && data.member.length > 0 ) ){ %>
          <div class="ui-box group-info-box">
            <div class="ui-top-inner-box group-info-top-inner-box-typeA">
              <span>メンバー</span>
            </div>
            <div class="ui-bottom-inner-box group-info-bottom-inner-box-typeA">
              <div class="group-info-cnt-info">
                <%
                  for( var i = 0; data.member[ i ]; i++ ){
                    var member = data.member[ i ];
                %>
                  <a href="#p<%= member.userId %>">
                    <img src="<%
                      if( member.icon && member.icon.length > 0 )
                        print( member.icon );
                      else
                        print( personalDefaultProfileImage );
                    %>" alt="<%= member.name %>" />
                  </a>
                <% } %>
              </div>
            </div>
          </div>
        <% } %>


        <% if( data.permission === true || ( data.groups && data.groups.length > 0 ) ){ %>
          <div class="ui-box group-info-box">
            <div class="ui-top-inner-box group-info-top-inner-box-typeA">
              <span>フォローしているグループ</span>
              <% if( data.permission === true ){ %>
                <a class="ui-button group-info-button" href="#<% print( __dir__ + 'edit/groups' ) %>">編集</a>
              <% } %>
            </div>
            <div class="ui-bottom-inner-box group-info-bottom-inner-box-typeA">
              <div class="group-info-cnt-info">
                <%
                  for( var i = 0; data.groups[ i ]; i++ ){
                    var group = data.groups[ i ];
                %>
                  <a href="#g<%= group.groupId %>">
                    <img src="<%
                      if( group.icon && group.icon.length > 0 )
                        print( group.icon );
                      else
                        print( groupDefaultProfileImage );
                    %>" alt="<%= group.name %>" />
                  </a>
                <% } %>
              </div>
            </div>
          </div>
        <% } %>


        <% if( data.permission === true || ( data.tags && data.tags.length > 0 ) ){ %>
          <div class="ui-box group-info-box">
            <div class="ui-top-inner-box group-info-top-inner-box-typeA">
              <span>タグ</span>
              <% if( data.permission === true ){ %>
                <a class="ui-button group-info-button" href="#<% print( __dir__ + 'edit/tags' ) %>">編集</a>
              <% } %>
            </div>
            <div class="ui-bottom-inner-box group-info-bottom-inner-box-typeA">
              <div class="group-info-tag-info">
                <%
                  for( var i = 0; data.tags[ i ]; i++ ){
                    var tag = data.tags[ i ];
                %>
                  <a href="#tag/info/id/<%= tag.tagId %>">
                    <span><%= tag.name %></span>
                  </a>
                <% } %>
              </div>
            </div>
          </div>
        <% } %>

      </div>


      <div class="group-info-right-section">
        <%
          if( data.permission === true || data.basicInfo ){
            var bi = data.basicInfo;
            var alreadyTop = false;
        %>
          <div class="ui-box group-info-box">
            <div class="ui-top-inner-box group-info-top-inner-box-typeA">
              <span>基本情報</span>
              <% if( data.permission === true ){ %>
                <a class="ui-button group-info-button" href="#<% print( __dir__ + 'edit/basicInfo' ) %>">編集</a>
              <% } %>
            </div>
            <div class="ui-bottom-inner-box group-info-bottom-inner-box-typeA">
              <% if( bi.founded && bi.founded.length > 0 ){ %>
                <dl class="group-info-list <%
                  if( alreadyTop === false ){
                    print( 'group-info-list-no-border' );
                    alreadyTop = true;
                  }
                %>">
                  <dt>設立年月日</dt>
                  <dd><%= bi.founded %></dd>
                </dl>
              <% } %>
            </div>
          </div>
        <% } %>


        <%
          if( data.permission === true || data.contactInfo ){
            var co = data.contactInfo;
            var alreadyTop = false;
        %>
          <div class="ui-box group-info-box">
            <div class="ui-top-inner-box group-info-top-inner-box-typeA">
              <span>コンタクト情報</span>
              <% if( data.permission === true ){ %>
                <a class="ui-button group-info-button" href="#<% print( __dir__ + 'edit/contactInfo' ) %>">編集</a>
              <% } %>
            </div>
            <div class="ui-bottom-inner-box group-info-bottom-inner-box-typeA">
              <% if( co.mails && co.mails.length > 0 ){ %>
                <dl class="group-info-list <%
                  if( alreadyTop === false ){
                    print( 'group-info-list-no-border' );
                    alreadyTop = true;
                  }
                %>">
                  <dt>メールアドレス</dt>
                  <dd>
                    <%
                      for( var i = 0; co.mails[ i ]; i++ ){
                        var mail = co.mails[ i ];
                    %>
                      <div class="group-info-datum">
                        <span><%= mail %></span>
                      </div>
                    <% } %>
                  </dd>
                </dl>
              <% } %>


              <% if( co.websites && co.websites.length > 0 ){ %>
                <dl class="group-info-list <%
                  if( alreadyTop === false ){
                    print( 'group-info-list-no-border' );
                    alreadyTop = true;
                  }
                %>">
                  <dt>ウェブサイト</dt>
                  <dd>
                    <%
                      for( var i = 0; co.websites[ i ]; i++ ){
                        var website = co.websites[ i ];
                    %>
                      <div class="group-info-datum">
                        <span><a href="<%= website %>" target="_blank"><%= website %></a></span>
                      </div>
                    <% } %>
                  </dd>
                </dl>
              <% } %>

            </div>
          </div>
        <% } %>

      </div>
    </div>
  </div>
</script>
