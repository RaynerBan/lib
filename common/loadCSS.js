 function loadCSS(href){
                $("<link>")
                    .attr({ rel: "stylesheet",
                        type: "text/css",
                        href: href
                    })
                    .appendTo("head");
            }
            loadCSS('//style.aliunicorn.com/partner/da/sc/icbu-daop/js/common/udc-index-set/mods/indicator/indicator.css');



 var scripts = document.createElement("script");
 scripts.setAttribute("src","http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
 document.body.appendChild(scripts);
 $.ajax('').done(function(data){console.log(JSON.parse(data);})
