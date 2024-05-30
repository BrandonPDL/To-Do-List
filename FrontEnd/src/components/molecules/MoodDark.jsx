import React from "react";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/slices/authSlice";
function MoodDark() {
    const TemaOscuroState = useSelector((state) => state.auth.darkTheme);

    
    const dispatch = useDispatch()

    useEffect(() => {
        const root = document.documentElement;
        if (TemaOscuroState) {
            root.style.setProperty('--background-color-day', 'var(--background-color-night)');
            root.style.setProperty('--text-color-day', 'var(--text-color-night)');
            root.style.setProperty('--difuminado-color-day', 'var(--difuminado-color-night)');
            root.style.setProperty('--bg-login-color-day', 'var(--bg-login-color-night)');

        } else {
            root.style.setProperty('--background-color-day', '#ffffff'); // Color original del día
            root.style.setProperty('--text-color-day', '#000000'); // Color original del día
            root.style.setProperty('--difuminado-color-day', 'rgb(99, 99, 99)');
            root.style.setProperty('--bg-login-color-day', '#ffffff');
        }
    }, [TemaOscuroState]);


    return (
        <section className="btn-day">

            {TemaOscuroState ? <svg onClick={() =>  dispatch(toggleTheme())} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sun" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" ssstrokelinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" /></svg> : <svg onClick={() =>  dispatch(toggleTheme())} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-moon-stars" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#292929" fill="none" ssstrokelinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" /><path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" /><path d="M19 11h2m-1 -1v2" /></svg>}

        </section>
    );
}

export default MoodDark;