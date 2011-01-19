addCommand('open', 'Open in current tab',
        function (args) {
            var urlstr=args[0];
            if (!/\/\/:/.test(urlstr))
                urlstr="http://"+urlstr;
            sendChrome("open_url", {url: urlstr});
        });

addCommand('tabopen', 'Open in new current tab',
        function (args) {
            var urlstr=args[0];
            if (!/\/\/:/.test(urlstr))
                urlstr="http://"+urlstr;
            sendChrome("new_tab", {url: urlstr});
        });

addCommand('tabreload','Reload current tab',
        function (args) { location.reload(); });

addCommand('tabclose', 'Close current tab',
        function (args) { sendChrome("close_tab"); });

addCommand('tabunclose', 'Reopen closed tab',
        function (args) { sendChrome("reopen_tab");});

addCommand('tabprev', 'Reopen closed tab',
        function (args) { sendChrome("previous_tab");});

addCommand('tabnext', 'Reopen closed tab',
        function (args) { sendChrome("next_tab");});
