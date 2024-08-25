export const actionTypes = {
    SET_CURRENT_COMPANY: '@custom/SET_CURRENT_COMPANY'
}

export const setCurrentCompany = (currentCompany) => ({
    type: actionTypes.SET_CURRENT_COMPANY,
    currentCompany,
})