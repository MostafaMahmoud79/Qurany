import React from 'react';
import style from './Footer.module.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className={`${style.footer}`}>
      <div className="d-flex justify-content-around align-items-center py-3">
        <div>
          <p className='m-0'>by Mostafa Mahmoud</p>
        </div>
        <div>
          <p className='m-0'>&#9400; Qurany</p>
        </div>
      </div>
      <div className={`${style.quote} text-center`}>
        <p className='m-0'>"إن مع العسر يسرا" - سورة الشرح</p>
      </div>
      <div className={`${style.socialIcons} text-center`}>
  <a 
    href={'https://www.facebook.com/profile.php?id=100009375766104&locale=ar_AR'} 
    target='_blank'  
    rel='noopener noreferrer' 
    className={style.icon}
  >
    <i className='fa fa-brands fa-facebook'></i>
  </a>

  <a 
    href={'https://www.linkedin.com/in/mostafa-mahmoud-frontend/'} 
    target='_blank'  
    rel='noopener noreferrer' 
    className={style.icon}
  >
    <i className='fa fa-brands fa-linkedin'></i>
  </a>

  <a 
    href={'https://wa.me/201225161426'} 
    target='_blank'  
    rel='noopener noreferrer' 
    className={style.icon}
  >
    <i className='fa fa-brands fa-whatsapp'></i>
  </a>    
</div>

    </footer>
  );
}
