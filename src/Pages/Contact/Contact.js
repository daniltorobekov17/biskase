import React from 'react';
import Adress from './Icons/Vector (7).svg'
import VK from "../../Layout/Footer/Logo/VK.svg";
import Instagram from "../../Layout/Footer/Logo/Instagram.svg";
import WP from "../../Layout/Footer/Logo/Whatsapp.svg";
import Telegram from "../../Layout/Footer/Logo/Telegram.svg";
import Iframe from "react-iframe";
import Tel from './Icons/Vector (9).svg'


const Contact = () => {


    return (
        <div className={'container'}>
            <div className="contact-all">
                <div className="contact">
                    <div className="contact-left">
                        <h5>Наш адресс:</h5>
                        <Iframe url={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.3360534053722!2d74.61514577084765!3d42.876121718742546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7c0cdbbae15%3A0xa6b565413fa531df!2z0KbQo9CcINCQ0LnRh9Kv0YDTqdC6!5e0!3m2!1sru!2skg!4v1651474679110!5m2!1sru!2skg'}  width="670px"  height="400px" style="border:0;" allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade" alt="Google Map"/>

                        <div className="contact-adress">
                            <img src={Adress} alt=""/>
                            <p className="contact-adress">
                                ЦУМ Айчүрөк
                                155 просп. Чуй, Бишкек
                            </p>
                        </div>
                    </div>

                    <div className="contact-right">
                        <a href="https://vk.com/feed" target={'_blank'}> <img className={'contact-icons'} src={VK} alt=""/></a>
                        <a href="https://www.instagram.com/bishcase_zum/" target={'_blank'}> <img className={'contact-icons'} src={Instagram} alt=""/></a>
                        <a href="https://api.whatsapp.com/send/?phone=996706000019&text&app_absent=0" target={'_blank'}> <img className={'contact-icons'} src={WP} alt=""/></a>
                        <a href="https://t.me/bishcase" target={'_blank'}> <img className={'contact-icons'} src={Telegram} alt=""/></a>
                    </div>

                </div>
                <div className="contact-bottom">
                    <img src={Tel} alt="Telephone"/>
                    <a className={'contact-bottom-tel'} href="tel:+996 999 999 999">+996 999 999 999</a>
                </div>

            </div>
            </div>

    );
};

export default Contact;