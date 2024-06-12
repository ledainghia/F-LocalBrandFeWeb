export const getUser = () => {
    // Check if user is logged in
    const { localStorage, sessionStorage } = window;
    if (!localStorage.getItem('user') && !sessionStorage.getItem('user')) {
        return false;
    }
    return true;
};
