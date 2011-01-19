var zoom_levels = ['30%', '50%', '67%', '80%', '90%', '100%', '110%', '120%', '133%', '150%', '170%', '200%', '240%', '300%']
var default_zoom_index = zoom_levels.indexOf('100%');

function setZoomCountup(num) {
    zoom_level = document.body.style.zoom;
    if (zoom_level == undefined)
        zoom_index = default_zoom_index;
    else {
        zoom_index = zoom_levels.indexOf(zoom_level);
        if (zoom_index < 0)
            zoom_index = default_zoom_index;
    }
    setZoom(zoom_index+num);
}

function setZoom(zoom_index) {
    zoom_index = Math.max(0,Math.min(zoom_index,zoom_levels.length-1));
    document.body.style.zoom = zoom_levels[zoom_index];
}

addCommand("zoom", "Zoom in/out the current window",
        function (args) {setZoomCountup(args[0]);});

addCommand("zoom_reset", "Set default zoom level",
        function (args) {setZoom(default_zoom_index);});

function currentZoom() {
    var zoom_level = document.body.style.zoom;
    if (zoom_level == undefined || zoom_level == "")
        return 1;
    return ( parseInt(zoom_level) / 100 );
}
