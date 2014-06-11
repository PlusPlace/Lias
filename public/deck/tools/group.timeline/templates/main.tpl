<script id="timeline-tmpl-main" type="text/template">
  <%
    /**
     *  Main Timeline Template
     *
     *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
     *  @copyright  2012, Plus-place project
    */
  %>

  <div class="ui-container group-tl-container">

    <div class="ui-header">
      <div class="ui-header-image">
        <img src="tools/group.timeline/style/images/icon.png" alt="" />
      </div>
      <div class="ui-header-text">
        <span>タイムライン</span>
      </div>
    </div>

    <% if( data.permission === true ){ %>
      <div class="ui-box group-tl-box">
        <div class="ui-inner-box group-tl-inner-box-form">
          <form action="#">
            <textarea data-input="group-tl-textarea"></textarea>
            <span class="ui-button group-tl-send-button" data-button="group-tl-update-button">アップデート</span>
          </form>
        </div>
      </div>
    <% } %>

    <div id="group-tl-follow"><div></div></div>

    <div class="ui-box group-tl-box-notice" id="group-tl-notice">
      <div class="ui-inner-box group-tl-inner-box-notice">
        <span>これ以上のタイムライン記事はありません。</span>
      </div>
    </div>

  </div>
</script>

<script id="timeline-tmpl-follow" type="text/template">
  <div class="ui-box group-tl-box">

    <div class="ui-top-inner-box group-tl-top-inner-box">
      <img class="group-tl-icon" src="<%= creator.icon %>" alt="" />

      <div class="group-tl-contents">
        <div class="group-tl-name">
          <a href="#g<%= creator.groupId %>"><%= creator.name %></a>
        </div>

        <div class="group-tl-article">
          <%= article %>
        </div>

        <div class="group-tl-status">
          <span><%= createdAt[ 0 ] %>-<%= createdAt[ 1 ] %>-<%= createdAt[ 2 ] %> <%= createdAt[ 3 ] %>:<%= createdAt[ 4 ] %></span>
        </div>
      </div>

    </div>

    <div class="ui-bottom-inner-box group-tl-bottom-inner-box">

      <div class="group-tl-evaluation">
        <span class="ui-button group-tl-like-button" data-button="like-button">
          <span data-input="like-number" data-append="<%= articleId %>"><%= likes %></span> いいね！
        </span>
      </div>

      <div data-input="article-comments"></div>

      <form action="#">
        <div class="group-tl-make-comment">
          <textarea data-input="comment-area"></textarea>
          <span class="ui-button group-tl-comment-button" data-button="comment-button">コメントする</span>
        </div>
      </form>

    </div>
  </div>
</script>

<script id="timeline-tmpl-comment" type="text/template">
  <div class="group-tl-commentator">
    <img class="group-tl-commentator-icon" src="<%= commentatorIcon %>" alt="" />
    <div class="group-tl-commentator-contents">
      <div class="group-tl-commentator-name">
        <a href="#<%= commentatorId %>"><%= commentatorName %></a>
      </div>
      <div class="group-tl-commentator-comment">
        <%= comment %>
      </div>
    </div>
  </div>
</script>
