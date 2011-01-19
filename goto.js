function followRelation(rel,pattern) {
    function followFrame(frame) {
        var elems = frame.document.getElementsByTagName("a");
        for (var i=0, ilen=elems.length; elem=elems[i], i<ilen; i++)
            if (elem.rel.toLowerCase() == rel ||
                    elem.rev.toLowerCase() == rel) {
                followLink(elem,false);
                return true;
            }

        elems = frame.document.body.querySelectorAll('a, input:not([type=hidden]), area, textarea, select, button, *[onclick]');
        for (var i=0, ilen=pattern.length; regex=RegExp(pattern[i],"i"), i<ilen; i++)
            for (var j=0, jlen=elems.length; elem=elems[j], j<jlen; j++)
                if (matchElem(regex,elem)) {
                    followLink(elem,false);
                    return true;
                }
        return false;
    }

    if (!followFrame(window)) {
        var i = 0;
        while (i < window.frames.length && followFrame(window.frames[i])) i++;
    }
}

function focusFirstTextInput() {
    var elem=document.querySelector('input[type="text"],input:not([type])');
    if (elem) {
        elem.focus();
        elem.setSelectionRange(0, elem.value.length);
    }
}

function gourlup() {
    var loc = location;
    var list = location.href.match(/(\w+:\/\/.+?\/)([\w\?\=\+\%\&\-\.]+\/?)$/);
    if (list && list[1] && list[1] != loc)
        location = list[1];
}

addCommand("gourlup", "Go to the parent url",
        function (args) { gourlup(); });

addCommand("go_cancel", "Blur out focus",
        function (args) { document.activeElement.blur();});

addCommand("go_input", "Focus the first input field",
        function (args) { focusFirstTextInput();});

addCommand("go_next", "Follow the link labelled next",
        function (args) {
            followRelation("next",
           ["\\bnext\\b","^>$","^(>>|\u00BB)$","^(>|\u00BB)","(>|\u00BB)$","\\bmore\\b"]);})

addCommand("go_previous", "Follow the link labelled previous",
        function (args) {
            followRelation("prev",
            ["(\\bprev\\b|\\bprevious\\b)","^<$","^(<<|\u00AB)$","^(<|\u00AB)","(<|\u00AB)$"]);});
