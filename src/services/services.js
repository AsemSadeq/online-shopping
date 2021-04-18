export const renderNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

export const getKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value);


export const checkQuantity = (cartList, porductId) => (cartList.find(ele => ele?.id === porductId) || {}).quantity ? (cartList.find(ele => ele?.id === porductId) || {}).quantity : 0;