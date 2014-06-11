<script id="info-tmpl-dialog" type="text/template">
  <%
    /**
     *  Tags Info Template
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
        <span>タグの設定</span>
      </div>
    </div>

    <div class="ui-box group-info-box">
      <div class="ui-top-inner-box group-info-top-inner-box-typeB">
        <div class="group-info-box-body">
          <form action="#" class="group-info-form">

            <dl class="group-info-center-list group-info-list-no-border">
              <dt>タグ</dt>
              <dd data-input="info::dialog::tags"></dd>
            </dl>

            <dl class="group-info-center-list group-info-list-no-border">
              <dt>追加するタグ</dt>
              <dd class="group-info-add-list">
                <img src="style/images/add.png" alt="" data-button="info::dialog::add" />
                <textarea data-input="info::dialog::tagText"></textarea>
              </dd>
            </dl>

            <dl class="group-info-center-list group-info-list-no-border" style="display: none;" data-part="info::dialog::tagNotice">
              <dt></dt>
              <dd class="group-info-alert">入力に誤りがあります。</dd>
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

<script id="info-tmpl-tag" type="text/template">
  <div data-append="<%= tag.tagId %>" class="group-info-removable-datum">
    <img class="group-info-remover" src="style/images/remove.png" alt="Remover" onclick="$( this ).parent().remove();" />
    <span><%= tag.name %></span>
  </div>
</script>
