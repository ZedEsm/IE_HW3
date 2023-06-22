export default (requiredParams, requestParams) => {
    for (const param of requiredParams) {
        if (!(param in requestParams)) {
            return false;
        }
    }
    return true;
};
