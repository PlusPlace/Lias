<script id="timeline-tmpl-main" type="text/template">
  <%
    /**
     *  Main Timeline Template
     *
     *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
     *  @copyright  2012, Plus-place project
    */
  %>

  <div class="ui-container personal-tl-container">

    <div class="ui-header ui-header-radius">
      <div class="ui-header-image ui-header-radius">
        <img src="tools/personal.timeline/style/images/icon.png" alt="" />
      </div>
      <div class="ui-header-text">
        <span>タイムライン</span>
      </div>
    </div>

    <div id="personal-tl-follow"><div></div></div>

    <div class="ui-box personal-tl-box-notice" id="personal-tl-notice">
      <div class="ui-inner-box personal-tl-inner-box-notice">
        <span>これ以上のタイムライン記事はありません。</span>
      </div>
    </div>

  </div>
</script>

<script id="timeline-tmpl-follow" type="text/template">
  <div class="ui-box personal-tl-box">

    <div class="ui-top-inner-box personal-tl-top-inner-box">
      <img class="personal-tl-icon" src="<%= creator.icon %>" alt="" />

      <div class="personal-tl-contents">
        <div class="personal-tl-name">
          <a href="#g<%= creator.groupId %>"><%= creator.name %></a>
        </div>

        <div class="personal-tl-article">
          <%= article %>
        </div>

        <div class="personal-tl-status">
          <span><%= createdAt[ 0 ] %>-<%= createdAt[ 1 ] %>-<%= createdAt[ 2 ] %> <%= createdAt[ 3 ] %>:<%= createdAt[ 4 ] %></span>
        </div>
      </div>

    </div>

    <div class="ui-bottom-inner-box personal-tl-bottom-inner-box">

      <div class="personal-tl-evaluation">
        <span class="ui-button personal-tl-like-button" data-button="like-button">
          <span data-input="like-number" data-append="<%= articleId %>"><%= likes %></span> いいね！
        </span>
      </div>

      <div data-input="article-comments"></div>

      <form action="#">
        <div class="personal-tl-make-comment">
          <textarea data-input="comment-area"></textarea>
          <span class="ui-button personal-tl-comment-button" data-button="comment-button">コメントする</span>
        </div>
      </form>

    </div>
  </div>
</script>

<script id="timeline-tmpl-comment" type="text/template">
  <div class="personal-tl-commentator">
    <img class="personal-tl-commentator-icon" src="<%= commentatorIcon %>" alt="" />
    <div class="personal-tl-commentator-contents">
      <div class="personal-tl-commentator-name">
        <a href="#<%= commentatorId %>"><%= commentatorName %></a>
      </div>
      <div class="personal-tl-commentator-comment">
        <%= comment %>
      </div>
    </div>
  </div>
</script>
