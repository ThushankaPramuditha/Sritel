import React, {useState, useEffect} from 'react';
import '../../css/signin.css';
import Toast from '../../componets/Toast';
import * as ToastMessages from '../../componets/ToastMessages';
import { Axios_user } from '../../api/Axios';
import * as API_ENDPOINTS from '../../api/ApiEndpoints';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {SetUserAction,SetUserId} from '../../actions/UserActions';
import Typewriter from 'typewriter-effect';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5001');
export default function Signin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [IsDisabled, setIsDisabled] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// const showToast = (data) => {
	// 	console.log('hello');
	// 	if (data.type == 'success') {
	// 		ToastMessages.success(data.message);
	// 		ToastMessages.info('Redirecting to OTP verification');
	// 		localStorage.setItem('otpmail', email);
	// 		setIsDisabled(true);
	// 		// setEmail('');
	// 		// setPassword('');
	// 		// // resetFormData();
	// 		// setIsDisabled(true);
	// 		setTimeout(function () {
	// 			navigate('/otp');
	// 		}, 1000);
	// 	} else if (data.type == 'error') {
	// 		ToastMessages.error(data.message);
	// 	} else if (data.type == 'warning') {
	// 		localStorage.setItem('otpmail', email);
	// 		ToastMessages.warning(data.message);
	// 		ToastMessages.info('Redirecting to OTP verification');
	// 		setTimeout(function () {
	// 			navigate('/otp');
	// 		}, 1000);
	// 	}
	// };
	// const showToast = (data) => {
	// 	console.log('hello');
	// 	if (data.type === 'success') {
	// 		ToastMessages.success(data.message);
	// 		if (data.message.includes('OTP')) {
	// 			// This assumes that the backend response tells you if OTP is required
	// 			ToastMessages.info('Redirecting to OTP verification');
	// 			localStorage.setItem('otpmail', email);
	// 			setIsDisabled(true);
	// 			setTimeout(() => {
	// 				navigate('/otp');
	// 			}, 1000);
	// 		} else {
	// 			// Navigate to home if no OTP is needed
	// 			ToastMessages.info('Redirecting to home');
	// 			navigate('/home');
	// 		}
	// 	} else if (data.type === 'error') {
	// 		ToastMessages.error(data.message);
	// 	} else if (data.type === 'warning') {
	// 		localStorage.setItem('otpmail', email);
	// 		ToastMessages.warning(data.message);
	// 		ToastMessages.info('Redirecting to OTP verification');
	// 		setTimeout(() => {
	// 			navigate('/otp');
	// 		}, 1000);
	// 	}
	// };

	// const showToast = (data) => {
	// 	// Ensure data.message exists before proceeding
	// 	if (!data || !data.message) {
	// 		console.error('Error: data or message is undefined');
	// 		return;  // Exit the function if there's no valid message
	// 	}
	
	// 	if (data.type === 'success') {
	// 		ToastMessages.success(data.message);
	
	// 		// Check if the message includes 'OTP' safely
	// 		if (data.message.includes('OTP')) {
	// 			ToastMessages.info('Redirecting to OTP verification');
	// 			localStorage.setItem('otpmail', email);
	// 			setIsDisabled(true);
	// 			setTimeout(() => {
	// 				navigate('/otp');
	// 			}, 1000);
	// 		} else {
	// 			ToastMessages.info('Redirecting to home');
	// 			navigate('/home');
	// 		}
	// 	} else if (data.type === 'error') {
	// 		ToastMessages.error(data.message);
	// 	} else if (data.type === 'warning') {
	// 		localStorage.setItem('otpmail', email);
	// 		ToastMessages.warning(data.message);
	// 		ToastMessages.info('Redirecting to OTP verification');
	// 		setTimeout(() => {
	// 			navigate('/otp');
	// 		}, 1000);
	// 	}
	// };
	
	// const handleSubmit = (e) => {
	// 	try {
	// 		Axios_user.post(API_ENDPOINTS.SIGNIN_URL, {
	// 			email: email,
	// 			password: password,
	// 		}).then((response) => {
	// 			console.log(response.data);
	// 			if (response.data.type == 'success') {

	// 				if (response.data.user) {
	// 					dispatch(SetUserAction(response.data.user));
	// 					dispatch(SetUserId(response.data.id));
	// 					localStorage.setItem("user_id", response.data.user_id)
	// 					navigate('/home');
	// 				} else {
	// 					showToast(response.data);
	// 				}
	// 			} else {
	// 				showToast(response.data);
	// 			}
	// 		});
	// 	} catch (e) {
	// 		console.log('e.error');
	// 	}
	// };

// 	const showToast = (data) => {
//     console.log('hello');

//     // Log the entire data object for debugging
//     console.log('Data received:', data);

//     // Ensure data.message exists before proceeding
//     if (!data || !data.message) {
//         console.error('Error: data or message is undefined');
//         return;  // Exit the function if there's no valid message
//     }

//     if (data.type === 'success') {
//         ToastMessages.success(data.message);

//         if (data.message.includes('OTP')) {
//             ToastMessages.info('Redirecting to OTP verification');
//             localStorage.setItem('otpmail', email);
//             setIsDisabled(true);
//             setTimeout(() => {
//                 navigate('/otp');
//             }, 1000);
//         } else {
//             ToastMessages.info('Redirecting to home');
//             navigate('/home');
//         }
//     } else if (data.type === 'error') {
//         ToastMessages.error(data.message);
//     } else if (data.type === 'warning') {
//         localStorage.setItem('otpmail', email);
//         ToastMessages.warning(data.message);
//         ToastMessages.info('Redirecting to OTP verification');
//         setTimeout(() => {
//             navigate('/otp');
//         }, 1000);
//     }
// };

