tailApp.controller('homecontroller', function($scope, $http){

$scope.test = "Home"
$scope.street = '';
$scope.city = '';
$scope.state = '';


$scope.map = {
    "center": {
        "latitude": 37,
        "longitude": -122
    },
    "zoom": 15
};


$scope.map.markers = [

{
    id: 0,
    coords: {
        latitude: 37.4224553,
        longitude: -122.0843062
    },
    options: {draggable : false },
    events: {
      
    }
}, 
{
    id: 1,
    coords: {
        latitude: 33.8887655,
        longitude: -117.8719478
    },
    options: {draggable : false },
    events: {
    
    }
},
{
    id: 2,
    coords: {
        latitude: 33.6841154,
        longitude: -117.8574498
    },
    options: {draggable : false },
    events: {
       
        }
    },
{
    id: 3,
    coords: {
        latitude: 33.8000673,
        longitude: -117.8832376
    },
    options: {draggable : false },
    events: {
    
        }
    }]; 




var events = {
    places_changed: function (searchBox) {
        var place = searchBox.getPlaces();
        if (!place || place == 'undefined' || place.length == 0) {
            console.log('no place data :(');
            return;
        }

        $scope.map = {
            "center": {
                "latitude": place[0].geometry.location.lat(),
                "longitude": place[0].geometry.location.lng()
            },
            "zoom": 18
        };
        $scope.marker = {
            id: 0,
            coords: {
                latitude: place[0].geometry.location.lat(),
                longitude: place[0].geometry.location.lng()
            }
        };
    }
};
$scope.searchbox = { template: '../components/searchBox.html', events: events, position: 'TOP_LEFT' };



$scope.submit = function(){


    var req = {
     method: 'POST',
     url: 'http://localhost:3000/getcoords',
     dataType: 'json',
     data: { street: $scope.street, city: $scope.city, state: $scope.state },
     headers: {'Content-Type': 'application/json'}
    }

    $http(req).success(function(data, status, headers, config){ 

        if(data !== null && data.location !== null){
            var marker = new google.maps.Marker( {
                id: getHighestMarkerId() + 1,
                animation: google.maps.Animation.DROP,
                coords: {
                      latitude:data.location.lat,
                      longitude: data.location.lng
                },
                options: {draggable : false },
            });
            $scope.map.markers.push(marker);

        }

    }).error(function(data, status, headers, config){
        
    });
};

function getHighestMarkerId(){
    var maxid = 0;

        $scope.map.markers.map(function(obj){     
            if (obj.id > maxid) 
                maxid = obj.id;    
        });

    return maxid;
}





});