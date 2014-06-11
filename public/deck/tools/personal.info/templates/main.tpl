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

  <div class="ui-container personal-info-container">

    <div class="ui-header">
      <div class="ui-header-image">
        <img src="<%
          if( data.profileImage && data.profileImage.length > 0 )
            print( data.profileImage );
          else
            print( personalDefaultProfileImage );
        %>" alt="Profile Image" />
      </div>
      <div class="ui-header-text">
        <span><%= data.name %></span>
      </div>
    </div>


    <div class="ui-body">
      <div class="personal-info-left-section <%
      %>">

        <% if( data.permission === true || ( data.bio && data.bio.length > 0 ) ){ %>
          <div class="ui-box personal-info-box">
            <div class="ui-top-inner-box personal-info-top-inner-box-typeA">
              <span>自己紹介</span>
              <% if( data.permission === true ){ %>
                <a class="ui-button personal-info-button" href="#<% print( __dir__ + 'edit/bio' ) %>">編集</a>
              <% } %>
            </div>
            <div class="ui-bottom-inner-box personal-info-bottom-inner-box-typeA">
              <div class="personal-info-box-header">
              </div>
              <div class="personal-info-text-info"><%= data.bio %></div>
            </div>
          </div>
        <% } %>


        <% if( data.permission === true || ( data.groups && data.groups.length > 0 ) ){ %>
          <div class="ui-box personal-info-box">
            <div class="ui-top-inner-box personal-info-top-inner-box-typeA">
              <span>フォローしているグループ</span>
              <% if( data.permission === true ){ %>
                <a class="ui-button personal-info-button" href="#<% print( __dir__ + 'edit/groups' ) %>">編集</a>
              <% } %>
            </div>
            <div class="ui-bottom-inner-box personal-info-bottom-inner-box-typeA">
              <div class="personal-info-cnt-info">
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
        <div class="ui-box personal-info-box">
          <div class="ui-top-inner-box personal-info-top-inner-box-typeA">
            <span>タグ</span>
            <% if( data.permission === true ){ %>
              <a class="ui-button personal-info-button" href="#<% print( __dir__ + 'edit/tags' ) %>">編集</a>
            <% } %>
          </div>
          <div class="ui-bottom-inner-box personal-info-bottom-inner-box-typeA">
            <div class="personal-info-tag-info">
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


      <div class="personal-info-right-section">
        <%
          if( data.permission === true || data.basicInfo ){
            var bi = data.basicInfo;
            var alreadyTop = false;
        %>
        <div class="ui-box personal-info-box">
          <div class="ui-top-inner-box personal-info-top-inner-box-typeA">
            <span>基本情報</span>
            <% if( data.permission === true ){ %>
              <a class="ui-button personal-info-button" href="#<% print( __dir__ + 'edit/basicInfo' ) %>">編集</a>
            <% } %>
          </div>
          <div class="ui-bottom-inner-box personal-info-bottom-inner-box-typeA">

            <% if( bi.birthday && bi.birthday.length > 0 ){ %>
              <dl class="personal-info-list <%
                if( alreadyTop === false ){
                  print( 'personal-info-list-no-border' );
                  alreadyTop = true;
                }
              %>">
                <dt>誕生日</dt>
                <dd><% print( bi.birthday.join( '/' ) ) %></dd>
              </dl>
            <% } %>


            <% if( bi.gender && bi.gender.length > 0 ){ %>
              <dl class="personal-info-list <%
                if( alreadyTop === false ){
                  print( 'personal-info-list-no-border' );
                  alreadyTop = true;
                }
              %>">
                <dt>性別</dt>
                <dd><%= bi.gender %></dd>
              </dl>
            <% } %>


            <% if( bi.belongGroups ){ %>
              <dl class="personal-info-list <%
                if( alreadyTop === false ){
                  print( 'personal-info-list-no-border' );
                  alreadyTop = true;
                }
              %>">
                <dt>グループ</dt>
                <dd>
                  <%
                    for( var i = 0; bi.belongGroups[ i ]; i++ ){
                      var group = bi.belongGroups[ i ];
                  %>
                    <div class="personal-info-data <% if( i === 0 ) print( 'personal-info-list-no-border' ); %>">
                      <a href="#g<%= group.groupId %>"><span><%= group.name %></span></a>
                      <a href="#g<%= group.groupId %>"><img src="<%
                        if( group.icon && group.icon.length > 0 )
                          print( group.icon );
                        else
                          print( groupDefaultProfileImage );
                      %>" alt="" /></a>
                    </div>
                  <% } %>
                </dd>
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
        <div class="ui-box personal-info-box">
          <div class="ui-top-inner-box personal-info-top-inner-box-typeA">
            <span>コンタクト情報</span>
            <% if( data.permission === true ){ %>
              <a class="ui-button personal-info-button" href="#<% print( __dir__ + 'edit/contactInfo' ); %>">編集</a>
            <% } %>
          </div>
          <div class="ui-bottom-inner-box personal-info-bottom-inner-box-typeA">

            <% if( co.mails && co.mails.length > 0 ){ %>
              <dl class="personal-info-list <%
                if( alreadyTop === false ){
                  print( 'personal-info-list-no-border' );
                  alreadyTop = true;
                }
              %>">
                <dt>メールアドレス</dt>
                <dd>
                  <%
                    for( var i = 0; co.mails[ i ]; i++ ){
                      var mail = co.mails[ i ];
                  %>
                    <div class="personal-info-datum">
                      <span><%= mail %></span>
                    </div>
                  <% } %>
                </dd>
              </dl>
            <% } %>


            <% if( co.websites && co.websites.length > 0 ){ %>
              <dl class="personal-info-list <%
                if( alreadyTop === false ){
                  print( 'personal-info-list-no-border' );
                  alreadyTop = true;
                }
              %>">
                <dt>ウェブサイト</dt>
                <dd>
                  <%
                    for( var i = 0; co.websites[ i ]; i++ ){
                      var website = co.websites[ i ];
                  %>
                    <div class="personal-info-datum">
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
