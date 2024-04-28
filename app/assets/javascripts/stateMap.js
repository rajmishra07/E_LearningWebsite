(function() {
  d3.queue()
    .defer(d3.json, "ne_10m_admin_1_India_Official.json")
    .await(function(error, topoMap) {
      if (error) throw error;
      var states = topojson.feature(topoMap, topoMap.objects.ne_10m_admin_1_India_Official);
  
      // Map render
      var map     = stateMap(states.features).width(800).height(700).scale(1200);
      d3.select("#map").call(map);
  });
}());
async function getImageForState(stateName) {
  const unsplashAccessKey = 'i48gdLw04OiiEFK4GL8pdgWin8eEhv0wS2IouZaVcKU';
  const requestUrl = `https://api.unsplash.com/search/photos?query=${stateName}&client_id=${unsplashAccessKey}`;
  try {
      const response = await fetch(requestUrl);
      if (!response.ok) {
          throw new Error('Failed to fetch image');
      }
      const data = await response.json();
      if (data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          return data.results[randomIndex].urls.regular;
      } else {
          return null; // No image found
      }
  } catch (error) {
      console.error('Error fetching image:', error);
      return null;
  }
}

function stateMap(states) {

  var width  = 800, height = 700, scale = 1200;
  var color  = "#4682B4"; // Blue color
  
  function render(selection) {
      selection.each(function() {
          d3.select(this).select("svg").remove();
          var svg = d3.select(this).append("svg")
                      .attr("width", width)
                      .attr("height", height);

          var projection = d3.geo.mercator()
              .center([83, 23])
              .scale(scale)
              .translate([width / 2, height / 2]);
      
          var path = d3.geo.path().projection(projection);
          var selectState = svg.selectAll("g").data(states).enter().append("g").attr("class", "state");

          selectState.append("path")
              .style("fill", color) // Apply single color to all states
              .attr("d", path)
              .on("click", function(d) {
                  // Extract state information
                  var stateInfo = {
                      area: d.properties.area,
                      population: d.properties.population,
                      name: d.properties.name,
                      alias: d.properties.alias
                  };
                  // Update the state-info div with state information
                  d3.select("#state-info").html("<strong>State:</strong> " + stateInfo.name + "<br>" +
                                                "<strong>Area:</strong> " + stateInfo.area + "<br>" +
                                                "<strong>Population:</strong> " + stateInfo.population + "<br>" +
                                                "<strong>Alias:</strong> " + stateInfo.alias);
                  // You can style this div and add more information as needed
                  getImageForState(d.properties.name)
              .then(imageUrl => {
                  if (imageUrl) {
                      document.querySelector('.imageToDisplay').src = imageUrl;
                  } else {
                      alert(`No image found for ${d.properties.NAME_1}`);
                  }
              })
              .catch(error => {
                  console.error('Error fetching image:', error);
              });
      
              });
      });
  } // render

  render.height = function(value) {
      if (!arguments.length) return height;
      height = value;
      return render;
  };
  render.width = function(value) {
      if (!arguments.length) return width;
      width = value;
      return render;
  };
  render.scale = function(value) {
      if (!arguments.length) return scale;
      scale = value;
      return render;
  };

  return render;
} // stateMap

