let usersMap = new Map();

export const setSocketUser = (userId, socketId) => {
    usersMap.set(userId, socketId);
};

export const getSocketUser = (userId) => {
    return usersMap.get(userId);
};

export const removeSocketUser = (sId) => {
    for (const [userId, socketId] of usersMap.entries()) {
        if (socketId === sId) {
            usersMap.delete(userId);
            break;
        }
    }
};
