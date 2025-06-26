import axios from "axios"
const baseUrl = "api/persons"
  
const getAll = () =>{
const request = axios.get(baseUrl);
return request.then(response =>response.data);
}
const update = (id,updatedPerson) =>{
  const request = axios.put(`${baseUrl}/${id}`,updatedPerson)
  return request.then(response => response.data);
}
const create = (newObjects) =>{
  const request = axios.post( baseUrl,newObjects);
  return request.then(response => response.data)
}
const removing = (id)=>{
  return axios.delete(`${baseUrl}/${id}`).then(()=>{
  return axios.get(baseUrl).then(response => response.data)
  })

}

export default {
   getAll: getAll, 
  create: create,
  removing:removing,
  update: update
}