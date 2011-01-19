addCommand('vscroll_line','Scroll window vertically by a line',
        function (args) { window.scrollBy(0,args[0]*20);});

addCommand('vscroll_page', 'Scroll window vertically by a page',
        function (args) { window.scrollBy(0,args[0]*window.innerHeight/2);});

addCommand('hscroll_char', 'Scroll window horizontally by a column',
        function (args) { window.scrollBy(args[0]*20,0);});

addCommand('scroll_bottom', 'Scroll window to bottom',
        function (args) { window.scroll(0,document.body.scrollHeight);});

addCommand('scroll_top', 'Scroll window to top',
        function (args) { window.scroll(0,0);});