// const handleSubmit = (e) => {
//     try {
//         // Make the POST request and log the full response
//         Axios_user.post(API_ENDPOINTS.SIGNIN_URL, {
//             email: email,
//             password: password,
//         }).then((response) => {
//             console.log('Full response from server:', response); // Log the entire response object

//             if (response.data) {
//                 if (response.data.type === 'success') {
//                     if (response.data.user) {
//                         dispatch(SetUserAction(response.data.user));
//                         dispatch(SetUserId(response.data.id));
//                         localStorage.setItem("user_id", response.data.user_id);
//                         navigate('/home');
//                     } else {
//                         showToast(response.data);
//                     }
//                 } else {
//                     showToast(response.data);
//                 }
//             } else {
//                 console.error('Error: No data returned from server');
//             }
//         }).catch((error) => {
//             console.error('Error occurred while making the request:', error);
//         });
//     } catch (e) {
//         console.log('Error in try-catch block:', e);
//     }
// };

const handleSubmit = (e) => {
    e.preventDefault();  // Prevent default form behavior if applicable
    try {
        // Make the POST request
        Axios_user.post(API_ENDPOINTS.SIGNIN_URL, {
            email: email,
            password: password,
        })
        .then((response) => {
            console.log('Full response from server:', response); // Log the full server response

            // Check if response.data exists
            if (response && response.data) {
                console.log('Response data:', response.data);

                // Proceed based on response type
                if (response.data.type === 'success') {
                    if (response.data.user) {
                        dispatch(SetUserAction(response.data.user));
                        dispatch(SetUserId(response.data.id));
                        localStorage.setItem("user_id", response.data.user_id);
                        navigate('/home');
                    } else {
                        showToast(response.data);
                    }
                } else {
                    showToast(response.data);
                }
            } else {
                console.error('Error: response.data is undefined');
                console.log('Full response object:', response);  // Log entire response for debugging
            }
        })
        .catch((error) => {
            console.error('Error occurred while making the request:', error);
        });
    } catch (e) {
        console.log('Error in try-catch block:', e);
    }
};

const showToast = (data) => {
    console.log('Data received in showToast:', data);  // Log the data received

    // Check if data exists and set a default message if necessary
    if (!data || !data.message) {
        console.error('Error: data or message is undefined. Using default message.');
        data.message = 'An unexpected error occurred.';  // Set a default message
    }

    if (data.type === 'success') {
        ToastMessages.success(data.message);

        if (data.message.includes('OTP')) {
            ToastMessages.info('Redirecting to OTP verification');
            localStorage.setItem('otpmail', email);
            setIsDisabled(true);
            setTimeout(() => {
                navigate('/otp');
            }, 1000);
        } else {
            ToastMessages.info('Redirecting to home');
            navigate('/home');
        }
    } else if (data.type === 'error') {
        ToastMessages.error(data.message);
    } else if (data.type === 'warning') {
        localStorage.setItem('otpmail', email);
        ToastMessages.warning(data.message);
        ToastMessages.info('Redirecting to OTP verification');
        setTimeout(() => {
            navigate('/otp');
        }, 1000);
    }
};



	return (
		<div className='signInOuterContainer'>
			<div className='Title'>Sritel Communications</div>
			<div className='loginPhone'></div>
			<div className='signInInnerContainer'>
				<div className='formFields'>
					<div className='signinrow'>
						<input className='signInInput' type='text' onChange={(event) => setEmail(event.target.value)} value={email} required></input>
						<label className='signInPlaceholder'>User name*</label>
					</div>
					<div className='signinrow'>
						<input className='signInInput' type='password' onChange={(event) => setPassword(event.target.value)} value={password} required></input>
						<label className='signInPlaceholder'>Password*</label>
					</div>
					{IsDisabled ? (
						<div className='submitButton'>Sign In</div>
					) : (
						<div className='submitButton' onClick={handleSubmit}>
							Sign In
						</div>
					)}

					<div style={{display: 'flex', flexDirection: 'row'}}>
						<span className='notregisteredtext'>Not registered?</span>
						<span className='signInText' style={{textDecoration: 'underline', color: 'white'}} onClick={() => navigate('/signup')}>
							Sign up
						</span>
					</div>
				</div>
			</div>
			{/* <div className='aboutus' style={{width: '40%'}}>
				<div className='Title' style={{width: '80%'}}>
					About us
				</div>
				<div className='content'>
					<Typewriter
						onInit={(typewriter) => {
							typewriter.typeString('GeeksForGeeks').pauseFor(1000).deleteAll().typeString('Welcomes You').start();
						}}
					/>
				</div>
			</div> */}

			{/* <div className='signInInnerContainer'>
				<div className='formFields'>
					<div className='signinrow'>
						<input className='signInInput' type='text' onChange={(event) => setEmail(event.target.value)} value={email} required></input>
						<label className='signInPlaceholder'>User name*</label>
					</div>
					<div className='signinrow'>
						<input className='signInInput' type='password' onChange={(event) => setPassword(event.target.value)} value={password} required></input>
						<label className='signInPlaceholder'>Password*</label>
					</div>
					{IsDisabled ? (
						<div className='submitButton'>Sign In</div>
					) : (
						<div className='submitButton' onClick={handleSubmit}>
							Sign In
						</div>
					)}

					<div style={{display: 'flex', flexDirection: 'row'}}>
						<span>Not registered?</span>
						<span className='signInText' style={{textDecoration: 'underline', color: 'dodgerblue'}} onClick={() => navigate('/signup')}>
							Sign up
						</span>
					</div>
				</div>
			</div> */}
			<Toast duration={3000} />
		</div>
	);
}
