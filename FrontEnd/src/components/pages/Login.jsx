import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/slices/authSlice';  // Asegúrate de que la ruta sea correcta

const Login = () => {
    const [error, setError] = useState('');
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const errorServer = useSelector((state) => state.auth.error);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    const transform = () => {
        return new Promise((resolve, reject) => {
            const expresionRegular = /[^\w\s"@.]/;
            let validacion = nombre.match(expresionRegular);
            if (validacion != null) {
                setError(`Tienes "${validacion[0]}" en tu Nombre/correo`);
                reject(new Error(`Tienes "${validacion[0]}" en tu Nombre/correo`));
            } else {
                setError('');
                resolve();
            }
        });
    }

    const send = async () => {
        await transform()
            .then(() => {
                dispatch(login({ email: nombre, password }));
            })
            .catch((err) => console.log(err));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        send();
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" || e.key === "NumpadEnter") {
            e.preventDefault();
            send();
        }
    }

    return (
        <section className='body'>
            <div className="formulario">
                <form onSubmit={handleSubmit}>
                    <div className='box'>
                        <input
                            placeholder=' '
                            className='inputC'
                            id='user'
                            type='text'
                            onChange={async (e) => { 
                                setNombre(e.target.value); 
                                transform().catch((err) => console.log(err)); 
                            }}
                        />
                        <label className='labelC' htmlFor='user'>Usuario/Correo</label>
                    </div>
                    <section className='errorC'>
                        <p className='error'>{error}</p>
                    </section>
                    <div className='box'>
                        <input
                            id='psw'
                            placeholder=' '
                            className='inputC'
                            type='password'
                            onKeyPress={handleKeyPress}
                            onChange={async (e) => {setPassword(e.target.value);transform().catch((err) => console.log(err)); }}
                        />
                        <label htmlFor='psw' className='labelC'>Contraseña</label>
                    </div>
                    <section className='errorC'>
                        <p className='error'>{errorServer}</p>
                    </section>
                    <div className='button_C'>
                        <button type='submit' title='Iniciar Sesion'>Ingresar</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;
