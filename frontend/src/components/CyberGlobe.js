import React, { useRef, useEffect } from "react";
import Globe from "react-globe.gl";

function CyberGlobe() {

  const globeRef = useRef();

  const attacks = [
    {
      startLat:55.75,
      startLng:37.61,   // Russia
      endLat:38.9,
      endLng:-77.03     // USA
    },
    {
      startLat:35.68,
      startLng:139.69,  // Japan
      endLat:48.85,
      endLng:2.35       // France
    },
    {
      startLat:28.61,
      startLng:77.20,   // India
      endLat:-33.86,
      endLng:151.20     // Australia
    },
    {
      startLat:39.9,
      startLng:116.4,   // China
      endLat:52.52,
      endLng:13.40      // Germany
    }
  ];

  useEffect(()=>{

    if(globeRef.current){
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.6;
    }

  },[]);

  return(

    <div style={{height:"450px",marginTop:"40px"}}>

      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundColor="rgba(0,0,0,0)"

        arcsData={attacks}
        arcColor={() => "#22d3ee"}
        arcDashLength={0.5}
        arcDashGap={2}
        arcDashAnimateTime={2000}
        arcStroke={0.7}

      />

    </div>

  );

}

export default CyberGlobe;