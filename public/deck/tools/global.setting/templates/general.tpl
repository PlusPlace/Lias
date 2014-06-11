<script id="setting-tmpl-main" type="text/template">
  <div class="ui-container global-setting-container">

    <div class="ui-header">
      <div class="ui-header-image">
        <img src="tools/global.setting/style/images/icon.png" alt="" />
      </div>
      <div class="ui-header-text">
        <span>設定</span>
      </div>
    </div>

    <div class="ui-box global-setting-box">
      <div class="ui-top-inner-box global-setting-top-inner-box">
        <span class="ui-button global-setting-button" data-button="global-setting-edit-button">編集</span>
        <span class="ui-button global-setting-back-button" data-button="global-setting-complete-button">完了</span>
        <div class="global-setting-editor">
          <form action="#">
            <dl>
              <dt>名前</dt>
              <dd>
                <textarea data-input="global-setting-position-text"></textarea>
              </dd>
            </dl>
          </form>
        </div>
      </div>
      <div class="ui-bottom-inner-box global-setting-bottom-inner-box">
        <span>名前: </span><span>Administrator</span>
      </div>
    </div>

  </div>
</script>
