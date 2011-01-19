function followRelation(rel,pattern) {
    function followFrame(frame) {
        // search <a>s
        var elems = frame.document.getElementsByTagName("a");
        for (var i=0, ilen=elems.length; elem=elems[i], i<ilen; i++)
            if (elem.rel.toLowerCase() == rel ||
                    elem.rev.toLowerCase() == rel) {
                followLink(elem);
                return true;
            }

        elems = frame.document.body.querySelectorAll('a, input:not([type=hidden]), area, textarea, select, button, *[onclick]');
        for (var i=0, ilen=pattern.length; regex=RegExp(pattern[i],"i"), i<ilen; i++)
            for (var j=0, jlen=elems.length; elem=elem[j], j<jlen; j++)
                if (matchElem(regex,elem)) {
                    followLink(elem);
                    return true;
                }
        return false;
    }

    if (!followFrame(window)) {
        var i = 0;
        while (i < window.frames.length && followFrame(window.frames[i])) i++;
    }
}

function goNext()
{
   followRelation("next",
           ["\\bnext\\b","^>$","^(>>|\u00BB)$","^(>|\u00BB)","(>|\u00BB)$","\\bmore\\b"]);
}

function goPrevious()
{
    followRelation("prev",
            ["(\\bprev\\b|\\bprevious\\b)","^<$","^(<<|\u00AB)$","^(<|\u00AB)","(<|\u00AB)$"]);
}
