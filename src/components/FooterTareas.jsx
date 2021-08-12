import React from 'react'

const FooterTareas = (props) => {
   
    return (
        <footer className="fixed bottom">
            
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#0d6efd" className="fixed-bottom" fillOpacity="1" d="M0,320L26.7,320C53.3,320,107,320,160,272C213.3,224,267,128,320,101.3C373.3,75,427,117,480,117.3C533.3,117,587,75,640,96C693.3,117,747,203,800,229.3C853.3,256,907,224,960,181.3C1013.3,139,1067,85,1120,101.3C1173.3,117,1227,203,1280,213.3C1333.3,224,1387,160,1413,128L1440,96L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path>
    </svg>   
    <p className="text-center text-light display-6 mb-0 " style={{"backgroundColor":"#0d6efd"}}>
        ¡Hola! {props.firebaseUser.displayName}
    </p>    
   
</footer>
    )
}

export default FooterTareas
