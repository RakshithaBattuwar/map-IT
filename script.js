mapboxgl.accessToken = 'pk.eyJ1IjoicmFrcyIsImEiOiJjbGw5NXkxdDYxYmVjM3FsYTkxbjQxcjNkIn0.iQlfmCudH4I6GakhnaKSUg';

navigator.geolocation.getCurrentPosition(successlocation,errorlocation,{
    enableHighAccuracy: true
})

function successlocation(position){
    console.log(position)
    setupmap([position.coords.longitude,position.coords.latitude])
}

function errorlocation(){
    setupmap([78.96,20.59])
    
}

function setupmap(center,position){
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom:16,
    });
    directions=map.addControl(
        new MapboxDirections({
        accessToken: mapboxgl.accessToken
        }),
        'bottom-left'
        );
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    map.on('load', function() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            directions.setOrigin([position.coords.longitude, position.coords.latitude]);
          });
        }
    });

    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
    }));
    map.addControl(
        new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
        }),
        'top-left'
        );
    
        const layerList = document.getElementById('menu');
        const inputs = layerList.getElementsByTagName('input');
         
        for (const input of inputs) {
        input.onclick = (layer) => {
        const layerId = layer.target.id;
        map.setStyle('mapbox://styles/mapbox/' + layerId);
        };
        }
};

function togglem(){
    let m= document.getElementById('ddmenu');
    if (m.style.display!= 'none'){
        m.style.display='none';
    }
    else{
        m.style.display='block';
    }
}