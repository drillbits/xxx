(function() {
  var
    $result = $('#resMsg'),
    $form = $('#calcForm');

  function init() {
    $result.html('二人の真ん中バースデーは…');
    addSelectOptions('yf', 1900, 2100, 4, 1982);
    addSelectOptions('mf', 1, 12, 2, 10);
    addSelectOptions('df', 1, 31, 2, 12);
    addSelectOptions('hf', 0, 23, 2, 0);
    addSelectOptions('if', 0, 59, 2, 0);
    addSelectOptions('yt', 1900, 2100, 4, 1983);
    addSelectOptions('mt', 1, 12, 2, 3);
    addSelectOptions('dt', 1, 31, 2, 7);
    addSelectOptions('ht', 0, 23, 2, 0);
    addSelectOptions('it', 0, 59, 2, 0);
  }

  function addSelectOptions(name, from, to, pad, def) {
    var
      $select = $form.find('select[name=' + name + ']');

    $.each(range(from, to + 1), function(i, v) {
      var
        $opt = $('<option>', {
          value: padding(v, pad)
        });
      if (v == def) {
        $opt.attr('selected', 'selected');
      }
      $opt.html(v);
      $select.append($opt);
    });
    return $select;
  }

  function range(start, stop) {
    var length, arr, i;

    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }

    length = Math.max(Math.ceil(stop - start), 0);
    arr = Array(length);
    for (i = 0; i < length; i++, start++) {
      arr[i] = start;
    }
    return arr;
  }

  function padding(s, pad) {
    var zeros = '';
    $.each(range(pad), function() {
      zeros += '0';
    });
    return (zeros + s).slice(-1 * pad)
  }

  function getFromDatetime() {
    var
      y = $form.find('select[name=yf]').val(),
      m = $form.find('select[name=mf]').val(),
      d = $form.find('select[name=df]').val(),
      h = $form.find('select[name=hf]').val(),
      i = $form.find('select[name=if]').val();

    return new Date(
        padding(y, 4) + '/' +
        padding(m, 2) + '/' +
        padding(d, 2) + ' ' +
        padding(h, 2) + ':' +
        padding(i, 2));
  }

  function getToDatetime() {
    var
      y = $form.find('select[name=yt]').val(),
      m = $form.find('select[name=mt]').val(),
      d = $form.find('select[name=dt]').val(),
      h = $form.find('select[name=ht]').val(),
      i = $form.find('select[name=it]').val();

    return new Date(
        padding(y, 4) + '/' +
        padding(m, 2) + '/' +
        padding(d, 2) + ' ' +
        padding(h, 2) + ':' +
        padding(i, 2));
  }

  function formatDatetime(d) {
    return padding(d.getFullYear(), 4) + ' 年 ' +
      padding((d.getMonth() + 1), 2) + ' 月 ' +
      padding(d.getDate(), 2) + ' 日 ' +
      padding(d.getHours(), 2) + ' 時 ' +
      padding(d.getMinutes(), 2) + ' 分';
  }

  $form.on('submit', function(e) {
    var from, to, d;
    e.preventDefault();
    from = getFromDatetime().getTime();
    to = getToDatetime().getTime();
    d = new Date(from + ((to - from) / 2));
    $result.empty();
    $result.html(
        '二人の真ん中バースデーは…<br />' +
        '<span id="result">' + formatDatetime(d) + '</span> です！');
  });
  init();
})();