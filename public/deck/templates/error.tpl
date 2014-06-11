<script id="error-tmpl-main" type="text/template">
  <%
    /**
     *  Main Error Template
     *
     *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
     *  @copyright  2012, Plus-place project
    */
  %>

  <div class="ui-container message-container">
    <div class="ui-header ui-header-radius">
      <div class="ui-header-image ui-header-radius">
        <img src="style/images/error.png" alt="Error Image" />
      </div>
      <div class="ui-header-text">
        <span>エラー</span>
      </div>
    </div>

    <div class="ui-box message-box">
      <div class="ui-inner-box message-inner-box">
        <h5>Error-Code: <%= code %></h5> 
        <span><%= message %></span>
      </div>
    </div>
  </div>
</script>
