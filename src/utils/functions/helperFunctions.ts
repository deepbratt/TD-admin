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