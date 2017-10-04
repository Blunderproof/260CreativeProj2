$(function() {
    var map = kartograph.map('#map');

    var resize = function() {
            var c = $('#map');
            var ratio = map.viewAB.width / map.viewAB.height;
            c.height( c.width() / ratio );
            map.resize();
        };
        $(window).resize(resize);
        
    map.loadMap('http://kartograph.org/showcase/usa-projection/usa.svg', function() {
        map.addLayer('layer0', {
            styles: {
                stroke: '#aaa',
                fill: '#f6f4f2'
            },
            mouseenter: function(d, path) {
                path.attr('fill', '#c04');
            },
            mouseleave: function(d, path) {
                path.animate({ fill: '#f6f4f2' }, 200);
            }
        });



        map.getLayer('layer0')
          .on('click', function(data, path, event) {
        console.log(data);
        var stateName = JSON.stringify(data.label).replace(/['"]+/g, '');
        $("#clicked-state").text("You have clicked on: " + stateName);

        switch(stateName) {
          case "New York":
              console.log("Found york");
              stateName += " (state)";
              break;
          case "Washington":
              console.log("Found the wash");
              stateName += " (state)";
              break;
          case "Georgia":
              stateName += " (U.S. state)";
              break;

            }
        $.ajax({
          type: "GET",
       url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + stateName + "&callback=?",
       contentType: "application/json; charset=utf-8",
       async: false,
       dataType: "json",
       success: function (data, textStatus, jqXHR) {

           var markup = data.parse.text["*"];
           var blurb = $('<div></div>').html(markup);

           // remove links as they will not work
           blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });

           // remove any references
           blurb.find('sup').remove();

           // remove cite error
           blurb.find('.mw-ext-cite-error').remove();

           $('#article').html($(blurb).find('p'));
           $( ".nowrap" ).remove();

       },
       error: function (errorMessage) {
       }

        });


        path.attr('fill', 'red');
        });
        var points_of_interest = [

        ];
        map.addSymbols({
            type: kartograph.LabeledBubble,
            data: points_of_interest,
            location: function(d) { return [d.lon, d.lat] },
            title: function(d) { return d.name; },
            radius: 3,
            center: false,
            attrs: { fill: 'black' },
            labelattrs: { 'font-size': 11 },
            buffer: true
        });
    }, { padding: 30 });
});
