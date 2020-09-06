/**
 * Returns latitude and longitude values for given address using the Google Maps Geocoder.
 *
 * @param {string} address - The address you get the latitude and longitude for.
 * @customfunction
 */
function GEOCODE_GOOGLE(address) {
    if (address.map) {
        return address.map(GEOCODE_GOOGLE)
    } else {
        var r = Maps.newGeocoder().geocode(address)
        for (var i = 0; i < r.results.length; i++) {
            var res = r.results[i]
            return res.geometry.location.lat + ", " + res.geometry.location.lng
        }
    }
}

/**
 * Returns latitude values for given address using the Google Maps Geocoder.
 *
 * @param {string} address - The address you get the latitude and longitude for.
 * @customfunction
 */
function GEOCODE_GOOGLE_LAT(address) {
    if (address.map) {
        return address.map(GEOCODE_GOOGLE)
    } else {
        var r = Maps.newGeocoder().geocode(address)
        for (var i = 0; i < r.results.length; i++) {
            var res = r.results[i]
            return res.geometry.location.lat
        }
    }
}

/**
 * Returns longitude values for given address using the Google Maps Geocoder.
 *
 * @param {string} address - The address you get the latitude and longitude for.
 * @customfunction
 */
function GEOCODE_GOOGLE_LNG(address) {
    if (address.map) {
        return address.map(GEOCODE_GOOGLE)
    } else {
        var r = Maps.newGeocoder().geocode(address)
        for (var i = 0; i < r.results.length; i++) {
            var res = r.results[i]
            return res.geometry.location.lng
        }
    }
}

/**
 * Returns latitude and longitude values for given address using the Yandex Geocoder.
 *
 * @param {string} address - The address you get the latitude and longitude for.
 * @customfunction
 */
function GEOCODE_YANDEX(address) {
    if (address.map) {
        return address.map(GEOCODE_YANDEX)
    } else {
        input = encodeURI(address)
        var r = UrlFetchApp.fetch(
            "https://geocode-maps.yandex.ru/1.x/?format=json&geocode=" +
            input + "&results=1&lang=en-US", {
                "method": "get"
            })
        var res = JSON.parse(r)
        try {
            res = res.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
            res = res.split(" ")[1] + ", " + res.split(" ")[0]
            return res
        } catch (e) {
            return ""
        }
    }
}
