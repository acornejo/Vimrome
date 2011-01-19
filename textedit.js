addCommand("edit_gostart", "Go to the start of the line",
        function (args) {
            var elem = document.activeElement;
            var caret_position = elem.selectionEnd;
            if (caret_position == 0)
                elem.setSelectionRange(0, elem.value.length); // select all text
            else
                elem.setSelectionRange(0, 0);
        });

addCommand("edit_goend", "Go to the end of the line",
        function (args) {
            var elem = document.activeElement;
            elem.setSelectionRange(elem.value.length, elem.value.length);
        });

addCommand("edit_forwardchar", "Move cursor forward",
        function (args) {
            var elem = document.activeElement;
            var caret_position = elem.selectionEnd;
            elem.setSelectionRange(caret_position + 1, caret_position + 1);
        });

addCommand("edit_backwardchar", "Move cursor backward",
        function (args) {
            var elem = document.activeElement;
            var caret_position = elem.selectionEnd;
            elem.setSelectionRange(caret_position - 1, caret_position - 1);
        });

addCommand("edit_deleteforward", "Delete from cursor to end of line",
        function (args) {
            var elem = document.activeElement;
            var caret_position = elem.selectionEnd;
            var org_str = elem.value;
            elem.value = org_str.substring(0, caret_position);
            elem.setSelectionRange(caret_position, caret_position);
        });

addCommand("edit_deletebackward", "Delete from cursor to beginning of line",
        function (args) {
            var elem = document.activeElement;
            var caret_position = elem.selectionEnd;
            var org_str = elem.value;
            elem.value = org_str.substring(caret_position, org_str.length);
            elem.setSelectionRange(0,0);
        });
