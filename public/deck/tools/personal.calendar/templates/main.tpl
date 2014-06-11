<script id="calendar-tmpl-main" type="text/template">
  <%
    /**
     *  Calendar Main Template
     *
     *  @author     Saneyuki Tadokoro <post@saneyuki.gfunction.com>
     *  @copyright  2012, +place
    */
  %>

  <div class="ui-container personal-calendar-container">

    <div class="ui-header personal-calendar-header">
      <div class="ui-header-image">
        <img src="tools/personal.calendar/style/images/icon.png" alt="" />
      </div>
      <div class="ui-header-text">
        <span>カレンダー</span>
      </div>
    </div>

    <div class="ui-body personal-calendar-box">
      <div class="ui-inner-box personal-calendar-inner-box" id="personal-calendar-input">
      </div>
    </div>

  </div>
</script>

<script id="calendar-tmpl-table" type="text/template">
  <%
    var weekdayStrArray = [ '日', '月', '火', '水', '木', '金', '土' ];
    var today_date = new Date();
    var today_day = today_date.getDate();
    var today_month = today_date.getMonth() + 1;
    var today_year = today_date.getYear();
    if( today_year < 2000 ) today_year += 1900;
  %>

  <div class="personal-calendar-table">

    <div class="ui-box personal-calendar-box-date">
      <div class="ui-top-inner-box personal-calendar-inner-box-date">
        <span class="ui-button personal-calendar-next-button" data-button="personal-calendar-next">来月</span>
        <span class="ui-button personal-calendar-previous-button" data-button="personal-calendar-previous">先月</span>
        <span><%= date[ 0 ] %>年<%= date[ 1 ] %>月</span>
      </div>
    </div>

    <table class="personal-calendar-table-body" cellspacing="0" cellpadding="0">
      <tr>
        <%
          for( var i = 0; weekdayStrArray[ i ] && i < 7; i++ ){
            var weekdayStr = weekdayStrArray[ i ];
        %>
          <th>
            <div class="ui-box personal-calendar-box-weekday">
              <div class="ui-bottom-inner-box personal-calendar-inner-box-weekday">
                <%= weekdayStr %>
              </div>
            </div>
          </th>
        <% } %>
      </tr>

      <%
        var len = array.length;
        for( var i = 0; i < len; i++ ){
          var week = array[ i ];
      %>
        <tr>
          <%
            var weekLen = week.length;
            for( var j = 0; j < weekLen; j++ ){
              var day = week[ j ];
          %>
          <% if( !day ){ %>
            <td>
              <div class="ui-box personal-calendar-box-day">
                <div class="ui-inner-box personal-calendar-inner-box-day personal-calendar-inner-box-disabled"></div>
              </div>
            </td>
          <%
            }
            else{
          %>
            <td>
              <div class="ui-box personal-calendar-box-day">
                <div class="ui-top-inner-box personal-calendar-top-inner-box-day <%
                  if( date[ 0 ] == today_year && date[ 1 ] == today_month && day == today_day )
                    print( 'personal-calendar-top-inner-box-today' );
                  else if( j === 0 )
                    print( 'personal-calendar-top-inner-box-sun' );
                  else if( j === 6 )
                    print( 'personal-calendar-top-inner-box-sat' );
                %>">
                  <span><%= day %></span>
                </div>
                <div class="ui-bottom-inner-box personal-calendar-bottom-inner-box-day">
                  <dl class="personal-calendar-day-events">
                    <dd><a href="#events/info">第一回+placeカンファレンス</a></dd>
                    <dd><a href="#events/info">プログラミング初心者のための勉強会</a></dd>
                  </dl>
                  <a class="ui-button personal-calendar-event-button"  href="#events/info">他3件</a>
                </div>
              </div>
            </td>
            <% } %>
          <% } %>
        </tr>
      <% } %>
    </table>

  </div>
</script>
