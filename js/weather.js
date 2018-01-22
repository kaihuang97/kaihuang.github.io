$(document).ready(function () {
    // wanted experience with api instead of using built-in geolocation
    // ip-api for location using ip address
    $.ajax({
        type: "GET",
        url: "http://ip-api.com/json",
        success: location
    });
    // feeds coordinates into dark sky api 
    function location(data) {
        var darkSkyURL = "https://api.darksky.net/forecast/e5d936bd471e33d6600f3ec145250457/";
        var location = data.lat + "," + data.lon;
        var city = data.city;
        var region = data.region;
        var darkSkyAPI = darkSkyURL + location;
        $("#currentLocation").text(city + ", " + region);
        weather(darkSkyAPI);
    }
    // calls dark sky api
    function weather(darkSkyAPI) {
        $.ajax({
            type: "GET",
            url: darkSkyAPI,
            dataType: "jsonp",
            success: getTemp
        });
        // finds the temperature and then uses icon parameter to communicate with skycons 
        function getTemp(data) {
            var temp = Math.round(data.currently.temperature);
            var icon = data.currently.icon;
            summary = data.currently.summary;
            console.log(summary);
            $("#temperature").text(temp + "°F");
            getSkyCons(icon, temp);
            unsplash();
        }
        // draws skycons according to the weather condition
        function getSkyCons(icon, temp) {
            var skycons = new Skycons({
                "color": "white"
            });
            skycons.add("skycon", icon);
            skycons.play();
        }
        // unsplash API for random background according to weather condition
        function unsplash() {
            var unsplashAPI = "https://api.unsplash.com/photos/random";
            var size = {
                width: window.innerWidth || document.body.clientWidth,
                height: window.innerHeight || document.body.clientHeight
            }
            var resolution = size.width + "x" + size.height;
            //console.log(size);
            //console.log(resolution);
            wallpaper(unsplashAPI);
        }
        // searches unsplash using weather description summary from dark sky
        function wallpaper(unsplashAPI) {
            $.ajax({
                headers: {
                    "Accept-Version": "v1",
                    "Authorization": "Client-ID 6084292b78479ead8972f469747ee02d056696a9f869ad5e4fcdaeddd7bd6ea7"
                },
                type: "GET",
                url: unsplashAPI,
                data: {
                    count: 1,
                    query: summary + " nature"
                },
                success: getWallpaper
            });
            // finds image and user url, sets background and gives credit
            function getWallpaper(data) {
                console.log(summary);
                console.log(data[0]);
                var image = data[0].urls.regular;
                var user = 'https://unsplash.com/' + data[0].user.username;
                var name = data[0].user.name;
                $(".user").attr("href", user).html(name);
                $("body").css({
                    "background-image": "url(" + image + ")",
                    "background-size": "100%"
                });
            }
        }
    }
});
