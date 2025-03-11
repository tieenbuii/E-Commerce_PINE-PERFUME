import icons from "./icons"

const {AiOutlineStar, AiFillStar} = icons

export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u0336f]/g, "").split(' ').join('-')
export const formatMoney = number => Number(number.toFixed(1)).toLocaleString

// sáng = 1,  tối = 0 ex [1,1,1,0,0]
export const renderStartFromNumber  = (number) => { 
    if(!Number(number)) return
    const stars = []
    for(let i = 0; i<+number;i++) stars.push(<AiFillStar color="orange"/>)
    for(let i = 5; i>+number;i--) stars.push(<AiFillStar color="orange"/>)
    return stars
}
