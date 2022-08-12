import { useNavigate } from 'react-router-dom';

export const validateSession = () => {

    const navigate = useNavigate();

    const token = sessionStorage.getItem("accessToken");
    if (token) {
        // navigate('/dashboard')
        console.log('DSAHBOARD')
    }

    // navigate('/login')
    console.log('LOGIN')

};
