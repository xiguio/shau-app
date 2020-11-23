function dateFormat(timestamp, format) {
  if (!format) {
    format = 'yyyy-MM-dd hh:mm:ss';
  }
  timestamp = parseInt(timestamp);
  if ((timestamp + '').length === 10) {
	  timestamp *= 1000;
  }
  var realDate = new Date(timestamp);
  function timeFormat(num) {
    return num < 10 ? '0' + num : num;
  }
  var date = [
    ['M+', timeFormat(realDate.getMonth() + 1)],
    ['d+', timeFormat(realDate.getDate())],
    ['h+', timeFormat(realDate.getHours())],
    ['m+', timeFormat(realDate.getMinutes())],
    ['s+', timeFormat(realDate.getSeconds())],
    ['q+', Math.floor((realDate.getMonth() + 3) / 3)],
    ['S+', realDate.getMilliseconds()],
  ];
  var regYear = new RegExp('(y+)', 'i');
  var reg1 = regYear.exec(format);
  if (reg1) {
    format = format.replace(
      reg1[1],
      (realDate.getFullYear() + '').substring(4 - reg1[1].length),
    );
  }
  for (var i = 0; i < date.length; i++) {
    var k = date[i][0];
    var v = date[i][1];

    var reg2 = new RegExp('(' + k + ')').exec(format);
    if (reg2) {
      format = format.replace(
        reg2[1],
        reg2[1].length == 1 ? v : ('00' + v).substring(('' + v).length),
      );
    }
  }
  return format;
}

function friendlyDate(timestamp) {
	if ((timestamp + '').length === 10) {
		timestamp *= 1000;
	}
	var formats = {
		'year': '%n% 年前',
		'month': '%n% 月前',
		'day': '%n% 天前',
		'hour': '%n% 小时前',
		'minute': '%n% 分钟前',
		'second': '%n% 秒前',
	};

	var now = Date.now();
	var seconds = Math.floor((now - timestamp) / 1000);
	var minutes = Math.floor(seconds / 60);
	var hours = Math.floor(minutes / 60);
	var days = Math.floor(hours / 24);
	var months = Math.floor(days / 30);
	var years = Math.floor(months / 12);

	var diffType = '';
	var diffValue = 0;
	if (years > 0) {
		diffType = 'year';
		diffValue = years;
	} else {
		if (months > 0) {
			diffType = 'month';
			diffValue = months;
		} else {
			if (days > 0) {
				diffType = 'day';
				diffValue = days;
			} else {
				if (hours > 0) {
					diffType = 'hour';
					diffValue = hours;
				} else {
					if (minutes > 0) {
						diffType = 'minute';
						diffValue = minutes;
					} else {
						diffType = 'second';
						diffValue = seconds === 0 ? (seconds = 1) : seconds;
					}
				}
			}
		}
	}
	return formats[diffType].replace('%n%', diffValue);
}

function wechatMPLogin() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          resolve(res.code);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}
export {
	friendlyDate,
	dateFormat,
	wechatMPLogin
}
