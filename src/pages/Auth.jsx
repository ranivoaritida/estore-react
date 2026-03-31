import  { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom'; 
const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") || "signup";
  const [mode, setMode] = useState(initialMode);
  const [error, setError] = useState(null)
  const { signUp, login } = useAuth();
  
  useEffect(() => {
    const modeUrl = searchParams.get("mode") || "signup";
    setMode(modeUrl);
  }, [searchParams])
  

  const navigate = useNavigate();

  const { register, handleSubmit, formState: {errors} } = useForm(); 

  const onSub = (data) => {
    setError(null);
    var result;
    if(mode === "signup"){
      result =signUp(data.email, data.password);
    } else{
      result = login(data.email, data.password);
    }
    if(result.success){
      navigate("/");
    } else {
      setError(result.error);
    }
    console.log(result);
  }

  return (
    <div className='page'>
      <div className='container'>
        <div className='auth-container'>
          <h1 className='page-title'>{mode === "signup" ? "Sign Up" : "Login"}</h1>
          <form className='auth-form' onSubmit={handleSubmit(onSub)}>
            {error && <div className='error-message'>{error}</div>}
            <div className='form-group'>
              <label className='form-label' htmlFor='email'>Email</label>
              <input type='email' className='form-input' placeholder='Enter your email' id='email'
              {...register("email", {required: "Email is required"})} />
              {errors.email && <span className='form-error'> {errors.email.message}</span>}
            </div>
            <div className='form-group'>
              <label className='form-label' htmlFor='password'>Password</label>
              <input type='password' className='form-input' placeholder='Enter your password' id='password'
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6, 
                    message: "Password must be at least 6 characters" },
                  maxLength: {
                    value: 12,
                    message: "Password must be at most 12 characters"
                  }
                })} 
              />
              {errors.password && <span className='form-error'> {errors.password.message}</span>}
            </div>
            <button type='submit' className='btn btn-primary btn-large'> {mode === "signup" ? "Sign Up" : "Login"}</button>
          </form>
          <div className='auth-switch'>
            {mode === "signup" ? (
              <p>Already have an account? <span onClick={() => setMode("login")}className='auth-link'>Sign In</span></p>
            ) : (
              <p>Don't have an account? <span onClick={ () => setMode("signup")} className='auth-link'>Sign Up</span></p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth