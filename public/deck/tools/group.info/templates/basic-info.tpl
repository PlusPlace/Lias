<script id="info-tmpl-dialog" type="text/template">
  <%
    /**
     *  Basic Info Template
     *
     *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
     *  @copyright  2012, Plus-place project
    */

    var bi = data.basicInfo;
  %>

  <div class="ui-container group-info-dialog-container">

    <div class="ui-header">
      <div class="ui-header-image">
        <img src="tools/group.info/style/images/icon.png" alt="Tool Image" />
      </div>
      <div class="ui-header-text">
        <span>基本情報の設定</span>
      </div>
    </div>

    <div class="ui-box group-info-box">
      <div class="ui-top-inner-box group-info-top-inner-box-typeB">
        <div class="group-info-box-body">
          <form action="#" class="group-info-form">

            <% if( bi.founded ){ %>
              <dl class="group-info-list group-info-list-center group-info-list-no-border">
                <dt>設立年月日</dt>
                <dd>
                  <textarea data-input="info::dialog::founded" cols="30" rows="1"><%= bi.founded %></textarea>
                </dd>
              </dl>
            <% } %>
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
