import * as api from '../api'
//  Action Creators
import {FETCH_ALL, CREATE, DELETE, LIKE, UPDATE} from "../constants/actionTypes";

export const getPosts = () => async (dispatch) => {
       try{
              const {data} = await api.fetchPosts()
              dispatch({type: FETCH_ALL, payload: data})
       }catch(e){
              console.log(e.message)
       }
       
}

export const createPost = (post) => async (dispatch) => {
       try{
              const {data} = await api.createPost(post)

              dispatch({type: CREATE, payload: data})

       }catch(e){
              console.log(e)
       }
}
export const updatePost = (id, post) => async (dispatch) => {
       try {
         const { data } = await api.updatePost(id, post);
     
         dispatch({ type: UPDATE, payload: data });
       } catch (error) {
         console.log(error);
       }
     };


export const deletePost = (id) => async(dispatch) => {
       try{
              await api.deletePost(id)

              dispatch({type: DELETE, payload: id})
       }catch(error){
              console.log(error)
       }
} 

export const likePost = (id) => async (dispatch) => {
       try {
         const { data } = await api.likePost(id);
     
         dispatch({ type: LIKE, payload: data });
       } catch (error) {
         console.log(error.message);
       }
     };