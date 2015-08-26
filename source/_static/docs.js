$(function() {
  var languages = {
    php: 'PHP',
    ruby: 'Ruby',
    java: 'Java',
    javascript: 'Javascript',
    bash: 'Curl',
    html: 'HTML',
    json: 'JSON'
  };

  var highlights = $('.highlight');

  var tabsSwitch = function(item, list, i) {
    item.click(function(event) {
      event.preventDefault();
      
      var tabs = $('li', list);
      tabs.removeClass('active');
      $(tabs[i]).addClass('active');

      var highlights = list.parent().siblings('div').find('div[class~="highlight"]');
      highlights.parent().hide();
      $(highlights[i]).parent().show();
    });
  }

  var length = 0;

  var tabs = null;
  var list = null;
  var j = 0;

  for (var i = 0, length = highlights.length; i < length; i++) {
    var element = $(highlights[i]).parent();

    var matches = [];
    var language = (matches = /highlight-(.+)/g.exec(element.attr('class'))) != null ? matches[1] : null;
    var item = $('<li><a href="">' + languages[language] + '</a></li>');

    if (element.prev().find(':first-child').attr('class') != 'highlight') {
      j = 0;
      tabs = $('<div class="codebox"><ul class="nav nav-tabs"></ul></div>');
      tabs.insertBefore(element);
      list = $('ul', tabs);
      item.addClass('active');
    } else {
      j += 1;
      element.hide();
    }

    tabsSwitch(item, list, j);

    list.append(item);
  }
});
