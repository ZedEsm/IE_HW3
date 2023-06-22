export default (success, message, body = null) => {
    if (body) return { success, body, message };
    return { success, message };
};
