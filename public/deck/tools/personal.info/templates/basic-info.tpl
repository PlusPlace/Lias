<script id="info-tmpl-dialog" type="text/template">
  <%
    /**
     *  Basic Info Template
     *
     *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
     *  @copyright  2012, Plus-place project
    */

    var bi = data.basicInfo
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

    /**
     *  @param  string type
     *  @param  string value
     *  @return 'selected="true"' or ''
    */
    var getSelectedBirthday = function( type, value ){
      var ptr;
      switch( type ){
        case 'year':
          ptr = 0; break;
        case 'month':
          ptr = 1; break;
        case 'day':
          ptr = 2; break;
      }
      if( bi.birthday[ ptr ] == value )
        return 'selected="true"';
      else
        return '';
    };

    /**
     *  @param  string value
     *  @return 'selected="true"' or ''
    */
    var getSelectedGender = function( value ){
      if( bi.genderVal == value )
        return 'selected="true"';
      else
        return '';
    };

    /**
     *  @return [ 1901...(current year) ]
    */
    var getYearSelection = function(){
      var y = ( new Date() ).getYear();
      y = Number( y < 2000 ? y + 1900 : y );
      var ret = [];
      for( var i = 1901; i <= y; i++ )
        ret[ i - 1901 ] = i + '';
      return ret;
    };

    /**
     *  @return [ 1...12) ]
    */
    var getMonthSelection = function(){
      var ret = [];
      for( var i = 1; i <= 12; i++ )
        ret[ i - 1 ] = i + '';
      return ret;
    };

    /**
     *  @return [ 1...31 ]
    */
    var getDaySelection = function(){
      var ret = [];
      for( var i = 1; i <= 31; i++ )
        ret[ i - 1 ] = i + '';
      return ret;
    };
  %>

  <div class="ui-container personal-info-dialog-container">

    <div class="ui-header">
      <div class="ui-header-image">
        <img src="tools/personal.info/style/images/icon.png" alt="Tool Image" />
      </div>
      <div class="ui-header-text">
        <span>基本情報の設定</span>
      </div>
    </div>

    <div class="ui-box personal-info-box">
      <div class="ui-top-inner-box personal-info-top-inner-box-typeB">
        <div class="personal-info-box-body">
          <form action="#" class="personal-info-form">

            <dl class="personal-info-center-list personal-info-list-no-border">
              <dt>誕生日</dt>
              <dd>

                <select data-input="info::dialog::birthdayYear">
                  <%
                    var yearArray = getYearSelection();
                    for( var i = 0; yearArray[ i ]; i++ ){
                      var year = yearArray[ i ];
                  %>
                    <option value="<%= year %>" <% print( getSelectedBirthday( 'year', year ) ); %>><%= year %></option>
                  <% } %>
                </select>

                <select data-input="info::dialog::birthdayMonth">
                  <%
                    var monthArray = getMonthSelection();
                    for( var i = 0; monthArray[ i ]; i++ ){
                      var month = monthArray[ i ];
                  %>
                    <option value="<%= month %>" <% print( getSelectedBirthday( 'month', month ) ); %>><%= month %></option>
                  <% } %>
                </select>

                <select data-input="info::dialog::birthdayDay">
                  <%
                    var dayArray = getDaySelection();
                    for( var i = 0; dayArray[ i ]; i++ ){
                      var day = dayArray[ i ];
                  %>
                    <option value="<%= day %>" <% print( getSelectedBirthday( 'day', day ) ); %>><%= day %></option>
                  <% } %>
                </select>

              </dd>
            </dl>

            <dl class="personal-info-center-list personal-info-list-no-border">
              <dt></dt>
              <dd>
                <select data-input="info::dialog::birthdayPrivacy">
                  <option value="private" <% print( getSelectedPrivacy( 'birthday', 'private' ) ); %>>非公開</option>
                  <option value="limited" <% print( getSelectedPrivacy( 'birthday', 'limited' ) ); %>>グループメンバーのみ公開</option>
                  <option value="public"  <% print( getSelectedPrivacy( 'birthday', 'public' ) ); %>>公開</option>
                </select>
              </dd>
            </dl>

            <dl class="personal-info-center-list">
              <dt>性別</dt>
              <dd>
                <select data-input="info::dialog::gender">
                  <option value="male"   <% print( getSelectedGender( 'male' ) ); %>>男</option>
                  <option value="female" <% print( getSelectedGender( 'female' ) ); %>>女</option>
                </select>
              </dd>
            </dl>

            <dl class="personal-info-center-list personal-info-list-no-border">
              <dt></dt>
              <dd>
                <select data-input="info::dialog::genderPrivacy">
                  <option value="private" <% print( getSelectedPrivacy( 'gender', 'private' ) ); %>>非公開</option>
                  <option value="limited" <% print( getSelectedPrivacy( 'gender', 'limited' ) ); %>>グループメンバーのみ公開</option>
                  <option value="public"  <% print( getSelectedPrivacy( 'gender', 'public' ) ); %>>公開</option>
                </select>
              </dd>
            </dl>

            <dl class="personal-info-center-list">
              <dt>グループ</dt>
              <dd>
                <select data-input="info::dialog::belongGroupsPrivacy">
                  <option value="private" <% print( getSelectedPrivacy( 'belongGroups', 'private' ) ); %>>非公開</option>
                  <option value="limited" <% print( getSelectedPrivacy( 'belongGroups', 'limited' ) ); %>>グループメンバーのみ公開</option>
                  <option value="public"  <% print( getSelectedPrivacy( 'belongGroups', 'public' ) ); %>>公開</option>
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
