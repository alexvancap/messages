import constsants from './../constants';
import history from './../history'


export const checkToken = (dispatch, user) => {
  
  fetch(`${constsants.backendUrl}/getUserInfo`, {
      headers: {
        'Authorization': `Bearer ${localStorage['authToken']}`
    }
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)
    if (res.error !== true) {
      localStorage.setItem('authToken', res.token);
      dispatch({type: 'SAVE_USER_DATA', data: res.data})
    }else{
        history.push('/login')
    }
  });
}