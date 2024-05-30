import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logout, logoutL } from "../../redux/slices/authSlice";
import '../../header.css';
import MoodDark from "../molecules/MoodDark";

const Header = () => {
    const dispatch = useDispatch();
    const estado = useSelector(state => state.auth.isAuthenticated);
    const navigate = useNavigate(); 
    const menuButtonNRef = useRef(null);
    const sidebarNRef = useRef(null);

    useEffect(() => {
        const menuButtonN = menuButtonNRef.current;
        const sidebarN = sidebarNRef.current;

        const handleMenuButtonClick = () => {
            sidebarN.classList.toggle('active');
            menuButtonN.classList.toggle('hide');
        }

        const handleDocumentClick = (event) => {
            let isClickInsideMenu = sidebarN.contains(event.target);
            let isClickOnOpenButton = menuButtonN.contains(event.target);

            if (!isClickInsideMenu && !isClickOnOpenButton && sidebarN.classList.contains('active')) {
                sidebarN.classList.remove('active');
                menuButtonN.classList.remove('hide');
            }
        }

        if (menuButtonN && sidebarN) {
            menuButtonN.addEventListener('click', handleMenuButtonClick);
            document.addEventListener('click', handleDocumentClick);

            // Limpiar los event listeners al desmontar el componente
            return () => {
                document.removeEventListener('click', handleDocumentClick);
                menuButtonN.removeEventListener('click', handleMenuButtonClick);
            }
        }
    }, []);

    const send = () => {
        dispatch(logout());
        dispatch(logoutL());
    }

    // Efecto para redirigir al usuario a la página de login después del logout
    useEffect(() => {
        if (!estado) {
            navigate('/login'); // Redirige a la página de login
        }
    }, [estado, navigate]);

    return (
        <div className="container_header">
            <div>
                <button ref={menuButtonNRef} className="menu-not" title="Usuario">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-hexagon" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="rgb(3, 136, 160)" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z" fill="white" />
                        <path d="M12 13a3 3 0 1 0 0 -6a3 3 0 0 0 0 6z" />
                        <path d="M6.201 18.744a4 4 0 0 1 3.799 -2.744h4a4 4 0 0 1 3.798 2.741" />
                    </svg>
                </button>

                <div ref={sidebarNRef} id="sidebar_2">
                    <div>
                        <h4 className="Title_hd">Mi Cuenta</h4>
                    </div>

                    {estado && <button onClick={send} className="btn_logout" title='Cerrar Sesion'>Cerrar Sesion</button>}

                    <MoodDark />
                </div>
            </div>
        </div>
    );
}

export default Header;
