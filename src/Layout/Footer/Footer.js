import React from 'react';
import Logo from "../Header/Logo/Bishcase.png";
import language from './Logo/Group (7).svg'
import WP from './Logo/Whatsapp.svg'
import Instagram from './Logo/Instagram.svg'
import Telegram from './Logo/Telegram.svg'
import VK from './Logo/VK.svg'
import {NavLink} from 'react-router-dom'

const Footer = () => {
    return (
        <div className={'container '}>
            <div className="footer">
                <div className="footer-left">
                    <img className={'logo-header'} src={Logo} alt="Bishcase"/>
                    <h4 className={"logo"}>Bishcase</h4>
                </div>
                <ul className={'footer-list'}>
                    <li className={'footer-list__item'}><NavLink className={'footer__link'}
                                                                 to={'/basket'}>Корзина</NavLink></li>
                    <li className={'footer-list__item'}><NavLink className={'footer__link'}
                                                                 to={'/contact'}>Контакты</NavLink></li>
                    <li className={'footer-list__item'}>
                    <NavLink className={'footer__link'} to={'/conditions'}>Условия сервиса</NavLink></li>
                </ul>

                <div className="footer-icons">
                    <a href="https://vk.com/feed" target={'_blank'}> <img className={'footer-icons-logo'} src={VK}
                                                                          alt=""/></a>
                    <a href="https://www.instagram.com/bishcase_zum/" target={'_blank'}> <img
                        className={'footer-icons-logo'} src={Instagram} alt=""/></a>
                    <a href="https://api.whatsapp.com/send/?phone=996706000019&text&app_absent=0" target={'_blank'}>
                        <img className={'footer-icons-logo'} src={WP} alt=""/></a>
                    <a href="https://t.me/bishcase" target={'_blank'}> <img className={'footer-icons-logo'}
                                                                            src={Telegram} alt=""/></a>
                </div>
            </div>

        </div>
    );
};

export default Footer;