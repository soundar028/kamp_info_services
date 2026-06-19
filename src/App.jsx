import './App.css'
import '@icon/icofont/icofont.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-modal-video/css/modal-video.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '@fortawesome/fontawesome-free/css/all.css';
import 'swiper/css/bundle';
import './assets/css/main.css'
import './assets/css/responsive.css'

import Routers     from './components/Routers';
import ScrollUpBtn from './components/ScrollUpBtn';
import LeadPopup   from './components/LeadPopup';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import PreLoader   from './components/PreLoader';
import { Helmet }  from 'react-helmet';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <>
      {isLoading ? <PreLoader /> :
        <div>
          <Helmet>
            <title>KAMP INFO SERVICES || Streamlined Die Casting solutions for Multiple Industries</title>
            <link rel="shortcut icon" href="../public/favicon.ico" />
          </Helmet>
          <Routers />
          <LeadPopup />
          <ScrollUpBtn />
          <ToastContainer />
        </div>
      }
    </>
  );
}

export default App;