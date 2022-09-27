
    function searchButton(){
        let city=document.getElementById("input").value;
        let url=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=f4af9f95d1e7500468a4b7d8e748aa4e`;
        
        fetch(url)
        .then(function (res) {
            return res.json();

        }).then(function (res) {

            let data = res.list;
            // console.log(data)
            let City=res.city.name;
            append(data,City);
        })
        .catch(function(err){
            alert("City not exist!");
            let container=document.getElementById("append");
            container.style.display="none";
            let iframe=document.getElementById("gmap_canvas");
            iframe.style.display="none";
        })
    }

    
    function append(data,City){

        

        const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        let container=document.getElementById("append");
        let city=document.getElementById("input").value;
        let url=`https://maps.google.com/maps?q=${City}&t=&z=13&ie=UTF8&iwloc=&output=embed`; 

        container.innerHTML=null;
        container.style.display="block";
        container.style.display="grid";

        let details=document.createElement("div");
        details.setAttribute("id","details")
        let citys=document.createElement("h1")
        citys.innerText="City:";
        let cityn=document.createElement("h2")
        cityn.innerText=City;
        let huminity=document.createElement("h4");
        huminity.innerText=`Visibility: ${data[0].visibility}`;
        let cloud=document.createElement("h4");
        cloud.innerText=`Clouds: ${data[0].clouds.all}%`;
        details.append(citys,cityn,huminity,cloud)
        container.append(details);


        for(let i=0;i<7;i++){
            
            let div=document.createElement("div");

            let day=document.createElement("h2");
            day.innerText=days[i];

            let img=document.createElement("img");
            img.src=`http://openweathermap.org/img/wn/${data[i].weather[0].icon}.png`;

            let div2=document.createElement("div");
            div2.setAttribute("id","minMax")
            let min=document.createElement("p");
            min.innerText=`Min: ${+(data[i].main.temp_min-281.53).toFixed(1)}℃`;

            let max=document.createElement("p");
            max.innerText=`Max: ${+(data[i].main.temp_max -276.13).toFixed(1)}℃`;

            div.append(day,img,div2);
            
            div2.append(min,max)
           
            container.append(div);

            let iframe=document.getElementById("gmap_canvas");
            iframe.src=url;
            iframe.style.display="block";

        }
    }


    function getLocation(){
        navigator.geolocation.getCurrentPosition(success);
    
      function success(pos) {
        const crd = pos.coords;
      
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
    
        getWeatherOnLocation(crd.latitude,crd.longitude)
      }
    
    }
    
    function getWeatherOnLocation(lat,lon){
        let url =`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=f4af9f95d1e7500468a4b7d8e748aa4e`;
    
        fetch(url)
        .then(function(res){
            return res.json(); 
             
        }).then(function(res){
            let data = res.list;
               
            let City=res.city.name;
            append(data,City);
        }).catch(function(err){
            console.log(err);
        })
    
    }
