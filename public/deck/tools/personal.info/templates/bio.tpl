<script id="info-tmpl-dialog" type="text/template">
  <%
    /**
     *  Bio Info Template
     *
     *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
     *  @copyright  2012, Plus-place project
    */

    var getSelection = function( value ){
      if( data.privacy && data.privacy.bio == value )
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
        <span>自己紹介の設定</span>
      </div>
    </div>

    <div class="ui-box personal-info-box">
      <div class="ui-top-inner-box personal-info-top-inner-box-typeB">
        <div class="personal-info-box-body">
          <form action="#" class="personal-info-form">

            <dl class="personal-info-center-list personal-info-list-no-border">
              <dt>自己紹介</dt>
              <dd>
                <textarea data-input="info::dialog::bioText" cols="30" rows="5"><%
                  if( data.bio && data.bio.length > 0 )
                    print( data.bio.replace( /<br \/>/g, '\n' ) );
                  else
                    print( '' );
                %></textarea>
              </dd>
            </dl>

            <dl class="personal-info-center-list personal-info-list-no-border">
              <dt>プライバシー</dt>
              <dd>
                <select data-input="info::dialog::bioPrivacy">
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
