function dateCreator(){
    let currentDate = new Date()
    let currentYear = currentDate.getFullYear()
    let arr = []
    for(let i=1960; i <=currentYear; i++){
      arr.push(i.toString())
    }
    return arr
  }

export  const onlyYears = dateCreator()

export const isResponseSuccess = (response:any)=>{
  if(response && response.data && response.data.status === "success"){
    return {success: true, message:response.data.message}
  }else{
    let msg = response.message ? response.message : response.response ? response.response : "Network Error"
    return {success:false, message: msg}
  }
}