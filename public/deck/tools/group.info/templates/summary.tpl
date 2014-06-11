<script id="info-tmpl-dialog" type="text/template">
  <%
    /**
     *  Summary Info Template
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
          <span>概要の設定</span>
        </div>
      </div>

      <div class="ui-box group-info-box">
        <div class="ui-top-inner-box group-info-top-inner-box-typeB">
          <div class="group-info-box-body">
            <form action="#" class="group-info-form">
              <dl class="group-info-center-list group-info-list-no-border">
                <dt>概要</dt>
                <dd>
                  <textarea data-input="info::dialog::summaryText" cols="30" rows="5"><% print( data.summary.replace( /<br \/>/g, '\n' ) ); %></textarea>
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

