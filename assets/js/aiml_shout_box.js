jQuery(document).ready(function($){

    //method to trigger when user hits enter key
    $("#shout_message").keypress(function(evt) {
        if(evt.which == 13) {
                var iusername = "You"; //$('#shout_username').val();
                var imessage = $('#shout_message').val();
                var icustid = $('#shout_custid').val();
                var post_url = $('#post_url').text();

                if (imessage != "") {
                    today = new Date();
                    var dateString = today.format("HH:MM TT mmm dd");

                    var output_msg = '<div class="shout_msg"><time>'+dateString+'</time><span class="username">'+iusername+'</span><span class="message">'+imessage+'</span></div>';
                    $(output_msg).hide().appendTo('.message_box').fadeIn();

                    post_data = {'username':iusername, 'message':imessage, 'custid':icustid};

                    //send data to "shout.php" using jQuery $.post()
                    $.post(post_url, post_data, function(data) {

                        bot_response_date = new Date();
                        bot_response_date_string = bot_response_date.format("HH:MM TT mmm dd");


                        var bot_response_data = $.parseJSON(data);
                        var bot_response = "unknown";
                        if (bot_response_data != undefined && bot_response_data.that != "") 
                        {
                           bot_response = '<div class="shout_msg"><time>' + bot_response_date_string + '</time><span class="username">Ciara</span><span class="message">' + bot_response_data.that + '</span></div>';

                           // recall the customer id by storing it in the div
                           $('#shout_custid').val(bot_response_data["@attributes"].custid);
                        };
                        
                        //append data into messagebox with jQuery fade effect!
                        $(bot_response).hide().appendTo('.message_box').fadeIn();

                        //keep scrolled to bottom of chat!
                        var scrolltoh = $('.message_box')[0].scrollHeight;
                        $('.message_box').scrollTop(scrolltoh);
                        
                        //reset value of message box
                        $('#shout_message').val('');
                        
                    }).fail(function(err) {                
                        //alert HTTP server error
                        alert(err.statusText); 
                    });
                }
                else
                {
                    //console.log("Empty message");
                }
            }
    });

    //toggle hide/show shout box
    $(".close_btn, .header").click(function (e) {
        //get CSS display state of .toggle_chat element
        var toggleState = $('.toggle_chat').css('display');

        //toggle show/hide chat box
        $('.toggle_chat').slideToggle();
        
        //use toggleState var to change close/open icon image
        if(toggleState == 'block')
        {
            $(".header div").attr('class', 'open_btn');
        }else{
            $(".header div").attr('class', 'close_btn');
        }
    });

    var dateFormat = function () {
        var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            timezoneClip = /[^-+\dA-Z]/g,
            pad = function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len) val = "0" + val;
                return val;
            };

        // Regexes and supporting functions are cached through closure
        return function (date, mask, utc) {
            var dF = dateFormat;

            // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
            if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                mask = date;
                date = undefined;
            }

            // Passing date through Date applies Date.parse, if necessary
            date = date ? new Date(date) : new Date;
            if (isNaN(date)) throw SyntaxError("invalid date");

            mask = String(dF.masks[mask] || mask || dF.masks["default"]);

            // Allow setting the utc argument via the mask
            if (mask.slice(0, 4) == "UTC:") {
                mask = mask.slice(4);
                utc = true;
            }

            var _ = utc ? "getUTC" : "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                m = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                M = date[_ + "Minutes"](),
                s = date[_ + "Seconds"](),
                L = date[_ + "Milliseconds"](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d:    d,
                    dd:   pad(d),
                    ddd:  dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    m:    m + 1,
                    mm:   pad(m + 1),
                    mmm:  dF.i18n.monthNames[m],
                    mmmm: dF.i18n.monthNames[m + 12],
                    yy:   String(y).slice(2),
                    yyyy: y,
                    h:    H % 12 || 12,
                    hh:   pad(H % 12 || 12),
                    H:    H,
                    HH:   pad(H),
                    M:    M,
                    MM:   pad(M),
                    s:    s,
                    ss:   pad(s),
                    l:    pad(L, 3),
                    L:    pad(L > 99 ? Math.round(L / 10) : L),
                    t:    H < 12 ? "a"  : "p",
                    tt:   H < 12 ? "am" : "pm",
                    T:    H < 12 ? "A"  : "P",
                    TT:   H < 12 ? "AM" : "PM",
                    Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };

            return mask.replace(token, function ($0) {
                return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
            });
        };
    }();

    // Some common format strings
    dateFormat.masks = {
        "default":      "ddd mmm dd yyyy HH:MM:ss",
        shortDate:      "m/d/yy",
        mediumDate:     "mmm d, yyyy",
        longDate:       "mmmm d, yyyy",
        fullDate:       "dddd, mmmm d, yyyy",
        shortTime:      "h:MM TT",
        mediumTime:     "h:MM:ss TT",
        longTime:       "h:MM:ss TT Z",
        isoDate:        "yyyy-mm-dd",
        isoTime:        "HH:MM:ss",
        isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };

    // Internationalization strings
    dateFormat.i18n = {
        dayNames: [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        monthNames: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ]
    };

    // For convenience...
    Date.prototype.format = function (mask, utc) {
        return dateFormat(this, mask, utc);
    };

});
